import { ethers } from 'ethers';
import { MORALIS_API_KEYS, BAP578_AGENT_CONTRACTS } from '../config/contracts';
import { convertIPFSToHTTP } from './formatting';

const BSC_RPC = 'https://bsc-dataseed1.binance.org/';
const MORALIS_BASE = 'https://deep-index.moralis.io/api/v2.2';

export async function scanWallet(address, onProgress) {
  const normalized = address.toLowerCase();

  onProgress?.('Reading wallet history...');
  const transfers = await fetchAllTransfers(normalized);
  if (!transfers.length) return [];

  onProgress?.('Tracing ownership...');
  const ownership = buildOwnershipMap(transfers, normalized);

  const deadEntries = [];
  for (const [key, entry] of ownership.entries()) {
    if (!entry.owned) continue;
    const [contractAddress, tokenId] = key.split(':');
    if (BAP578_AGENT_CONTRACTS.has(contractAddress.toLowerCase())) continue;
    deadEntries.push({ contractAddress, tokenId, lastTimestamp: entry.lastTimestamp });
  }

  if (!deadEntries.length) return [];

  onProgress?.(`Found ${deadEntries.length} dead NFTs — identifying...`);
  const provider = new ethers.providers.JsonRpcProvider(BSC_RPC);
  const results = await fetchMetadataBatch(deadEntries, provider, onProgress);

  return results.sort((a, b) => a.lastTimestamp - b.lastTimestamp);
}

async function fetchAllTransfers(address) {
  if (!MORALIS_API_KEYS.length) {
    throw new Error('Missing VITE_MORALIS_API_KEY. Get one at https://admin.moralis.com and add it to your .env');
  }

  const allTransfers = [];
  let cursor = '';
  let keyIdx = 0;
  const limit = 100;

  while (true) {
    const params = new URLSearchParams({ chain: 'bsc', limit: String(limit) });
    if (cursor) params.set('cursor', cursor);
    const url = `${MORALIS_BASE}/${address}/nft/transfers?${params}`;

    let res;
    let lastErrBody = '';
    let lastErrStatus = 0;
    // Try each remaining key until one succeeds on this page.
    // Moralis returns 401 for "CU consumed" (not 402), so rotate on any non-OK status.
    while (keyIdx < MORALIS_API_KEYS.length) {
      res = await fetch(url, {
        headers: { accept: 'application/json', 'X-API-Key': MORALIS_API_KEYS[keyIdx] },
      });
      if (res.ok) break;
      lastErrBody = await res.text();
      lastErrStatus = res.status;
      keyIdx++;
    }

    if (!res || !res.ok) {
      throw new Error(`All Moralis keys exhausted (last ${lastErrStatus}): ${lastErrBody.slice(0, 200)}`);
    }

    const data = await res.json();
    const rows = data.result || [];

    for (const r of rows) {
      allTransfers.push({
        contractAddress: r.token_address,
        tokenID: r.token_id,
        from: r.from_address,
        to: r.to_address,
        timeStamp: Math.floor(new Date(r.block_timestamp).getTime() / 1000),
      });
    }

    if (!data.cursor || rows.length < limit) break;
    cursor = data.cursor;
  }

  // Moralis returns newest first — our ownership map expects chronological order
  allTransfers.sort((a, b) => a.timeStamp - b.timeStamp);
  return allTransfers;
}

function buildOwnershipMap(transfers, walletAddress) {
  const map = new Map();

  for (const tx of transfers) {
    const key = `${tx.contractAddress.toLowerCase()}:${tx.tokenID}`;
    const timestamp = parseInt(tx.timeStamp);

    if (tx.to.toLowerCase() === walletAddress) {
      map.set(key, { owned: true, lastTimestamp: timestamp });
    } else if (tx.from.toLowerCase() === walletAddress) {
      map.set(key, { owned: false, lastTimestamp: timestamp });
    }
  }

  return map;
}

async function fetchMetadataBatch(entries, provider, onProgress) {
  const results = [];
  const concurrency = 5;

  for (let i = 0; i < entries.length; i += concurrency) {
    const batch = entries.slice(i, i + concurrency);
    const promises = batch.map((entry) => fetchSingleMetadata(entry, provider));
    const settled = await Promise.allSettled(promises);

    for (const result of settled) {
      if (result.status === 'fulfilled' && result.value) {
        results.push(result.value);
      }
    }

    onProgress?.(`Identifying dead NFTs  ${Math.min(i + concurrency, entries.length)} / ${entries.length}`);
  }

  return results;
}

async function fetchSingleMetadata(entry, provider) {
  const { contractAddress, tokenId, lastTimestamp } = entry;
  const minABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function tokenURI(uint256) view returns (string)',
  ];

  const contract = new ethers.Contract(contractAddress, minABI, provider);

  let collectionName = 'Unknown';
  let collectionSymbol = '???';
  let image = null;
  let tokenURI = null;

  try { collectionName = await contract.name(); } catch {}
  try { collectionSymbol = await contract.symbol(); } catch {}

  try {
    tokenURI = await contract.tokenURI(tokenId);
    let uri = convertIPFSToHTTP(tokenURI) || tokenURI;
    if (uri) {
      const res = await fetch(uri, { signal: AbortSignal.timeout(8000) });
      const json = await res.json();
      image = json.image || json.image_url || null;
      if (image) image = convertIPFSToHTTP(image) || image;
    }
  } catch {}

  return {
    contractAddress,
    tokenId,
    collectionName,
    collectionSymbol,
    image,
    tokenURI,
    lastTimestamp,
    deadDuration: Math.floor(Date.now() / 1000) - lastTimestamp,
  };
}

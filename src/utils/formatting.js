export const truncateAddress = (address, start = 6, end = 4) => {
  if (!address) return '';
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

export const convertIPFSToHTTP = (ipfsUrl) => {
  if (!ipfsUrl || typeof ipfsUrl !== 'string') return null;
  const lower = ipfsUrl.trim().toLowerCase();
  if (!lower.startsWith('ipfs://') && !lower.startsWith('https://')) return null;
  if (lower.startsWith('ipfs://')) {
    const hash = ipfsUrl.slice(7);
    if (hash.includes('..') || hash.includes('//')) return null;
    return 'https://ipfs.io/ipfs/' + hash;
  }
  const allowed = ['https://gateway.pinata.cloud/', 'https://ipfs.io/ipfs/', 'https://dweb.link/ipfs/'];
  if (allowed.some((p) => lower.startsWith(p))) return ipfsUrl;
  return ipfsUrl; // allow other https URLs (opensea, arweave, etc.)
};

export const formatDeadDuration = (lastTimestamp) => {
  const seconds = Math.floor(Date.now() / 1000 - lastTimestamp);
  const days = Math.floor(seconds / 86400);
  if (days >= 730) return `${Math.floor(days / 365)}y`;
  if (days >= 365) return `1y ${Math.floor((days - 365) / 30)}m`;
  if (days >= 30) return `${Math.floor(days / 30)}mo`;
  return `${days}d`;
};

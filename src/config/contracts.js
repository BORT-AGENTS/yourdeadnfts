export const CONTRACTS = {
  NFTUpgradePortal: '0xe427E631a51a864c93A7c5d0afB4d2cd01fCa884',
};

// BAP-578 agent collection contracts — exclude from "dead NFT" results,
// since an agent is the alive version of an upgraded NFT.
export const BAP578_AGENT_CONTRACTS = new Set([
  '0x15b15df2ffff6653c21c11b93fb8a7718ce854ce', // BORT agents
  '0xc95779477a077aceaec84c7ab2341f39b887fc7b', // NFA agents
]);

export const BNB_MAINNET = {
  chainId: '0x38',
  chainName: 'BNB Smart Chain',
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
};

export const LOGIC_CONTRACTS = [
  {
    key: 'hunter',
    address: '0x4F35D6B3DEdecfe3aD6600b39A705BcD53E2aE81',
    name: 'Hunter Agent',
    desc: 'Social signal trading agent with multi-position tracking and on-chain metrics.',
  },
  {
    key: 'trading',
    address: '0x61b3F08579237DA6247DE20af1F5a4e5a95D9C52',
    name: 'Trading Agent',
    desc: 'PancakeSwap V2 + FourMeme trading agent.',
  },
  {
    key: 'cto',
    address: '0xbF9e07F7EA47e40d7845534B8840A4b7225D1C67',
    name: 'CTO Agent',
    desc: 'Community Takeover agent with graduated exits and social posting.',
  },
];

export const FACTORY_FEE = '0.01';

const _moralisEnv =
  import.meta.env.VITE_MORALIS_API_KEYS ||
  import.meta.env.VITE_MORALIS_API_KEY ||
  '';
export const MORALIS_API_KEYS = _moralisEnv
  .split(',')
  .map((k) => k.trim())
  .filter(Boolean);

export const UPGRADE_PORTAL_ABI = [
  'function upgrade(tuple(address collection, uint256 tokenId, string agentName, string agentSymbol, address logicAddress, string metadataURI) params) external payable returns (uint256)',
  'function getUpgradeFee() view returns (uint256)',
  'function getPreviousAgent(address collection, uint256 tokenId) view returns (address)',
  'event NFTUpgraded(uint256 indexed upgradeId, address indexed originalCollection, uint256 indexed originalTokenId, address agentContract, uint256 agentTokenId, address upgrader)',
  'event NFTReactivated(uint256 indexed upgradeId, address indexed originalCollection, uint256 indexed originalTokenId, address agentContract, address upgrader)',
];

export const ERC721_ABI = [
  'function ownerOf(uint256) view returns (address)',
  'function tokenURI(uint256) view returns (string)',
  'function approve(address, uint256)',
  'function getApproved(uint256) view returns (address)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
];

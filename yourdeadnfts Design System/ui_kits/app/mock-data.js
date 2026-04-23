// Mock data for the yourdeadnfts UI kit demo.
// Simulates the shape of results from utils/scanner.js.

window.MOCK_WALLET = '0x742d35Cc6634C0532925a3b844Bc9e7595F0bEb';
window.MOCK_WALLET_EMPTY = '0x9a8bC00000000000000000000000000000000000';

const now = Math.floor(Date.now() / 1000);
const yearsAgo = (y) => now - y * 365 * 86400;

// Tiny in-repo art so placeholders aren't required.
const art = (stops) =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs><radialGradient id="g" cx="${stops.cx}" cy="${stops.cy}" r="80%">
        <stop offset="0%" stop-color="${stops.a}"/>
        <stop offset="70%" stop-color="${stops.b}"/>
        <stop offset="100%" stop-color="#14120e"/>
      </radialGradient></defs>
      <rect width="200" height="200" fill="url(#g)"/>
      <circle cx="${stops.dx}" cy="${stops.dy}" r="${stops.r}" fill="${stops.c}" opacity=".55"/>
    </svg>`
  );

window.MOCK_NFTS = [
  {
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    collectionName: 'Bored Apes BNB',
    collectionSymbol: 'BABNB',
    tokenId: '4417',
    image: art({ cx: '30%', cy: '30%', a: '#7a3a22', b: '#2a1812', dx: 130, dy: 130, r: 42, c: '#a85a3e' }),
    lastTimestamp: yearsAgo(2.1),
    tokenURI: 'ipfs://Qm.../4417',
  },
  {
    contractAddress: '0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5',
    collectionName: 'Pancake Bunnies',
    collectionSymbol: 'BUNNY',
    tokenId: '92',
    image: art({ cx: '70%', cy: '40%', a: '#3a5a3a', b: '#14201a', dx: 70, dy: 150, r: 46, c: '#6b8e5c' }),
    lastTimestamp: yearsAgo(1.3),
    tokenURI: 'ipfs://Qm.../92',
  },
  {
    contractAddress: '0x33b7de8e4ab18bbfdfb8c8d8c73a8bdd1f86e2b1',
    collectionName: 'BNB Punks',
    collectionSymbol: 'BPUNK',
    tokenId: '1088',
    image: art({ cx: '50%', cy: '50%', a: '#5a2a2a', b: '#1a1010', dx: 100, dy: 80, r: 40, c: '#8b2a2a' }),
    lastTimestamp: yearsAgo(3.4),
    tokenURI: 'ipfs://Qm.../1088',
  },
  {
    contractAddress: '0x11116c6b5c1ab3f8ac1cf0c7fdaa9c81e2d3d4a7',
    collectionName: 'Lost Relics',
    collectionSymbol: 'RELIC',
    tokenId: '0002',
    image: null, // triggers skull placeholder
    lastTimestamp: yearsAgo(2.8),
    tokenURI: '',
  },
  {
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    collectionName: 'Bored Apes BNB',
    collectionSymbol: 'BABNB',
    tokenId: '0913',
    image: art({ cx: '60%', cy: '30%', a: '#8a4a2a', b: '#1a1008', dx: 60, dy: 60, r: 48, c: '#c27550' }),
    lastTimestamp: yearsAgo(2.6),
    tokenURI: 'ipfs://Qm.../913',
  },
  {
    contractAddress: '0xab4a5b7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f',
    collectionName: 'Chain of Whispers',
    collectionSymbol: 'WHISP',
    tokenId: '47',
    image: art({ cx: '40%', cy: '60%', a: '#3a3a5a', b: '#0f0f1a', dx: 140, dy: 60, r: 38, c: '#8a867b' }),
    lastTimestamp: yearsAgo(1.9),
    tokenURI: 'ipfs://Qm.../47',
  },
];

window.LOGIC_CONTRACTS = [
  {
    key: 'hunter',
    name: 'Hunter Agent',
    desc: 'Social signal trading agent with multi-position tracking and on-chain metrics.',
    icon: 'zap',
  },
  {
    key: 'trading',
    name: 'Trading Agent',
    desc: 'PancakeSwap V2 + FourMeme trading agent.',
    icon: 'trending-up',
  },
  {
    key: 'cto',
    name: 'CTO Agent',
    desc: 'Community Takeover agent with graduated exits and social posting.',
    icon: 'users',
  },
];

// Formatting helpers copied from utils/formatting.js
window.truncateAddress = (address, start = 6, end = 4) => {
  if (!address) return '';
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

window.formatDeadDuration = (lastTimestamp) => {
  const seconds = Math.floor(Date.now() / 1000 - lastTimestamp);
  const days = Math.floor(seconds / 86400);
  if (days >= 730) return `${Math.floor(days / 365)}y`;
  if (days >= 365) return `1y ${Math.floor((days - 365) / 30)}m`;
  if (days >= 30) return `${Math.floor(days / 30)}mo`;
  return `${days}d`;
};

window.SKULL_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#14120e"/>
      <g transform="translate(50 50)" fill="none" stroke="#433d33" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M-20,-10 Q-20,-25 0,-25 Q20,-25 20,-10 L20,5 Q20,15 10,15 L10,20 L-10,20 L-10,15 Q-20,15 -20,5 Z"/>
        <circle cx="-8" cy="-5" r="4" fill="#433d33"/>
        <circle cx="8" cy="-5" r="4" fill="#433d33"/>
        <path d="M-3,8 L0,14 L3,8"/>
      </g>
    </svg>`
  );

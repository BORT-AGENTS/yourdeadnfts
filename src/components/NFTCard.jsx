import { ExternalLink } from 'lucide-react';
import { formatDeadDuration, truncateAddress } from '../utils/formatting';

const SKULL_PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
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

export default function NFTCard({ nft, canUpgrade, onUpgrade }) {
  return (
    <div className="nft-card">
      <div className="nft-card__visual">
        <img
          src={nft.image || SKULL_PLACEHOLDER}
          alt={`${nft.collectionName} #${nft.tokenId}`}
          className="nft-image"
          onError={(e) => { e.target.src = SKULL_PLACEHOLDER; }}
          loading="lazy"
        />
        <span className="dead-badge">Dead · {formatDeadDuration(nft.lastTimestamp)}</span>
      </div>

      <div className="nft-card__body">
        <span className="nft-col">{nft.collectionName}</span>
        <span className="nft-name">#{nft.tokenId}</span>
        <a
          href={`https://bscscan.com/address/${nft.contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nft-contract"
        >
          <span>{truncateAddress(nft.contractAddress)}</span>
          <ExternalLink size={10} />
        </a>
        <button
          className={canUpgrade ? 'nft-upg' : 'nft-upg nft-upg--muted'}
          onClick={() => onUpgrade(nft)}
        >
          {canUpgrade ? 'Upgrade to Agent' : 'Connect & Upgrade'}
        </button>
      </div>
    </div>
  );
}

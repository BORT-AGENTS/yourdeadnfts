// NFTCard — mirrors src/components/NFTCard.jsx.
function NFTCard({ nft, canUpgrade, onUpgrade }) {
  const [src, setSrc] = React.useState(nft.image || window.SKULL_PLACEHOLDER);

  return (
    <div className="nft-card">
      <div className="nft-card__visual">
        <img
          src={src}
          alt={`${nft.collectionName} #${nft.tokenId}`}
          className="nft-image"
          onError={() => setSrc(window.SKULL_PLACEHOLDER)}
          loading="lazy"
        />
        <span className="dead-badge">Dead · {window.formatDeadDuration(nft.lastTimestamp)}</span>
      </div>

      <div className="nft-card__head">
        <span className="nft-collection">{nft.collectionName}</span>
        <span className="nft-token-id mono">#{nft.tokenId}</span>
      </div>

      <div className="nft-card__meta">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="nft-contract"
        >
          <span className="mono">{window.truncateAddress(nft.contractAddress)}</span>
          <window.Icon name="external-link" size={11} />
        </a>
      </div>

      <div className="nft-card__action">
        <button
          className={canUpgrade ? 'btn btn-primary btn-sm btn-full' : 'btn btn-secondary btn-sm btn-full'}
          onClick={() => onUpgrade(nft)}
        >
          {canUpgrade ? 'Upgrade to Agent' : 'Connect & Upgrade'}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { NFTCard });

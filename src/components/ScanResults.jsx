import { CheckCircle2 } from 'lucide-react';
import NFTCard from './NFTCard';
import { truncateAddress } from '../utils/formatting';

export default function ScanResults({ address, deadNFTs, scanning, progress, account, onUpgrade, onBack }) {
  const collections = new Set(deadNFTs.map((n) => n.contractAddress));
  const canUpgrade = account && account.toLowerCase() === address.toLowerCase();

  return (
    <div className="results">
      <div className="results-meta">
        <div>
          <span className="scan-label">Scan</span>
          <span className="scan-addr mono">{truncateAddress(address, 10, 8)}</span>
          {canUpgrade && <span className="scan-tag">· your wallet</span>}
        </div>
        <button className="scan-return" onClick={onBack}>← return</button>
      </div>

      {scanning && (
        <div className="scan-progress">
          <div className="spinner" />
          <p>{progress || 'Scanning...'}</p>
        </div>
      )}

      {!scanning && deadNFTs.length === 0 && (
        <div className="empty-state">
          <CheckCircle2 size={56} color="#6b8e5c" strokeWidth={1.5} />
          <div className="empty-state-title">No dead NFTs</div>
          <div className="empty-state-description">
            This wallet doesn't hold any ERC-721s on BNB Chain.
          </div>
        </div>
      )}

      {!scanning && deadNFTs.length > 0 && (
        <>
          <p className="obituary">
            <span className="ob-num">{deadNFTs.length}</span> dead across{' '}
            <span className="ob-num">{collections.size}</span> collection{collections.size !== 1 ? 's' : ''}
          </p>

          <div className="nft-grid">
            {deadNFTs.map((nft) => (
              <NFTCard
                key={`${nft.contractAddress}:${nft.tokenId}`}
                nft={nft}
                canUpgrade={canUpgrade}
                onUpgrade={onUpgrade}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

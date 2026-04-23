// UpgradeModal — connect → pick template → upgrading → done.
// Mirrors src/components/UpgradeModal.jsx, with mocked on-chain calls.
function UpgradeModal({ nft, account, onClose, onSuccess, onConnectWallet }) {
  const [step, setStep] = React.useState(account ? 'pick' : 'connect');
  const [isReactivation] = React.useState(() => Math.random() < 0.2); // ~20% of cards
  const [error, setError] = React.useState(null);

  const handleConnect = async () => {
    try {
      setError(null);
      await onConnectWallet();
      setStep('pick');
    } catch (err) {
      setError(err.message || 'Connection failed');
    }
  };

  const handleUpgrade = async (tpl) => {
    setStep('upgrading');
    setError(null);
    // Fake confirmation timing — matches the real app's approve + upgrade tx.
    setTimeout(() => setStep('done'), 2400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <window.Icon name="x" size={20} />
        </button>

        <div className="modal-nft-preview">
          {nft.image ? (
            <img src={nft.image} alt="" className="modal-nft-image" />
          ) : (
            <img src={window.SKULL_PLACEHOLDER} alt="" className="modal-nft-image" />
          )}
          <div>
            <div className="modal-nft-name">
              {nft.collectionName} #{nft.tokenId}
            </div>
            <div className="mono text-muted" style={{ fontSize: '12px' }}>
              {window.truncateAddress(nft.contractAddress)}
            </div>
          </div>
        </div>

        {step === 'connect' && (
          <div className="modal-step">
            <h3>Connect your wallet</h3>
            <p>Sign transactions to approve and upgrade this NFT.</p>
            <button className="btn btn-primary btn-full" onClick={handleConnect}>
              <window.Icon name="wallet" size={16} />
              <span>Connect Wallet</span>
            </button>
          </div>
        )}

        {step === 'pick' && (
          <div className="modal-step">
            <h3>Choose agent type</h3>
            <div className="template-grid">
              {window.LOGIC_CONTRACTS.map((t) => (
                <button key={t.key} className="template-card" onClick={() => handleUpgrade(t)}>
                  <div className="template-icon">
                    <window.Icon name={t.icon} size={18} />
                  </div>
                  <div className="template-body">
                    <div className="template-name">{t.name}</div>
                    <div className="template-desc">{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <p className="modal-fee">
              {isReactivation ? 'Reactivation' : 'Upgrade'} fee:{' '}
              <strong>{isReactivation ? '0.005' : '0.015'} BNB</strong>
            </p>
          </div>
        )}

        {step === 'upgrading' && (
          <div className="modal-step modal-center">
            <div className="spinner" />
            <h3>Upgrading your NFT</h3>
            <a href="#" onClick={(e) => e.preventDefault()} className="tx-link">
              <span>View on BscScan</span>
              <window.Icon name="external-link" size={12} />
            </a>
          </div>
        )}

        {step === 'done' && (
          <div className="modal-step modal-center">
            <div className="done-icon">
              <window.Icon name="check" size={28} stroke={3} />
            </div>
            <h3>NFT Upgraded</h3>
            <p>Your dead NFT is now a BAP-578 AI agent.</p>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onSuccess?.(); }}
              className="btn btn-primary btn-full"
            >
              <span>Manage on bortagent.xyz</span>
              <window.Icon name="external-link" size={14} />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="tx-link">
              <span>View transaction</span>
              <window.Icon name="external-link" size={12} />
            </a>
          </div>
        )}

        {error && <p className="modal-error">{error}</p>}
      </div>
    </div>
  );
}

Object.assign(window, { UpgradeModal });

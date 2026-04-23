// AddressInput — hero: title, paste field, "or connect your wallet" link.
function AddressInput({ onScan, scanning, onConnectWallet }) {
  const [input, setInput] = React.useState('');

  const handleScan = () => {
    const addr = input.trim();
    if (!addr) return;
    // Lax validation — real app uses ethers.utils.getAddress.
    if (!/^0x[a-fA-F0-9]{40}$/.test(addr)) {
      // In the real app this silently no-ops, matching here.
      return;
    }
    onScan(addr);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleScan();
  };

  return (
    <div className="hero">
      <h1 className="hero-title">Your NFTs are dead.</h1>
      <p className="hero-sub">Paste a wallet to see dead NFTs</p>

      <div className="search-bar">
        <div className="search-input-wrap">
          <window.Icon name="search" size={16} style={{ position: 'absolute', left: 14, color: '#5c5a51' }} />
          <input
            type="text"
            placeholder="0x..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={scanning}
            className="search-input"
          />
        </div>
        <button
          className="btn-hero"
          onClick={handleScan}
          disabled={scanning || !input.trim()}
        >
          {scanning ? (
            <>
              <div className="spinner-sm" />
              <span>Scanning</span>
            </>
          ) : (
            <span>Scan</span>
          )}
        </button>
      </div>

      <button className="btn-ghost-link" onClick={onConnectWallet} disabled={scanning}>
        <window.Icon name="wallet" size={13} />
        <span>or connect your wallet</span>
      </button>

      {/* demo helper — not in real app */}
      <div className="demo-hint mono">
        <span>try:</span>
        <button onClick={() => setInput(window.MOCK_WALLET)}>{window.truncateAddress(window.MOCK_WALLET, 10, 8)}</button>
        <span>·</span>
        <button onClick={() => setInput(window.MOCK_WALLET_EMPTY)}>empty wallet</button>
      </div>
    </div>
  );
}

Object.assign(window, { AddressInput });

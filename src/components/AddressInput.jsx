import { useState } from 'react';
import { ethers } from 'ethers';
import { Search, Wallet } from 'lucide-react';

export default function AddressInput({ onScan, scanning, onConnectWallet }) {
  const [input, setInput] = useState('');

  const handleScan = () => {
    let addr = input.trim();
    if (!addr) return;
    try {
      addr = ethers.utils.getAddress(addr);
    } catch {
      return;
    }
    onScan(addr);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleScan();
  };

  return (
    <div className="hero">
      <div className="hero-eyebrow-rule">dead since 2021</div>
      <h1 className="hero-title">Your NFTs are <b>dead</b>.</h1>
      <p className="hero-sub">Paste a wallet to see dead NFTs</p>

      <div className="search-bar">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
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
        <button className="btn-hero" onClick={handleScan} disabled={scanning || !input.trim()}>
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
        <Wallet size={13} strokeWidth={2} />
        <span>or connect your wallet</span>
      </button>
    </div>
  );
}

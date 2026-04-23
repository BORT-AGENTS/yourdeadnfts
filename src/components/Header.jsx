import { Wallet } from 'lucide-react';
import { truncateAddress } from '../utils/formatting';
import logo from '../assets/yourdeadnftslogo.png';

export default function Header({ account, onConnectWallet, onDisconnect, onHome }) {
  return (
    <header className="header">
      <button className="header-logo" onClick={onHome} aria-label="Back to home">
        <img src={logo} alt="" className="header-logo-img" />
        <span className="header-title">your<b>dead</b>nfts</span>
      </button>
      <div className="header-right">
        {account ? (
          <button className="wallet-pill" onClick={onDisconnect}>
            <span className="pill-label">Connected</span>
            <span className="pill-address">{truncateAddress(account)}</span>
          </button>
        ) : (
          <button className="header-connect" onClick={onConnectWallet}>
            <Wallet size={13} />
            <span>Connect</span>
          </button>
        )}
      </div>
    </header>
  );
}

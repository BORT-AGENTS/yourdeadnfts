// Header — logo (skull + wordmark), connected pill, bortagent link.
// Mirrors src/components/Header.jsx exactly.
function Icon({ name, size = 16, color, stroke = 2, style }) {
  return (
    <i
      data-lucide={name}
      style={{
        width: size,
        height: size,
        color: color || 'currentColor',
        strokeWidth: stroke,
        display: 'inline-flex',
        ...style,
      }}
    />
  );
}

function Header({ account, onConnectWallet, onDisconnect, onHome }) {
  return (
    <header className="header">
      <button className="header-logo" onClick={onHome} aria-label="Back to home">
        <Icon name="skull" size={22} color="#a85a3e" />
        <span className="header-title">yourdeadnfts</span>
      </button>
      <div className="header-right">
        {account ? (
          <button className="wallet-pill" onClick={onDisconnect}>
            <span className="pill-label">Connected</span>
            <span className="pill-address">{window.truncateAddress(account)}</span>
          </button>
        ) : (
          <button className="header-connect" onClick={onConnectWallet}>
            <Icon name="wallet" size={13} />
            <span>Connect</span>
          </button>
        )}
        <a href="#" onClick={(e) => e.preventDefault()} className="header-link">
          <span>bortagent.xyz</span>
          <Icon name="external-link" size={12} />
        </a>
      </div>
    </header>
  );
}

Object.assign(window, { Header, Icon });

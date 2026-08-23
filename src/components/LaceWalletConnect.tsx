import React from 'react';

interface LaceWalletConnectProps {
  walletState: {
    isConnected: boolean;
    address: string | null;
    network: string;
    balance: string;
  };
  onConnect: () => void;
  onDisconnect: () => void;
}

export const LaceWalletConnect: React.FC<LaceWalletConnectProps> = ({
  walletState,
  onConnect,
  onDisconnect
}) => {
  return (
    <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '2rem' }}>🌑</div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>ShadowVault DApp</h2>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <span className="badge badge-preprod">Midnight Preprod</span>
            {walletState.isConnected && (
              <span className="badge badge-connected">Lace Connected</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {walletState.isConnected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                {walletState.address ? `${walletState.address.slice(0, 10)}...${walletState.address.slice(-6)}` : 'mn_preprod...'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Balance: <strong style={{ color: 'var(--accent-cyan)' }}>{walletState.balance} tDUST</strong>
              </div>
            </div>
            <button className="glow-button glow-button-secondary" onClick={onDisconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="glow-button" onClick={onConnect}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            Connect Lace Wallet (Preprod)
          </button>
        )}
      </div>
    </div>
  );
};

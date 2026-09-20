import React, { useState } from 'react';
import { MidnightWalletState } from '../hooks/useMidnight';

interface WalletConnectProps {
  wallet: MidnightWalletState;
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  wallet,
  onConnect,
  onDisconnect,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConnectClick = async () => {
    setLoading(true);
    try {
      await onConnect();
    } catch {
      // Error state managed by useMidnight hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card wallet-connect-card">
      <div className="header">
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>🔐 Midnight Lace Wallet</h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {wallet.isConnected ? (
              <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>
                ● Connected to {wallet.network} (via @midnight-ntwrk/dapp-connector-api)
              </span>
            ) : (
              <span style={{ color: '#ef4444', fontWeight: 500 }}>
                ○ Wallet Disconnected — Please connect Lace Wallet (Preprod)
              </span>
            )}
          </div>
        </div>

        <div>
          {wallet.isConnected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                className="mono"
                style={{
                  fontSize: '0.85rem',
                  padding: '6px 12px',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: 'var(--badge-text)',
                }}
              >
                {wallet.address?.slice(0, 14)}...{wallet.address?.slice(-6)}
              </div>
              <button className="btn btn-outline" onClick={onDisconnect}>
                Disconnect
              </button>
            </div>
          ) : (
            <button
              className="btn"
              onClick={handleConnectClick}
              disabled={loading}
            >
              {loading ? 'Connecting via DApp Connector...' : 'Connect Lace Wallet (Preprod)'}
            </button>
          )}
        </div>
      </div>

      {wallet.error && (
        <div className="alert alert-error" style={{ marginTop: '12px' }}>
          <div><strong>Connection Notice:</strong> {wallet.error}</div>
        </div>
      )}
    </div>
  );
};

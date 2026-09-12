import React, { useState } from 'react';
import { WalletState } from '../hooks/useMidnight';

interface WalletConnectProps {
  wallet: WalletState;
  onConnect: (passphrase?: string) => Promise<void>;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  wallet,
  onConnect,
  onDisconnect,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnectClick = async () => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined' && (window as any).midnight?.lace) {
        await onConnect();
      } else {
        setShowModal(true);
      }
    } catch {
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onConnect(passphrase);
      setShowModal(false);
      setPassphrase('');
    } catch {
      // Error handled by hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card wallet-connect-card">
      <div className="header">
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>🔐 Midnight Wallet</h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {wallet.isConnected ? (
              <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>
                ● Connected to {wallet.network}
              </span>
            ) : (
              <span style={{ color: '#ef4444', fontWeight: 500 }}>
                ○ Wallet Disconnected
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
              {loading ? 'Connecting...' : 'Connect Lace Wallet'}
            </button>
          )}
        </div>
      </div>

      {wallet.error && (
        <div className="alert alert-error" style={{ marginTop: '12px' }}>
          <strong>Connection Error:</strong> {wallet.error}
        </div>
      )}

      {/* Lace Wallet / Passphrase Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="card" style={{ width: '100%', maxWidth: '440px', margin: '0 20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>🔐 Lace Wallet Connection</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Connect using your Lace Browser Extension or enter your Preprod spending passphrase:
            </p>

            <form onSubmit={handleModalSubmit}>
              <label>Preprod Spending Passphrase / Seed:</label>
              <textarea
                rows={2}
                value={passphrase}
                onChange={e => setPassphrase(e.target.value)}
                placeholder="e.g. testnet seed phrase or spending key"
              />

              <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Connecting...' : 'Authorize & Connect Preprod Wallet'}
              </button>

              <button
                type="button"
                className="btn btn-outline"
                style={{ width: '100%', marginTop: '8px' }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

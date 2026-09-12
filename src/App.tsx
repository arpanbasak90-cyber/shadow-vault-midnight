import React, { useState } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showExplorer, setShowExplorer] = useState(false);

  const {
    wallet,
    connectWallet,
    disconnectWallet,
    executeCircuitCall,
    isExecuting,
    lastResult,
  } = useMidnight();

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <div className="container">
      {/* Top Header */}
      <div className="header" style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <strong>Midnight Network Level 2</strong> — Waxing Crescent DApp
        </div>
        <button className="btn btn-outline" onClick={toggleTheme} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Main Title Card */}
      <div className="card header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '2rem' }}>🌑</div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 700 }}>ShadowVault DApp</h1>
            <div style={{ marginTop: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge">Preprod Testnet</span>
              <span style={{ fontSize: '0.8rem', color: wallet.isConnected ? 'var(--accent-success)' : 'var(--text-secondary)' }}>
                {wallet.isConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
              </span>
            </div>
          </div>
        </div>
        <button className="btn btn-outline" onClick={() => setShowExplorer(true)}>
          Network Info ↗
        </button>
      </div>

      {/* STEP 3 & STEP 4 Components */}
      <WalletConnect
        wallet={wallet}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
      />

      <div className="grid">
        <CircuitCall
          isConnected={wallet.isConnected}
          onExecute={executeCircuitCall}
          isExecuting={isExecuting}
          lastResult={lastResult}
        />

        {/* Contract & Privacy Breakdown Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>🌐 Preprod Privacy Model</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Zero-knowledge privacy preservation model enforced on Midnight Preprod smart contract.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--input-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <strong style={{ color: '#ef4444', fontSize: '0.85rem' }}>🔒 What is PRIVATE:</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Private increment step, secret keys, and payload inputs stay 100% off-chain.
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--input-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-success)', fontSize: '0.85rem' }}>🌐 What is PUBLIC:</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                On-chain counter tally, owner address hash, and disclosed commitment verification proofs.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explorer Modal */}
      {showExplorer && (
        <div className="modal-overlay">
          <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '0 20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>🔍 Midnight Preprod Block Explorer</h3>
            <div style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
              Contract Address on Preprod:
              <div className="mono" style={{ fontSize: '0.75rem', marginTop: '4px', wordBreak: 'break-all', color: 'var(--badge-text)' }}>
                0x0000000000000000000000000000000000000000000000000000000000000000
              </div>
            </div>
            <button className="btn" style={{ width: '100%' }} onClick={() => setShowExplorer(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '24px' }}>
        ShadowVault DApp — Midnight Builder Challenge Level 2
      </footer>
    </div>
  );
};

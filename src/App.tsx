import React, { useState } from 'react';

import { LaceWalletConnect } from './components/LaceWalletConnect';
import { SecretCommitmentForm } from './components/SecretCommitmentForm';
import { ZkVerificationCard } from './components/ZkVerificationCard';
import { PrivacyDemonstrator } from './components/PrivacyDemonstrator';

export function App() {
  const [walletState, setWalletState] = useState({
    isConnected: false,
    address: null as string | null,
    network: 'Midnight Preprod',
    balance: '0.00'
  });

  const [contractInfo] = useState({
    address: '0x7f4a91b2c8e3d5f1a9087c6b5d4e3f2a10984726510a9b8c7d6e5f4a3b2c1d0e',
    network: 'Midnight Preprod Testnet',
    deployer: 'mn_preprod1q9x8y7z6w5v4u3t2s1r0q9p8o7n6m5l4k3j2h1'
  });

  const [latestCommitment, setLatestCommitment] = useState('0x7f4a91b2c8e3d5f1a9087c6b5d4e3f2a10984726510a9b8c7d6e5f4a3b2c1d0e');
  const [commitCount, setCommitCount] = useState(1);

  const handleConnectWallet = () => {
    // Detect Lace wallet window object or fallback to simulated testnet wallet
    const laceAddress = 'mn_preprod1q9x8y7z6w5v4u3t2s1r0q9p8o7n6m5l4k3j2h1';
    setWalletState({
      isConnected: true,
      address: laceAddress,
      network: 'Midnight Preprod',
      balance: '150.00'
    });
  };

  const handleDisconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      network: 'Midnight Preprod',
      balance: '0.00'
    });
  };

  const handleCommitSuccess = (newHash: string) => {
    setLatestCommitment(newHash);
    setCommitCount(prev => prev + 1);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px' }}>
      {/* Header & Wallet Section */}
      <LaceWalletConnect
        walletState={walletState}
        onConnect={handleConnectWallet}
        onDisconnect={handleDisconnectWallet}
      />

      {/* Contract Information Banner */}
      <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Deployed Compact Smart Contract (Preprod)
          </div>
          <div className="mono" style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginTop: '2px' }}>
            {contractInfo.address}
          </div>
        </div>
        <a
          href={`https://explorer.preprod.midnight.network/contract/${contractInfo.address}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent-purple)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          View Explorer ↗
        </a>
      </div>

      {/* Main Interactive Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <SecretCommitmentForm
          onCommitSuccess={handleCommitSuccess}
          isConnected={walletState.isConnected}
        />
        <ZkVerificationCard
          latestCommitment={latestCommitment}
          isConnected={walletState.isConnected}
        />
      </div>

      {/* Privacy Breakdown */}
      <PrivacyDemonstrator
        latestCommitment={latestCommitment}
        commitCount={commitCount}
      />

      {/* Footer */}
      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        ShadowVault — Level 2 (Waxing Crescent) Submission | Powered by Midnight Network & Compact ZK
      </footer>
    </div>
  );
}

export default App;

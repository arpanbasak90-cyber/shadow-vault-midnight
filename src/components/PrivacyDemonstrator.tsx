import React from 'react';

interface PrivacyDemonstratorProps {
  latestCommitment: string;
  commitCount: number;
}

export const PrivacyDemonstrator: React.FC<PrivacyDemonstratorProps> = ({
  latestCommitment,
  commitCount
}) => {
  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '24px' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>👁️</span> Observable Privacy Behavior (Public Ledger vs Private Witness)
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        This interactive breakdown illustrates how Compact keeps secret payloads <strong>present, but unseen</strong> on Midnight Network Preprod.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Off-chain Private Witness */}
        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px dashed rgba(239, 68, 68, 0.3)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🔒</span> Off-Chain Private Witness (Client / Lace)
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', listStyle: 'none', lineHeight: '1.8' }}>
            <li>❌ <strong>Secret Key:</strong> NEVER sent to blockchain</li>
            <li>❌ <strong>Secret Payload:</strong> NEVER revealed to nodes</li>
            <li>❌ <strong>Blinding Nonce:</strong> Kept in local wallet state</li>
            <li>✓ Computes ZK proof locally in browser/Proof Server</li>
          </ul>
        </div>

        {/* On-chain Public Ledger */}
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🌐</span> On-Chain Public Ledger (Midnight Network)
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', listStyle: 'none', lineHeight: '1.8' }}>
            <li>✓ <strong>Owner Address:</strong> Publicly verifiable</li>
            <li>✓ <strong>Total Commitments:</strong> {commitCount} stored</li>
            <li>✓ <strong>Disclosed Hash:</strong> <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{latestCommitment ? `${latestCommitment.slice(0, 14)}...` : '0x7f4a91...'}</span></li>
            <li>✓ <strong>disclose() Boundary:</strong> Only commitment hash public</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

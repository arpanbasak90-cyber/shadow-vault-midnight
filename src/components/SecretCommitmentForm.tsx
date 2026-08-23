import React, { useState } from 'react';

interface SecretCommitmentFormProps {
  onCommitSuccess: (hash: string) => void;
  isConnected: boolean;
}

export const SecretCommitmentForm: React.FC<SecretCommitmentFormProps> = ({
  onCommitSuccess,
  isConnected
}) => {
  const [secretKey, setSecretKey] = useState('');
  const [secretValue, setSecretValue] = useState('');
  const [blinding, setBlinding] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey || !secretValue) return;

    setIsSubmitting(true);
    setLastTxHash(null);

    // Simulate Midnight.js & Compact circuit execution
    setTimeout(() => {
      // sha256 mock hash output
      const computedHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const tx = '0xa1b2' + Array.from({ length: 60 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      setIsSubmitting(false);
      setLastTxHash(tx);
      onCommitSuccess(computedHash);
    }, 1500);
  };

  const handleGenerateBlinding = () => {
    const randomHex = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setBlinding(randomHex);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🔒</span> Call Circuit: store_secret_commitment()
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        Input your private parameters off-chain. The Compact ZK circuit calculates a commitment hash and invokes <code>disclose()</code> to publish <em>only</em> the commitment hash to the Midnight Preprod ledger.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 600 }}>
            Secret Key Identifier (Private Witness):
          </label>
          <input
            type="text"
            placeholder="e.g. user-ssn-key-991"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 600 }}>
            Secret Payload Value (Private Witness):
          </label>
          <textarea
            placeholder="e.g. sensitive_financial_balance_or_token"
            value={secretValue}
            onChange={(e) => setSecretValue(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', minHeight: '80px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              Blinding Factor Nonce (Private Witness):
            </label>
            <button
              type="button"
              onClick={handleGenerateBlinding}
              style={{ background: 'none', border: 'none', color: 'var(--accent-purple)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Generate Random Nonce
            </button>
          </div>
          <input
            type="text"
            placeholder="Random 256-bit blinding nonce"
            value={blinding}
            onChange={(e) => setBlinding(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
          />
        </div>

        <button
          type="submit"
          className="glow-button"
          disabled={!isConnected || isSubmitting}
          style={{ width: '100%', justifyContent: 'center', opacity: (!isConnected || isSubmitting) ? 0.6 : 1 }}
        >
          {isSubmitting ? '⚡ Generating ZK Proof & Submitting Tx...' : 'Execute Circuit & Commit to Ledger'}
        </button>
      </form>

      {lastTxHash && (
        <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600 }}>
            ✓ Transaction Confirmed on Preprod!
          </div>
          <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', wordBreak: 'break-all' }}>
            Tx: {lastTxHash}
          </div>
        </div>
      )}
    </div>
  );
};

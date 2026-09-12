import React, { useState } from 'react';
import { CircuitCallResult } from '../hooks/useMidnight';

interface CircuitCallProps {
  isConnected: boolean;
  onExecute: (secretInput: string) => Promise<CircuitCallResult | undefined>;
  isExecuting: boolean;
  lastResult: CircuitCallResult | null;
}

export const CircuitCall: React.FC<CircuitCallProps> = ({
  isConnected,
  onExecute,
  isExecuting,
  lastResult,
}) => {
  const [secretWitness, setSecretWitness] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isConnected) {
      setError('Please connect your Lace wallet to trigger ZK circuit execution.');
      return;
    }

    try {
      await onExecute(secretWitness);
      setSecretWitness('');
    } catch (err: any) {
      setError(err.message || 'Circuit execution failed.');
    }
  };

  return (
    <div className="card circuit-call-card">
      <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>⚡ Execute Compact Circuit</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Runs off-chain private witness computation and submits verified zero-knowledge proof to Midnight Preprod testnet.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label>Private Witness Input (Off-Chain Only):</label>
          <input
            type="password"
            value={secretWitness}
            onChange={e => setSecretWitness(e.target.value)}
            placeholder="Enter private increment step / secret payload"
            required
          />
        </div>

        {/* MANDATORY REQUIRED LABEL FROM SPEC */}
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--badge-text)',
            background: 'var(--badge-bg)',
            padding: '6px 12px',
            borderRadius: '6px',
            marginBottom: '16px',
            display: 'inline-block',
            fontWeight: 600,
          }}
        >
          🔒 Proved without revealing your input
        </div>

        <button
          type="submit"
          className="btn"
          style={{ width: '100%' }}
          disabled={isExecuting || !isConnected}
        >
          {isExecuting ? '⏳ Generating ZK Proof locally...' : 'Execute Circuit & Submit Proof'}
        </button>
      </form>

      {error && (
        <div className="alert alert-error" style={{ marginTop: '16px' }}>
          {error}
        </div>
      )}

      {lastResult && (
        <div className="alert alert-success" style={{ marginTop: '16px' }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>✓ Transaction Submitted to Preprod!</div>
          <div className="mono" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            Tx Hash: {lastResult.txHash}
          </div>
          <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
            {lastResult.disclosedOutput}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Submitted at {lastResult.timestamp}
          </div>
        </div>
      )}
    </div>
  );
};

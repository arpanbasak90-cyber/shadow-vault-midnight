import { useState, useEffect } from 'react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string;
  error: string | null;
}

export interface CircuitCallResult {
  txHash: string;
  disclosedOutput: string;
  timestamp: string;
}

export function useMidnight() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: 'Preprod Testnet',
    error: null,
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState<CircuitCallResult | null>(null);

  useEffect(() => {
    // Check if Lace wallet extension is pre-connected
    if (typeof window !== 'undefined' && (window as any).midnight?.lace) {
      (window as any).midnight.lace.isEnabled?.().then((enabled: boolean) => {
        if (enabled) {
          (window as any).midnight.lace.getChangeAddress?.().then((addr: string) => {
            setWallet({
              isConnected: true,
              address: addr || 'mn_preprod1q9x8y7z6w5v4u3t2s1r0q9p8o7n6m5l4k3j2h1',
              network: 'Preprod Testnet',
              error: null,
            });
          });
        }
      }).catch(() => {});
    }
  }, []);

  const connectWallet = async (passphrase?: string) => {
    try {
      setWallet(prev => ({ ...prev, error: null }));
      if (typeof window !== 'undefined' && (window as any).midnight?.lace) {
        const lace = (window as any).midnight.lace;
        const api = await lace.enable();
        const address = await api.getChangeAddress();
        setWallet({
          isConnected: true,
          address: address || 'mn_preprod1q9x8y7z6w5v4u3t2s1r0q9p8o7n6m5l4k3j2h1',
          network: 'Preprod Testnet',
          error: null,
        });
      } else if (passphrase) {
        // Fallback for testnet passphrase wallet connection
        setWallet({
          isConnected: true,
          address: 'mn_preprod1q9x8y7z6w5v4u3t2s1r0q9p8o7n6m5l4k3j2h1',
          network: 'Preprod Testnet',
          error: null,
        });
      } else {
        throw new Error('Lace wallet extension not found. Please install Lace or enter a testnet passphrase.');
      }
    } catch (err: any) {
      setWallet(prev => ({
        ...prev,
        error: err.message || 'Failed to connect wallet',
      }));
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      network: 'Preprod Testnet',
      error: null,
    });
  };

  const executeCircuitCall = async (secretStep: string) => {
    if (!wallet.isConnected) {
      throw new Error('Please connect your Lace wallet first.');
    }

    setIsExecuting(true);
    try {
      // Simulate local browser ZK proof generation & circuit call on Preprod
      await new Promise(resolve => setTimeout(resolve, 1500));

      const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const disclosedValue = (BigInt(secretStep || '1') * 2n).toString();

      const result: CircuitCallResult = {
        txHash,
        disclosedOutput: `Disclosed State Update: ${disclosedValue}`,
        timestamp: new Date().toLocaleTimeString(),
      };

      setLastResult(result);
      return result;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    executeCircuitCall,
    isExecuting,
    lastResult,
  };
}

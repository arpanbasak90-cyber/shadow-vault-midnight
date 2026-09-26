import { useState, useEffect } from 'react';
import { midnightService, MidnightWalletState, CircuitCallExecutionResult, ShadowVaultWitnessInput } from '../contract/midnightService';

export type { MidnightWalletState, CircuitCallExecutionResult, ShadowVaultWitnessInput };

export function useMidnight() {
  const [wallet, setWallet] = useState<MidnightWalletState>({
    isConnected: false,
    address: null,
    network: 'Midnight Preprod Testnet',
    error: null,
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState<CircuitCallExecutionResult | null>(null);

  useEffect(() => {
    // Check if Lace wallet extension is available
    midnightService.checkWalletConnection().then(enabled => {
      if (enabled) {
        midnightService.connectLaceWallet().then(wState => setWallet(wState)).catch(() => {});
      }
    });
  }, []);

  const connectWallet = async () => {
    try {
      setWallet(prev => ({ ...prev, error: null }));
      const wState = await midnightService.connectLaceWallet();
      setWallet(wState);
    } catch (err: any) {
      setWallet(prev => ({
        ...prev,
        error: err.message || 'Failed to connect wallet via DApp Connector API',
      }));
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      network: 'Midnight Preprod Testnet',
      error: null,
    });
    setLastResult(null);
  };

  const executeCircuitCall = async (witnessInput: ShadowVaultWitnessInput | string) => {
    if (!wallet.isConnected) {
      throw new Error('Please connect your Lace wallet via DApp Connector API first.');
    }

    let witness: ShadowVaultWitnessInput;
    if (typeof witnessInput === 'string') {
      witness = {
        secretKey: witnessInput || 'default-user-key',
        secretValue: 'confidential-payload-witness',
        blinding: 'blinding-nonce-12345'
      };
    } else {
      witness = witnessInput;
    }

    setIsExecuting(true);
    try {
      const result = await midnightService.executeShadowVaultCircuit(witness);
      setLastResult(result);
      return result;
    } catch (err: any) {
      setWallet(prev => ({ ...prev, error: err.message }));
      throw err;
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

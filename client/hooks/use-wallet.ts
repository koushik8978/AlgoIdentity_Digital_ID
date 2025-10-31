import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import { toast } from "sonner";

export type WalletState = {
  address: string | null;
  addresses: string[];
  isConnected: boolean;
  connecting: boolean;
  error: string | null;
};

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    addresses: [],
    isConnected: false,
    connecting: false,
    error: null,
  });

  const peraRef = useRef<PeraWalletConnect | null>(null);

  // lazy init to avoid SSR issues
  if (!peraRef.current) {
    peraRef.current = new PeraWalletConnect({
      shouldShowSignTxnToast: false,
    });
  }

  const pera = peraRef.current!;

  // Reconnect existing session on mount
  useEffect(() => {
    let mounted = true;
    pera
      .reconnectSession()
      .then((accounts) => {
        if (!mounted) return;
        if (accounts.length > 0) {
          setState((s) => ({
            ...s,
            addresses: accounts,
            address: accounts[0] ?? null,
            isConnected: accounts.length > 0,
            error: null,
          }));
        }
      })
      .catch((e) => console.error(e));

    const handleDisconnect = () => {
      setState({ address: null, addresses: [], isConnected: false, connecting: false, error: null });
      toast("Wallet disconnected");
    };

    pera.connector?.on("disconnect", handleDisconnect);

    return () => {
      mounted = false;
      pera.connector?.off("disconnect", handleDisconnect);
    };
  }, [pera]);

  const connect = useCallback(async () => {
    try {
      setState((s) => ({ ...s, connecting: true, error: null }));
      const accounts = await pera.connect();
      setState({
        address: accounts[0] ?? null,
        addresses: accounts,
        isConnected: accounts.length > 0,
        connecting: false,
        error: null,
      });
      if (accounts.length > 0) toast.success("Connected to Pera Wallet");
    } catch (err: any) {
      const message = err?.message || "Failed to connect wallet";
      setState((s) => ({ ...s, connecting: false, error: message }));
      toast.error(message);
    }
  }, [pera]);

  const disconnect = useCallback(async () => {
    try {
      await pera.disconnect();
      setState({ address: null, addresses: [], isConnected: false, connecting: false, error: null });
    } catch (err: any) {
      const message = err?.message || "Failed to disconnect";
      setState((s) => ({ ...s, error: message }));
      toast.error(message);
    }
  }, [pera]);

  const shortAddress = useMemo(() => {
    if (!state.address) return null;
    return `${state.address.slice(0, 6)}…${state.address.slice(-4)}`;
  }, [state.address]);

  return {
    ...state,
    shortAddress,
    connect,
    disconnect,
  };
}

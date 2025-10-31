import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { cn } from "@/lib/utils";
import React from "react";

export default function WalletButton({ className }: { className?: string }) {
  const { isConnected, connecting, shortAddress, connect, disconnect } = useWallet();

  if (!isConnected) {
    return (
      <Button
        variant="outline"
        onClick={connect}
        disabled={connecting}
        className={cn("min-w-[9rem]", className)}
      >
        {connecting ? "Connecting…" : "Connect Pera"}
      </Button>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button variant="secondary" className="cursor-default" title={shortAddress || undefined}>
        {shortAddress}
      </Button>
      <Button variant="outline" onClick={disconnect}>
        Disconnect
      </Button>
    </div>
  );
}

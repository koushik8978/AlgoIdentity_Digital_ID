import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";

export default function Login() {
  const { connect, disconnect, isConnected, shortAddress } = useWallet();
  const [role, setRole] = useState("User");
  return (
    <section className="container py-16 grid place-items-center">
      <div className="w-full max-w-md rounded-2xl border p-6 bg-background/80">
        <h1 className="text-2xl font-bold tracking-tight text-center">Sign in</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Connect your wallet and choose a role</p>
        <div className="mt-6 space-y-3">
          <label className="block text-sm">Role<select className="mt-1 w-full rounded-md border px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}><option>User</option><option>Admin</option></select></label>
          {!isConnected ? (
            <Button onClick={connect} className="w-full">Connect Pera</Button>
          ) : (
            <div className="flex gap-2">
              <Button className="flex-1" variant="secondary">{shortAddress}</Button>
              <Button variant="outline" onClick={disconnect}>Disconnect</Button>
            </div>
          )}
          <Button className="w-full">Continue</Button>
        </div>
      </div>
    </section>
  );
}

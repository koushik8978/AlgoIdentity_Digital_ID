import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api";
import { toast } from "sonner";

export default function Verify() {
  const [assetId, setAssetId] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const check = async () => {
    try {
      const r = await apiGet<{ valid: boolean; reason?: string }>("/verify-id", { assetId, address });
      setResult(r.valid ? "Access Granted" : r.reason || "Access Denied");
      toast(r.valid ? "✅ Verified" : "❌ Access Denied");
    } catch (e: any) {
      toast.error(e?.message || "Verification failed");
    }
  };

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Verify Access</h1>
        <p className="mt-4 text-muted-foreground">Scan or enter wallet/ASA to validate access.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 grid place-items-center text-sm text-muted-foreground">
            QR Scanner coming soon
          </div>
        </div>
        <div className="rounded-xl border p-6">
          <label className="block text-sm">Wallet Address<input className="mt-1 w-full rounded-md border px-3 py-2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="ALGO..." /></label>
          <label className="block text-sm mt-3">ASA / Token ID<input className="mt-1 w-full rounded-md border px-3 py-2" value={assetId} onChange={(e) => setAssetId(e.target.value)} placeholder="12345" /></label>
          <div className="mt-4 flex gap-2">
            <Button onClick={check}>Verify</Button>
            <Button variant="outline" onClick={() => { setAddress(""); setAssetId(""); setResult(null); }}>Clear</Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">{result || "—"}</div>
        </div>
      </div>
    </section>
  );
}

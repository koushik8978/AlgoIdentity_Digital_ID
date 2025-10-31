import React from "react";

export default function DigitalIdCard({ name, address, assetId }: { name?: string; address?: string; assetId?: string | number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 blur-2xl" />
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Digital ID</h3>
        <span className="text-xs rounded-full border px-2 py-0.5">Active</span>
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <div className="opacity-70">Name</div>
        <div className="font-medium">{name || "—"}</div>
        <div className="opacity-70 mt-3">Wallet Address</div>
        <div className="font-mono text-xs break-all">{address || "—"}</div>
        <div className="opacity-70 mt-3">Token (ASA)</div>
        <div className="font-mono text-xs">{assetId ?? "—"}</div>
      </div>
    </div>
  );
}

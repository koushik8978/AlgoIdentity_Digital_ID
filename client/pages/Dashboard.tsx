import React from "react";
import { Button } from "@/components/ui/button";
import DigitalIdCard from "@/components/user/DigitalIdCard";
import IssueIDDialog from "@/components/admin/IssueIDDialog";
import { useWallet } from "@/hooks/use-wallet";
import { apiGet } from "@/lib/api";
import type { IdRecord, ListIdsResponse } from "@shared/api";

export default function Dashboard() {
  const { address } = useWallet();
  const [ids, setIds] = React.useState<IdRecord[]>([]);
  const primary = ids[0];

  const refetch = React.useCallback(async () => {
    if (!address) { setIds([]); return; }
    try {
      const res = await apiGet<ListIdsResponse>("/ids", { owner: address });
      setIds(res.items);
    } catch {
      setIds([]);
    }
  }, [address]);

  React.useEffect(() => {
    let active = true;
    (async () => { if (!active) return; await refetch(); })();
    return () => { active = false; };
  }, [refetch]);

  return (
    <section className="container py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage IDs and view your wallet-bound identity.</p>
        </div>
        <IssueIDDialog onIssued={refetch} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <DigitalIdCard name="Connected User" address={address || undefined} assetId={primary?.assetId} />
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold">Overview</h3>
          <div className="mt-4 text-sm text-muted-foreground">Issuance metrics and activity coming soon.</div>
          <div className="mt-4 h-32 rounded-lg bg-gradient-to-r from-cyan-500/10 to-indigo-500/10" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Owned Tokens</h3>
          {address ? (
            ids.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm">
                {ids.map((r) => (
                  <li key={r.assetId} className="flex items-center justify-between rounded-md border px-3 py-2">
                    <span className="font-mono text-xs">ASA {r.assetId}</span>
                    <span className="text-xs rounded-full border px-2 py-0.5 capitalize">{r.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">No IDs issued to this wallet yet.</p>
            )
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Connect a wallet to view owned ASA IDs.</p>
          )}
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Recent Activity</h3>
          <p className="mt-2 text-sm text-muted-foreground">Blockchain activity will appear here.</p>
        </div>
      </div>
    </section>
  );
}

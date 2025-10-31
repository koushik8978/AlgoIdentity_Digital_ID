import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import { useWallet } from "@/hooks/use-wallet";

export default function IssueIDDialog({ onIssued }: { onIssued?: () => void }) {
  const { address } = useWallet();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [to, setTo] = React.useState("");
  const [role, setRole] = React.useState("User");

  React.useEffect(() => {
    if (!to && address) setTo(address);
  }, [address, to]);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await apiPost<{ assetId: number; txId: string }>("/issue-id", {
        name,
        recipientAddress: to,
        role,
      });
      toast.success(`Issued ID • ASA ${res.assetId}`);
      setOpen(false);
      onIssued?.();
    } catch (e: any) {
      toast.error(e?.message || "Failed to issue ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:from-cyan-600 hover:to-indigo-600">
        Issue New ID
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal>
          <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Issue New ID</h3>
            <div className="mt-4 space-y-3">
              <label className="block text-sm">Name<input className="mt-1 w-full rounded-md border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" /></label>
              <label className="block text-sm">Wallet Address<input className="mt-1 w-full rounded-md border px-3 py-2" value={to} onChange={(e) => setTo(e.target.value)} placeholder="ALGO..." /></label>
              <label className="block text-sm">Role<select className="mt-1 w-full rounded-md border px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}><option>User</option><option>Admin</option><option>Staff</option></select></label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
              <Button onClick={submit} disabled={loading}>{loading ? "Issuing…" : "Issue"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

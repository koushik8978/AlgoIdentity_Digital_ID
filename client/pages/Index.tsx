import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_600px_at_10%_-10%,hsl(var(--primary)/0.15),transparent),radial-gradient(800px_400px_at_90%_0%,hsl(var(--accent)/0.15),transparent)]" />
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-foreground/70">
              Decentralized Access • Algorand
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              AlgoIdentity — Digital ID & Access Control
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Issue verifiable IDs as Algorand Standard Assets, grant or revoke access instantly, and validate entry on-chain with wallet proofs.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:from-cyan-600 hover:to-indigo-600">Open Dashboard</Button>
              </Link>
              <Link to="/verify">
                <Button variant="outline">Verify Access</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="container py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Issue Digital IDs", desc: "Mint ASA-based IDs to user wallets with org authority." },
            { title: "Verify in Seconds", desc: "Check ownership and policy on-chain for instant access decisions." },
            { title: "Revoke or Freeze", desc: "Disable IDs via admin authority when access should end." },
            { title: "Multi‑Role Support", desc: "Admins, staff, and users with tailored permissions." },
            { title: "QR Check‑In", desc: "Scan wallet or ASA ID for event and app entry." },
            { title: "Wallet‑Ready", desc: "Pera Wallet integration, AlgoSigner fallback planned." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border p-6 bg-background/60">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container py-12">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          {[
            { step: "1", title: "Connect Wallet", desc: "Admins connect org wallet to manage IDs. Users connect to receive." },
            { step: "2", title: "Issue or Verify", desc: "Issue ASA IDs to users, or verify access at gates using smart rules." },
            { step: "3", title: "Manage Lifecycle", desc: "Revoke, freeze, and audit activity with clear on-chain history." },
          ].map((s) => (
            <div key={s.step} className="rounded-xl border p-6">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white flex items-center justify-center font-bold">
                {s.step}
              </div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="rounded-2xl border p-8 md:p-12 text-center bg-gradient-to-r from-cyan-500/10 to-indigo-500/10">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Start issuing verifiable IDs today</h3>
          <p className="mt-2 text-muted-foreground">Secure, fast, and wallet‑native on Algorand TestNet.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button>Open Dashboard</Button>
            </Link>
            <Link to="/verify">
              <Button variant="outline">Try Verify</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

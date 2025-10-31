import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import WalletButton from "@/components/wallet/WalletButton";
import ThemeToggle from "@/components/theme/ThemeToggle";

function ActiveLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <NavLink
      to={to}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive ? "text-primary-foreground bg-primary/10" : "text-foreground/70 hover:text-foreground"
      )}
    >
      {children}
    </NavLink>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-cyan-500 to-indigo-500" />
            <span className="text-lg font-extrabold tracking-tight">AlgoIdentity</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <ActiveLink to="/">Home</ActiveLink>
            <ActiveLink to="/about">About</ActiveLink>
            <ActiveLink to="/dashboard">Dashboard</ActiveLink>
            <ActiveLink to="/verify">Verify</ActiveLink>
            <ActiveLink to="/contact">Contact</ActiveLink>
          </nav>
          <div className="flex items-center gap-2">
            <div className="sm:hidden">
              <WalletButton />
            </div>
            <div className="hidden sm:block">
              <WalletButton />
            </div>
            <ThemeToggle />
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:from-cyan-600 hover:to-indigo-600">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t mt-16">
        <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} AlgoIdentity. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-foreground" href="https://developer.algorand.org/" target="_blank" rel="noreferrer">Algorand Docs</a>
            <a className="hover:text-foreground" href="https://github.com/algorand/pyteal" target="_blank" rel="noreferrer">PyTeal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

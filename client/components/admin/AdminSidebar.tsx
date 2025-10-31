import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/issue", label: "Issue ID" },
  { to: "/admin/verify", label: "Verify ID" },
  { to: "/admin/revoke", label: "Revoke ID" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full md:w-60 shrink-0 border-r bg-background/60">
      <nav className="p-4 space-y-1">
        {items.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end
            className={({ isActive }) =>
              cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                isActive ? "bg-primary/10 text-foreground" : "text-foreground/70 hover:text-foreground"
              )
            }
          >
            {i.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

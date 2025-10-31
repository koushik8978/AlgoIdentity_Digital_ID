import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setDark(isDark);
  }, []);
  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setDark(root.classList.contains("dark"));
  };
  return (
    <Button variant="ghost" onClick={toggle} aria-label="Toggle theme">
      {dark ? "🌙" : "☀️"}
    </Button>
  );
}

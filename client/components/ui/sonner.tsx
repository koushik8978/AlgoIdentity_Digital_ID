import { useEffect, useState } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Lightweight theme detector that works with our manual .dark class toggle
function useSystemTheme(): "light" | "dark" | "system" {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const root = document.documentElement;
    const compute = () => (root.classList.contains("dark") ? "dark" : "light");
    // initialize
    setTheme(compute());

    // Observe class changes so Sonner updates when ThemeToggle runs
    const observer = new MutationObserver(() => setTheme(compute()));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useSystemTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

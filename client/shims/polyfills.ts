// Ensure Node-like globals for browser bundles used by SDKs
(() => {
  const g: any = (typeof globalThis !== "undefined" ? globalThis : window) as any;
  if (typeof g.global === "undefined") g.global = g;
  if (typeof g.process === "undefined") g.process = { env: {} };
})();

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function track(name: string, payload?: Record<string, any>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, payload ?? {});
  }
}

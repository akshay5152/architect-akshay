type ScrollListener = (scrollY: number) => void;

const listeners = new Set<ScrollListener>();

export const scrollBridge = {
  getScrollY() {
    if (typeof window !== "undefined" && typeof window.__appScrollY === "number") {
      return window.__appScrollY;
    }
    if (typeof window === "undefined") return 0;
    return (
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  },

  emit(scrollY: number) {
    window.__appScrollY = scrollY;
    listeners.forEach((listener) => listener(scrollY));
  },

  subscribe(listener: ScrollListener) {
    listeners.add(listener);
    listener(scrollBridge.getScrollY());
    return () => listeners.delete(listener);
  },
};

const TOOL_CONTAINER_SELECTOR = "[data-tool-container]";

export function scrollToToolTop() {
  if (typeof window === "undefined") return;

  window.requestAnimationFrame(() => {
    const target = document.querySelector<HTMLElement>(TOOL_CONTAINER_SELECTOR);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

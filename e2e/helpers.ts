import { expect, type Page } from "@playwright/test";

const IFRAME_BASE = "/iframe.html";

const DEFAULT_TIMEOUT = 35000;

/**
 * Navigate to a Storybook story (iframe) and return the story root.
 * Waits for the root to be ready: has children or is visible (has size).
 */
export async function gotoStory(
  page: Page,
  storyId: string,
  options?: { timeout?: number }
) {
  const timeout = options?.timeout ?? DEFAULT_TIMEOUT;
  await page.goto(`${IFRAME_BASE}?id=${storyId}&viewMode=story`, { waitUntil: "load" });
  const root = page.locator("#storybook-root, #root").first();
  await expect(root).toBeAttached({ timeout });
  await page.waitForFunction(
    () => {
      const el = document.querySelector("#storybook-root") ?? document.querySelector("#root");
      if (!el) return false;
      if (el.childNodes.length > 0) return true;
      if (el instanceof HTMLElement) {
        const rect = el.getBoundingClientRect();
        if (rect.height > 0 || rect.width > 0) return true;
      }
      return false;
    },
    { timeout }
  );
  return root;
}

export { expect };

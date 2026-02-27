import { expect, type Page } from "@playwright/test";

const IFRAME_BASE = "/iframe.html";

const DEFAULT_TIMEOUT = 35000;
// Static Storybook in CI: chunks can load slowly; use longer timeout so root gets content.
const STATIC_CI_TIMEOUT = 60000;

/**
 * Navigate to a Storybook story (iframe) and return the story root.
 * Waits for the root to be ready: has children or is visible (has size).
 * With static Storybook, uses networkidle so story chunks load before we check the root.
 */
export async function gotoStory(
  page: Page,
  storyId: string,
  options?: { timeout?: number }
) {
  const useStatic = process.env.E2E_USE_STATIC === "1";
  const isCI = process.env.CI === "true" || process.env.CI === "1";
  const timeout =
    options?.timeout ?? (useStatic && isCI ? STATIC_CI_TIMEOUT : DEFAULT_TIMEOUT);
  await page.goto(`${IFRAME_BASE}?id=${storyId}&viewMode=story`, {
    waitUntil: useStatic ? "networkidle" : "load",
    timeout,
  });
  const root = page.locator("#storybook-root, #root").first();
  await expect(root).toBeAttached({ timeout });
  // Wait for story root to be ready: has children or has visible size.
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

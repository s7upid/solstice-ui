import { test } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("ErrorBoundary", () => {
  test("WithError story: loads", async ({ page }) => {
    await gotoStory(page, "components-error-boundary--with-error");
  });
});

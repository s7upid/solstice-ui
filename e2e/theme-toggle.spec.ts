import { test } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("ThemeToggle", () => {
  test("Light story: loads", async ({ page }) => {
    await gotoStory(page, "components-theme-toggle--light");
  });
});

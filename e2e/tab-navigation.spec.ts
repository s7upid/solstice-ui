import { test, expect } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("TabNavigation", () => {
  test("Default story: loads", async ({ page }) => {
    await gotoStory(page, "components-tab-navigation--default");
  });
});

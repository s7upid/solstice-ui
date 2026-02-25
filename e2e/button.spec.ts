import { test } from "@playwright/test";
import { gotoStory, expect } from "./helpers";

// Button: smoke + state only (clickability covered by unit tests)
test.describe("Button", () => {
  test("Primary story renders and button is visible", async ({ page }) => {
    const root = await gotoStory(page, "components-button--primary");
    await expect(root.getByRole("button", { name: /primary button/i }).first()).toBeVisible();
  });

  test("Loading story shows disabled button", async ({ page }) => {
    const root = await gotoStory(page, "components-button--loading");
    await expect(root.getByRole("button").first()).toBeDisabled();
  });
});

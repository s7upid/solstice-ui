import { test, expect } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("Pagination", () => {
  test("Default story: next button advances page", async ({ page }) => {
    const root = await gotoStory(page, "components-pagination--default");
    const nextBtn = root.getByRole("button", { name: /next page/i }).first();
    await nextBtn.click();
    await expect(root.getByText(/2/).first()).toBeVisible();
  });
});

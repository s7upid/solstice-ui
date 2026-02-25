import { test, expect } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("Accordion", () => {
  test("Default story: expanding first section shows content", async ({ page }) => {
    const root = await gotoStory(page, "components-accordion--default");
    const firstHeader = root.getByRole("button", { name: /first section/i }).first();
    await firstHeader.click();
    await expect(root.getByText(/Content for the first section/i).first()).toBeVisible();
  });
});

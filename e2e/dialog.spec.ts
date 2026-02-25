import { test, expect } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("Dialog", () => {
  test("Default story: open dialog shows content and can close", async ({ page }) => {
    const root = await gotoStory(page, "components-dialog--default");
    await root.getByRole("button", { name: /open dialog/i }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/dialog body content/i).first()).toBeVisible();
    await page.getByRole("button", { name: /cancel/i }).first().click();
    await expect(dialog).not.toBeVisible();
  });
});

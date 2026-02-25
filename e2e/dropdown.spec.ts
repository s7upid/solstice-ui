import { test, expect } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("Dropdown", () => {
  test("Default story: select has options and can select Option A", async ({ page }) => {
    const root = await gotoStory(page, "components-dropdown--default");
    const select = root.getByRole("combobox").first();
    await expect(select).toBeVisible();
    await select.selectOption({ label: "Option A" });
    await expect(select).toHaveValue("a");
  });
});

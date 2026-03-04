import { test } from "@playwright/test";
import { gotoStory, expect } from "./helpers";

test.describe("DataPage (grid)", () => {
  test("GridLayout story renders header and grid content", async ({ page }) => {
    const root = await gotoStory(page, "components-datapage--grid-layout");
    await expect(root.getByRole("heading", { name: /projects/i })).toBeVisible();
    await expect(root.getByText("Project Alpha")).toBeVisible();
    await expect(root.getByText("Project Beta")).toBeVisible();
  });

  test("GridEmpty story shows empty state", async ({ page }) => {
    const root = await gotoStory(page, "components-datapage--grid-empty");
    await expect(root.getByText("No projects yet")).toBeVisible();
  });

  test("GridLoading story shows spinner (no grid list)", async ({ page }) => {
    const root = await gotoStory(page, "components-datapage--grid-loading");
    await expect(root.getByRole("heading", { name: /projects/i })).toBeVisible();
    await expect(root.locator('[role="list"]')).not.toBeVisible();
  });
});

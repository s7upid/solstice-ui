import { test } from "@playwright/test";
import { gotoStory, expect } from "./helpers";

test.describe("GridPage", () => {
  test("WithCards story renders header and grid content", async ({ page }) => {
    const root = await gotoStory(page, "components-gridpage--with-cards");
    await expect(root.getByRole("heading", { name: /projects/i })).toBeVisible();
    await expect(root.getByText("Project Alpha")).toBeVisible();
    await expect(root.getByText("Project Beta")).toBeVisible();
  });

  test("Empty story shows empty state", async ({ page }) => {
    const root = await gotoStory(page, "components-gridpage--empty");
    await expect(root.getByText("No projects yet")).toBeVisible();
  });

  test("Loading story shows spinner (no grid list)", async ({ page }) => {
    const root = await gotoStory(page, "components-gridpage--loading");
    await expect(root.getByRole("heading", { name: /projects/i })).toBeVisible();
    await expect(root.locator('[role="list"]')).not.toBeVisible();
  });
});

import { test } from "@playwright/test";
import { gotoStory, expect } from "./helpers";

test.describe("DataPage (list)", () => {
  test("ListLayout story renders header and list items", async ({ page }) => {
    const root = await gotoStory(page, "components-datapage--list-layout");
    await expect(root.getByRole("heading", { name: /projects/i })).toBeVisible();
    await expect(root.getByText("Project Alpha")).toBeVisible();
    await expect(root.getByText("Project Beta")).toBeVisible();
  });

  test("ListEmpty story shows empty state", async ({ page }) => {
    const root = await gotoStory(page, "components-datapage--list-empty");
    await expect(root.getByText("No items")).toBeVisible();
  });

  test("ListLoading story shows spinner (no list content)", async ({ page }) => {
    const root = await gotoStory(page, "components-datapage--list-loading");
    await expect(root.getByRole("heading", { name: /items/i })).toBeVisible();
    await expect(root.getByText("Project Alpha")).not.toBeVisible();
  });
});

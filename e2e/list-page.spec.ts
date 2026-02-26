import { test } from "@playwright/test";
import { gotoStory, expect } from "./helpers";

test.describe("ListPage", () => {
  test("WithSimpleList story renders header and list items", async ({ page }) => {
    const root = await gotoStory(page, "components-listpage--with-simple-list");
    await expect(root.getByRole("heading", { name: /items/i })).toBeVisible();
    await expect(root.getByText("First item")).toBeVisible();
    await expect(root.getByText("Second item")).toBeVisible();
  });

  test("Empty story shows empty state", async ({ page }) => {
    const root = await gotoStory(page, "components-listpage--empty");
    await expect(root.getByText("No items")).toBeVisible();
  });

  test("Loading story shows spinner (no list content)", async ({ page }) => {
    const root = await gotoStory(page, "components-listpage--loading");
    await expect(root.getByRole("heading", { name: /items/i })).toBeVisible();
    await expect(root.getByText("First item")).not.toBeVisible();
  });
});

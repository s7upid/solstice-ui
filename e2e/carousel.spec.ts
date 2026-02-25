import { test, expect } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("Carousel", () => {
  test("Default story: next arrow shows second slide", async ({ page }) => {
    const root = await gotoStory(page, "components-carousel--default");
    await expect(root.getByText("Slide 1").first()).toBeVisible();
    const nextBtn = root.getByRole("button", { name: /next slide/i }).first();
    await nextBtn.click();
    await expect(root.getByText("Slide 2").first()).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("Button stories", () => {
  test("Primary button is visible and clickable", async ({ page }) => {
    await page.goto("/?path=/story/components-button--primary");
    const story = page.locator("#storybook-root");
    await expect(story).toBeVisible();
    const button = story.getByRole("button", { name: /primary button/i }).first();
    await expect(button).toBeVisible();
    await button.click();
  });

  test("Button with loading state is disabled", async ({ page }) => {
    await page.goto("/?path=/story/components-button--loading");
    const story = page.locator("#storybook-root");
    await expect(story).toBeVisible();
    const button = story.getByRole("button").first();
    await expect(button).toBeDisabled();
  });
});

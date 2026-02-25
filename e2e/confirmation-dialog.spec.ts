import { test } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("ConfirmationDialog", () => {
  test("Danger story: loads", async ({ page }) => {
    await gotoStory(page, "components-confirmation-dialog--danger");
  });
});

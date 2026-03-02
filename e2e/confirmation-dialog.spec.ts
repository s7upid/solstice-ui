import { test } from "@playwright/test";
import { gotoStory } from "./helpers";

test.describe("Dialog (confirmation variants)", () => {
  test("ConfirmationVariants story: loads", async ({ page }) => {
    await gotoStory(page, "components-dialog--confirmation-variants");
  });
});

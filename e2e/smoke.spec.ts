import { test } from "@playwright/test";
import { gotoStory } from "./helpers";

// Smoke tests: default story loads and root is visible (no interaction).
// Use for components where e2e value is "renders in Storybook" only.
const SMOKE_STORIES: { id: string; name: string }[] = [
  { id: "components-alert--info", name: "Alert" },
  { id: "components-badge--default", name: "Badge" },
  { id: "components-card--simple", name: "Card" },
  { id: "components-checkbox--unchecked", name: "Checkbox" },
  { id: "components-date-time-picker--date-time", name: "DateTimePicker" },
  { id: "components-empty-state--default", name: "EmptyState" },
  { id: "components-form--default", name: "Form" },
  { id: "components-input--default", name: "Input" },
  { id: "components-list--default", name: "List" },
  { id: "components-loading-spinner--default", name: "LoadingSpinner" },
  { id: "components-modal-portal--default", name: "ModalPortal" },
  { id: "components-page-header--default", name: "PageHeader" },
  { id: "components-progress--default", name: "Progress" },
  { id: "components-search-input--default", name: "SearchInput" },
  { id: "components-stacked-cards-deck--default", name: "StackedCardsDeck" },
  { id: "components-toast--default", name: "Toast" },
  { id: "components-danger-zone--default", name: "DangerZone" },
  { id: "components-toggle--button-with-label", name: "Toggle" },
];

for (const { id, name } of SMOKE_STORIES) {
  test(`${name} default story renders`, async ({ page }) => {
    await gotoStory(page, id);
  });
}

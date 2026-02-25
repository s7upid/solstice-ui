import { defineConfig, devices } from "@playwright/test";

// Use pre-built Storybook (faster): set E2E_USE_STATIC=1 and run build-storybook first.
const useStaticStorybook = process.env.E2E_USE_STATIC === "1";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 60000,
  workers: 1,
  reporter:
    process.env.E2E_JSON_REPORT === "1"
      ? [
          ["list"],
          ["json", { outputFile: "test-coverage/e2e-results.json" }],
        ]
      : process.env.CI
        ? [["github"], ["html", { open: "never" }]]
        : "list",
  use: {
    baseURL: "http://localhost:6006",
    trace: "on-first-retry",
    actionTimeout: 35000,
  },
  projects:
    process.env.E2E_ALL_BROWSERS === "1"
      ? [
          { name: "chromium", use: { ...devices["Desktop Chrome"] } },
          { name: "firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "webkit", use: { ...devices["Desktop Safari"] } },
        ]
      : [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: useStaticStorybook
    ? {
        command: "npx serve storybook-static -p 6006",
        url: "http://localhost:6006",
        reuseExistingServer: false,
        timeout: 15000,
      }
    : {
        command: "npm run storybook",
        url: "http://localhost:6006",
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      },
  expect: {
    timeout: 5000,
  },
});

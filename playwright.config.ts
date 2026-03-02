import os from "os";
import { defineConfig, devices } from "@playwright/test";

// Use pre-built Storybook (faster): set E2E_USE_STATIC=1 and run build-storybook first.
// Use deployed Storybook: set E2E_BASE_URL (e.g. https://s7upid.github.io/solstice-ui) and skip webServer.
const useStaticStorybook = process.env.E2E_USE_STATIC === "1";
const deployedBaseUrl = process.env.E2E_BASE_URL;

// When E2E_USE_MAX_WORKERS=1 (e.g. test report script): use all CPUs.
// When E2E_SEQUENTIAL=1: use 1 worker so tests run in order and list reporter shows clear completion.
// Static Storybook: otherwise use 1 worker to avoid timeouts.
// Dev Storybook: CI = all CPUs, local = 2.
const workers =
  process.env.E2E_SEQUENTIAL === "1"
    ? 1
    : process.env.E2E_USE_MAX_WORKERS === "1"
      ? os.cpus().length
      : useStaticStorybook
        ? 1
        : process.env.CI
          ? os.cpus().length
          : 2;

export default defineConfig({
  testDir: "./e2e",
  // With 1 worker, run in order; with multiple workers, still wait for all to finish (list reporter shows completion order).
  fullyParallel: workers > 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 60000,
  workers,
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
    baseURL: deployedBaseUrl || "http://localhost:6006",
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
  webServer:
    deployedBaseUrl
      ? undefined
      : useStaticStorybook
        ? {
            command: "npx serve storybook-static -p 6006",
            url: "http://localhost:6006",
            reuseExistingServer: false,
            timeout: 60000,
          }
        : {
            command: "npm run storybook",
            url: "http://localhost:6006",
            reuseExistingServer: !process.env.CI,
            timeout: 120000,
          },
  expect: {
    timeout: 10000,
  },
});

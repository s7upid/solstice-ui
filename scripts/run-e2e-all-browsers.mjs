#!/usr/bin/env node
import { execSync } from "child_process";
process.env.E2E_ALL_BROWSERS = "1";
execSync("npx playwright test", { stdio: "inherit" });

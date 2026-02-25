#!/usr/bin/env node

/**
 * Update README badges from coverage-report.json.
 * Run after: npm run test:coverage && node test-coverage/extract-results.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REPORT_PATH = path.join(ROOT, "coverage-report.json");
const README_PATH = path.join(ROOT, "README.md");

// Repo slug for badges (change if you fork the repo)
const REPO_SLUG = "s7upid/solstice-ui";
// Live docs (Storybook on GitHub Pages)
const DOCS_URL = "https://s7upid.github.io/solstice-ui/";

function updateBadges() {
  console.log("📝 Updating README badges...\n");

  if (!fs.existsSync(REPORT_PATH)) {
    console.log("  ⚠️  coverage-report.json not found. Run:");
    console.log("      npm run test:coverage && node test-coverage/extract-results.js");
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(REPORT_PATH, "utf8"));
  let content = fs.readFileSync(README_PATH, "utf8");
  content = content.replace(/\r\n/g, "\n").replace(/^\uFEFF/, "");

  const unitBadge = `[![Unit tests](https://img.shields.io/badge/unit%20tests-${report.unit?.coverage ?? "?"}%25-${report.unit?.badgeColor ?? "lightgrey"}?style=flat-square&logo=vitest)](https://github.com/${REPO_SLUG}/actions)`;
  const e2eBadge = report.e2e
    ? `[![E2E](https://img.shields.io/badge/e2e-${report.e2e.coverage}%25-${report.e2e.badgeColor}?style=flat-square&logo=playwright)](https://github.com/${REPO_SLUG}/actions)`
    : `[![E2E](https://img.shields.io/badge/e2e-Playwright-blue?style=flat-square&logo=playwright)](https://github.com/${REPO_SLUG}/actions)`;

  const badges = [
    `[![Docs](https://img.shields.io/badge/docs-Storybook-ff4785?style=flat-square&logo=storybook)](${DOCS_URL})`,
    `[![CI](https://github.com/${REPO_SLUG}/actions/workflows/ci.yml/badge.svg)](https://github.com/${REPO_SLUG}/actions/workflows/ci.yml)`,
    unitBadge,
    e2eBadge,
    // npm: shows publish status; use version badge after publishing: [![npm](https://img.shields.io/npm/v/solstice-ui.svg)](https://www.npmjs.com/package/solstice-ui)
    `[![npm](https://img.shields.io/badge/npm-unpublished-lightgrey?style=flat-square)](https://www.npmjs.com/package/solstice-ui)`,
    `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
  ];

  const badgesLine = badges.join(" ");

  // Replace only the badge line that sits right after the # title. Do not remove
  // any other lines in the file (e.g. user-added badges elsewhere) to avoid deleting custom content.
  const titleMatch = content.match(/^(# [^\n]+)\n\n/);
  if (titleMatch) {
    const afterTitle = content.slice(titleMatch[0].length);
    const nextLineEnd = afterTitle.indexOf("\n");
    const nextLine = nextLineEnd >= 0 ? afterTitle.slice(0, nextLineEnd) : afterTitle;
    const nextIsBadge = nextLine.trim().startsWith("[![");
    if (nextIsBadge) {
      content = content.replace(
        titleMatch[0] + nextLine,
        titleMatch[1] + "\n\n" + badgesLine + "\n\n"
      );
    } else {
      content = content.replace(
        titleMatch[0],
        titleMatch[1] + "\n\n" + badgesLine + "\n\n"
      );
    }
  } else {
    const firstLine = content.split("\n")[0] || "";
    if (firstLine.includes("[![") && firstLine.includes("](http")) {
      content = content.replace(firstLine, badgesLine);
    } else {
      const m = content.match(/^(# [^\n]+)\n/);
      if (m) content = content.replace(m[0], m[0] + badgesLine + "\n\n");
    }
  }

  fs.writeFileSync(README_PATH, content, "utf8");
  console.log("  ✅ README badges updated.\n");
}

updateBadges();

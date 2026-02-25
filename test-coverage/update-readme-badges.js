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

// Repo slug for shields (replace with your GitHub org/repo)
const REPO_SLUG = "your-username/solstice-ui";

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

  const badges = [
    `[![CI](https://github.com/${REPO_SLUG}/actions/workflows/ci.yml/badge.svg)](https://github.com/${REPO_SLUG}/actions/workflows/ci.yml)`,
    `[![Unit tests](https://img.shields.io/badge/unit%20tests-${report.unit?.coverage ?? "?"}%25-${report.unit?.badgeColor ?? "lightgrey"}?style=flat-square&logo=vitest)](https://github.com/${REPO_SLUG}/actions)`,
    `[![E2E](https://img.shields.io/badge/e2e-Playwright-blue?style=flat-square&logo=playwright)](https://github.com/${REPO_SLUG}/actions)`,
    // Use static badge until package is published; then use: [![npm](https://img.shields.io/npm/v/solstice-ui.svg)](https://www.npmjs.com/package/solstice-ui)
    `[![npm](https://img.shields.io/badge/npm-unpublished-lightgrey?style=flat-square)](https://www.npmjs.com/package/solstice-ui)`,
    `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
  ];

  const badgesLine = badges.join(" ");

  // Remove ALL existing badge lines (single or multiple) to prevent duplicates
  const lines = content.split("\n");
  const filtered = lines.filter((line) => {
    const t = line.trim();
    // Skip lines that are only badge(s): [![...](...)](...)
    if (t.startsWith("[![") && (t.includes("](http") || t.includes("](https"))) return false;
    return true;
  });
  content = filtered.join("\n").replace(/\n{3,}/g, "\n\n").trimStart();

  // Ensure exactly one badge line right after the # title
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

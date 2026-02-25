#!/usr/bin/env node

/**
 * Extract coverage results from Vitest (coverage/coverage-summary.json)
 * and write coverage-report.json for badge scripts.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const VITEST_SUMMARY = path.join(ROOT, "coverage", "coverage-summary.json");
const REPORT_PATH = path.join(ROOT, "coverage-report.json");

function badgeColor(pct) {
  if (pct >= 90) return "brightgreen";
  if (pct >= 80) return "green";
  if (pct >= 70) return "yellowgreen";
  if (pct >= 60) return "yellow";
  if (pct >= 50) return "orange";
  return "red";
}

function extract() {
  console.log("📊 Extracting coverage results...\n");

  if (!fs.existsSync(VITEST_SUMMARY)) {
    console.log("  ⚠️  Run 'npm run test:coverage' first.");
    process.exit(1);
  }

  const summary = JSON.parse(fs.readFileSync(VITEST_SUMMARY, "utf8"));
  const total = summary.total || summary;
  const lines = total.lines || total.statements || {};
  const linesPct = lines.pct != null ? Math.round(Number(lines.pct)) : 0;
  const color = badgeColor(linesPct);

  const report = {
    unit: {
      coverage: String(linesPct),
      badgeColor: color,
      source: "vitest",
    },
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  console.log(`  ✅ Unit coverage: ${linesPct}% (${color})`);
  console.log(`  📁 Written: ${REPORT_PATH}\n`);
}

extract();

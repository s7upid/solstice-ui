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
const E2E_RESULTS_PATH = path.join(ROOT, "test-coverage", "e2e-results.json");
const REPORT_PATH = path.join(ROOT, "coverage-report.json");

function badgeColor(pct) {
  if (pct >= 90) return "brightgreen";
  if (pct >= 80) return "green";
  if (pct >= 70) return "yellowgreen";
  if (pct >= 60) return "yellow";
  if (pct >= 50) return "orange";
  return "red";
}

function parseE2EResults() {
  if (!fs.existsSync(E2E_RESULTS_PATH)) return null;
  try {
    const raw = fs.readFileSync(E2E_RESULTS_PATH, "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);
    let data = null;
    // Playwright JSON reporter may write one object per line (events) or a single object
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const parsed = JSON.parse(lines[i]);
        if (parsed && parsed.stats != null) {
          data = parsed;
          break;
        }
        if (parsed && (parsed.suites != null || Array.isArray(parsed))) data = parsed;
      } catch (_) {}
    }
    if (!data && lines.length > 0) {
      try {
        data = JSON.parse(raw);
      } catch (_) {}
    }
    if (!data) return null;

    let passed = 0;
    let total = 0;
    if (data.stats && typeof data.stats === "object") {
      const s = data.stats;
      passed = Number(s.expected ?? s.passed ?? 0) || 0;
      const failed = Number(s.unexpected ?? s.failed ?? 0) || 0;
      total = passed + failed || Number(s.total ?? 0) || 0;
    }
    if (total === 0 && data.suites && Array.isArray(data.suites)) {
      function count(suite) {
        let p = 0;
        let t = 0;
        if (suite.specs) for (const spec of suite.specs) {
          t++;
          if (spec.ok || spec.tests?.every((te) => te.ok)) p++;
        }
        if (suite.suites) for (const sub of suite.suites) { const c = count(sub); p += c.p; t += c.t; }
        return { p, t };
      }
      for (const suite of data.suites) {
        const c = count(suite);
        passed += c.p;
        total += c.t;
      }
    }
    if (total === 0 && Array.isArray(data)) {
      total = data.length;
      passed = data.filter((t) => t.status === "passed" || t.ok).length;
    }
    if (total === 0) return null;
    return { passed, total, pct: Math.round((passed / total) * 100) };
  } catch (_) {
    return null;
  }
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
  const unitColor = badgeColor(linesPct);

  const report = {
    unit: {
      coverage: String(linesPct),
      badgeColor: unitColor,
      source: "vitest",
    },
  };

  const e2e = parseE2EResults();
  if (e2e) {
    report.e2e = {
      coverage: String(e2e.pct),
      passed: e2e.passed,
      total: e2e.total,
      badgeColor: badgeColor(e2e.pct),
      source: "playwright",
    };
    console.log(`  ✅ E2E: ${e2e.passed}/${e2e.total} (${e2e.pct}%)`);
  } else {
    console.log("  ⚠️  No E2E results (run with E2E_JSON_REPORT=1 for e2e badge).");
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  console.log(`  ✅ Unit coverage: ${linesPct}% (${unitColor})`);
  console.log(`  📁 Written: ${REPORT_PATH}\n`);
}

extract();

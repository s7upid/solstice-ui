import "@testing-library/jest-dom";
import { vi } from "vitest";

// jsdom does not implement scrollTo; Pagination (and others) call it on page change
if (typeof window !== "undefined") {
  window.scrollTo = vi.fn();
}

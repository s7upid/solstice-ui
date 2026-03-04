import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, useThemeContext } from "./ThemeContext";

function Consumer() {
  const ctx = useThemeContext();
  return <span data-testid="theme">{ctx.theme}</span>;
}

describe("ThemeProvider / useThemeContext", () => {
  it("useThemeContext returns value inside ThemeProvider", () => {
    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme-unique">
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("useThemeContext throws when used outside ThemeProvider", () => {
    expect(() => render(<Consumer />)).toThrow(
      "useThemeContext must be used within ThemeProvider"
    );
  });
});

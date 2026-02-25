import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useThemeContext } from "./ThemeContext";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

function Consumer() {
  const ctx = useThemeContext();
  return <span data-testid="theme">{ctx.theme}</span>;
}

describe("ThemeProvider / ThemeToggle", () => {
  it("ThemeToggle renders within ThemeProvider", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const toggle = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(toggle).toBeInTheDocument();
  });

  it("ThemeToggle toggles dark class on document when clicked", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const toggle = screen.getByRole("button", { name: /switch to dark mode/i });
    await userEvent.click(toggle);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    await userEvent.click(toggle);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("ThemeToggle works with controlled props without provider", () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="light" onToggle={onToggle} />);
    const toggle = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(toggle).toBeInTheDocument();
  });

  it("ThemeToggle without provider shows dark icon when theme is dark", () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
  });

  it("ThemeToggle without provider calls onToggle when clicked", async () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="light" onToggle={onToggle} />);
    await userEvent.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    expect(onToggle).toHaveBeenCalled();
  });

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

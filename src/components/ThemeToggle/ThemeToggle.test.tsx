import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("renders with default (light) and correct aria-label", () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  it("shows dark icon and switch-to-light label when theme is dark", () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
  });

  it("calls onToggle when clicked", async () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="light" onToggle={onToggle} />);
    await userEvent.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("accepts className", () => {
    const { container } = render(
      <ThemeToggle theme="light" onToggle={() => {}} className="custom" />
    );
    const btn = container.querySelector("button");
    expect(btn?.className).toMatch(/custom/);
  });

  it("renders without onToggle (no-op when clicked)", async () => {
    render(<ThemeToggle theme="light" />);
    const btn = screen.getByRole("button", { name: /switch to dark mode/i });
    await userEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it.each([
    "default",
    "success",
    "warning",
    "error",
    "info",
    "neutral",
  ] as const)("renders variant %s", (variant) => {
    render(<Badge variant={variant}>{variant}</Badge>);
    expect(screen.getByText(variant)).toBeInTheDocument();
  });

  it("applies pill style by default", () => {
    const { container } = render(<Badge>Pill</Badge>);
    const el = container.firstChild as HTMLElement;
    const hasPillClass = Array.from(el.classList).some((c) => c.includes("pill"));
    expect(hasPillClass).toBe(true);
  });

  it("does not apply pill class when pill is false", () => {
    const { container } = render(<Badge pill={false}>No pill</Badge>);
    const el = container.firstChild as HTMLElement;
    const hasPillClass = Array.from(el.classList).some((c) => c.includes("pill"));
    expect(hasPillClass).toBe(false);
  });

  it("applies className", () => {
    const { container } = render(<Badge className="extra">X</Badge>);
    expect(container.querySelector(".extra")).toBeInTheDocument();
  });

});

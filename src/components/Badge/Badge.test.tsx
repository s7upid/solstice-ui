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
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<Badge className="extra">X</Badge>);
    expect(container.querySelector(".extra")).toBeInTheDocument();
  });

  it("renders with pill false", () => {
    render(<Badge pill={false}>Not pill</Badge>);
    expect(screen.getByText("Not pill")).toBeInTheDocument();
  });
});

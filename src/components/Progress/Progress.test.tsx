import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Progress from "./Progress";

describe("Progress", () => {
  it("renders progressbar with value", () => {
    render(<Progress value={50} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "50");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("uses custom max", () => {
    render(<Progress value={5} max={10} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "10");
  });

  it.each(["default", "success", "warning", "error"] as const)(
    "renders variant %s",
    (variant) => {
      render(<Progress value={30} variant={variant} />);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    }
  );

  it.each(["sm", "md", "lg"] as const)("renders size %s", (size) => {
    render(<Progress value={0} size={size} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows label when showLabel true", () => {
    render(<Progress value={75} showLabel />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("does not show label when showLabel false", () => {
    render(<Progress value={75} showLabel={false} />);
    expect(screen.queryByText("75%")).not.toBeInTheDocument();
  });

  it("clamps percentage above max", () => {
    render(<Progress value={150} max={100} showLabel />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("clamps percentage below zero", () => {
    render(<Progress value={-10} max={100} showLabel />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<Progress value={0} className="prog" />);
    expect(container.querySelector(".prog")).toBeInTheDocument();
  });
});

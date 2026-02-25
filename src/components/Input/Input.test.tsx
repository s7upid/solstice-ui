import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Input label="Email" error="Invalid email" id="email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(<Input label="Name" required id="name" />);
    const label = screen.getByText(/name/i);
    expect(label).toHaveTextContent("*");
  });

  it("forwards ref and supports controlled value", () => {
    const { container } = render(
      <Input value="test" onChange={() => {}} readOnly id="x" />
    );
    const input = container.querySelector("input");
    expect(input).toHaveValue("test");
  });

  it("renders with icon on left (LucideIcon)", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(<Input label="Search" icon={Icon as never} iconPosition="left" id="s" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders with icon on right", () => {
    const Icon = () => <span data-testid="icon-r">Icon</span>;
    render(<Input label="Search" icon={Icon as never} iconPosition="right" id="s" />);
    expect(screen.getByTestId("icon-r")).toBeInTheDocument();
  });

  it("renders with icon as React element", () => {
    render(
      <Input
        label="Field"
        icon={<span data-testid="el-icon">X</span>}
        id="f"
      />
    );
    expect(screen.getByTestId("el-icon")).toBeInTheDocument();
  });

  it("renders without label", () => {
    const { container } = render(<Input placeholder="No label" id="n" />);
    expect(container.querySelector("input")).toHaveAttribute("placeholder", "No label");
  });

  it("renders fallback icon when icon is not element or component", () => {
    render(<Input label="X" icon={"?" as never} id="fallback" />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });
});

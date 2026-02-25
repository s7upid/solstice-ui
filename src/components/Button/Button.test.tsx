import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    const button = screen.getByRole("button", { name: /click/i });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when loading", () => {
    render(<Button loading>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders with variant and size", () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>
    );
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("renders icon on right when iconPosition is right", () => {
    const Icon = () => <span data-testid="btn-icon">I</span>;
    render(
      <Button icon={Icon as never} iconPosition="right">
        Save
      </Button>
    );
    expect(screen.getByTestId("btn-icon")).toBeInTheDocument();
  });

  it("renders icon only when no children", () => {
    const Icon = () => <span data-testid="icon-only">X</span>;
    render(<Button icon={Icon as never} aria-label="Close" />);
    expect(screen.getByTestId("icon-only")).toBeInTheDocument();
  });
});

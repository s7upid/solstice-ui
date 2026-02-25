import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Alert from "./Alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(<Alert title="Title">Body</Alert>);
    expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(<Alert>Only body</Alert>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("has role alert", () => {
    render(<Alert>Msg</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it.each(["info", "success", "warning", "error"] as const)(
    "renders variant %s",
    (variant) => {
      render(<Alert variant={variant}>Text</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    }
  );

  it("shows dismiss button when dismissible and onDismiss provided", async () => {
    const onDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Dismiss me
      </Alert>
    );
    const btn = screen.getByRole("button", { name: /dismiss/i });
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not show dismiss button when only dismissible", () => {
    render(<Alert dismissible>No handler</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(
      <Alert className="custom">Msg</Alert>
    );
    expect(container.querySelector(".custom")).toBeInTheDocument();
  });
});

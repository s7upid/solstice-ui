import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
  it("returns null when isOpen is false", () => {
    const { container } = render(
      <ConfirmationDialog
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
        title="T"
        message="M"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders when isOpen", () => {
    render(
      <ConfirmationDialog
        isOpen
        onClose={() => {}}
        onConfirm={() => {}}
        title="Confirm"
        message="Are you sure?"
      />
    );
    expect(screen.getByRole("heading", { name: /confirm/i })).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("calls onClose when backdrop clicked", async () => {
    const onClose = vi.fn();
    render(
      <ConfirmationDialog
        isOpen
        onClose={onClose}
        onConfirm={() => {}}
        title="T"
        message="M"
      />
    );
    const backdrop = document.querySelector('[class*="backdrop"]') ?? document.body.firstElementChild;
    if (backdrop) await userEvent.click(backdrop as Element);
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = vi.fn();
    render(
      <ConfirmationDialog
        isOpen
        onClose={onClose}
        onConfirm={() => {}}
        title="T"
        message="M"
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when confirm clicked", async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmationDialog
        isOpen
        onClose={() => {}}
        onConfirm={onConfirm}
        title="T"
        message="M"
        confirmText="Yes"
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /yes/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it.each(["danger", "warning", "info"] as const)("renders variant %s", (variant) => {
    render(
      <ConfirmationDialog
        isOpen
        onClose={() => {}}
        onConfirm={() => {}}
        title="T"
        message="M"
        variant={variant}
      />
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders default variant when variant is unexpected", () => {
    render(
      <ConfirmationDialog
        isOpen
        onClose={() => {}}
        onConfirm={() => {}}
        title="T"
        message="M"
        variant={"unexpected" as "danger"}
      />
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("disables buttons when isLoading", () => {
    render(
      <ConfirmationDialog
        isOpen
        onClose={() => {}}
        onConfirm={() => {}}
        title="T"
        message="M"
        isLoading
      />
    );
    expect(screen.getByRole("button", { name: /close/i })).toBeDisabled();
  });
});

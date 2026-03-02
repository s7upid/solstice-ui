import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dialog from "./Dialog";

describe("Dialog", () => {
  it("returns null when isOpen is false", () => {
    const { container } = render(
      <Dialog isOpen={false} onClose={() => {}}>Content</Dialog>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders with title and content when open", () => {
    render(
      <Dialog isOpen onClose={() => {}} title="My Dialog">
        <p>Body</p>
      </Dialog>
    );
    expect(screen.getByRole("dialog", { name: /my dialog/i })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(
      <Dialog isOpen onClose={() => {}}>
        <p>Only body</p>
      </Dialog>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Only body")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen onClose={onClose} title="T">
        x
      </Dialog>
    );
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop clicked and closeOnBackdropClick true", () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen onClose={onClose} closeOnBackdropClick>
        x
      </Dialog>
    );
    const backdrop = document.querySelector('[role="dialog"]');
    expect(backdrop).toBeTruthy();
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose on Escape", async () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen onClose={onClose} title="T">
        x
      </Dialog>
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when closeOnEscape is false", async () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen onClose={onClose} closeOnEscape={false} title="T">
        x
      </Dialog>
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renders footer", () => {
    render(
      <Dialog isOpen onClose={() => {}} footer={<button>OK</button>}>
        x
      </Dialog>
    );
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  it("renders footerActions as buttons with labels", () => {
    render(
      <Dialog
        isOpen
        onClose={() => {}}
        footerActions={[
          { label: "Cancel", onClick: () => {} },
          { label: "Confirm", onClick: () => {} },
        ]}
      >
        x
      </Dialog>
    );
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /confirm/i })).toBeInTheDocument();
  });

  it("uses footer when both footer and footerActions are provided", () => {
    render(
      <Dialog
        isOpen
        onClose={() => {}}
        footer={<button>Custom footer</button>}
        footerActions={[{ label: "Action", onClick: () => {} }]}
      >
        x
      </Dialog>
    );
    expect(screen.getByRole("button", { name: /custom footer/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /action/i })).not.toBeInTheDocument();
  });

  it.each(["sm", "md", "lg", "full"] as const)("renders size %s", (size) => {
    render(
      <Dialog isOpen onClose={() => {}} size={size} title="T">
        x
      </Dialog>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

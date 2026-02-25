import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DangerZone from "./DangerZone";

describe("DangerZone", () => {
  it("renders title and description", () => {
    render(
      <DangerZone
        title="Delete account"
        description="This cannot be undone."
        buttonLabel="Delete"
        onConfirm={() => {}}
      />
    );
    expect(screen.getByRole("heading", { name: /delete account/i })).toBeInTheDocument();
    expect(screen.getByText(/this cannot be undone/i)).toBeInTheDocument();
  });

  it("calls onConfirm when button clicked", async () => {
    const onConfirm = vi.fn();
    render(
      <DangerZone
        title="T"
        description="D"
        buttonLabel="Confirm"
        onConfirm={onConfirm}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled", () => {
    render(
      <DangerZone
        title="T"
        description="D"
        buttonLabel="Delete"
        onConfirm={() => {}}
        disabled
      />
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

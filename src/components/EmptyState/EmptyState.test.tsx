import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmptyState from "./EmptyState";

const MockIcon = () => <span data-testid="empty-icon">I</span>;

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByRole("heading", { name: /no items/i })).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<EmptyState title="T" description="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("renders without description", () => {
    render(<EmptyState title="T" />);
    expect(screen.queryByText("Nothing here")).not.toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<EmptyState title="T" icon={MockIcon as never} />);
    expect(screen.getByTestId("empty-icon")).toBeInTheDocument();
  });

  it("renders primary action and calls onClick", async () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="T"
        primaryAction={{ label: "Add", onClick }}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders secondary action", async () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="T"
        secondaryAction={{ label: "Back", onClick }}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies className", () => {
    const { container } = render(<EmptyState title="T" className="empty-custom" />);
    expect(container.querySelector(".empty-custom")).toBeInTheDocument();
  });
});

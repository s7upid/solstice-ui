import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders with role status", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();
  });

  it("renders with custom aria-label when text provided", () => {
    render(<LoadingSpinner text="Please wait" />);
    expect(screen.getByRole("status", { name: /please wait/i })).toBeInTheDocument();
  });

  it("shows text when text and showMessage true", () => {
    render(<LoadingSpinner text="Loading..." showMessage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("does not show text when showMessage false", () => {
    render(<LoadingSpinner text="Loading..." showMessage={false} />);
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"] as const)("renders size %s", (size) => {
    const { container } = render(<LoadingSpinner size={size} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<LoadingSpinner className="my-spinner" />);
    expect(container.querySelector(".my-spinner")).toBeInTheDocument();
  });
});

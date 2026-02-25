import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

const MockIcon = () => <span data-testid="ph-icon">I</span>;

describe("PageHeader", () => {
  it("renders title", () => {
    render(<PageHeader title="Dashboard" />);
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<PageHeader title="T" description="Page description" />);
    expect(screen.getByText("Page description")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<PageHeader title="T" subtitle="Sub" />);
    expect(screen.getByText("Sub")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<PageHeader title="T" icon={MockIcon as never} />);
    expect(screen.getByTestId("ph-icon")).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(
      <PageHeader
        title="T"
        actions={<button>Action</button>}
      />
    );
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<PageHeader title="T" className="ph-custom" />);
    expect(container.querySelector(".ph-custom")).toBeInTheDocument();
  });
});

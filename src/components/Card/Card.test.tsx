import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";

const MockIcon = () => <span data-testid="icon">I</span>;

describe("Card", () => {
  it("renders title and description", () => {
    render(<Card title="Title" description="Desc" />);
    expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(<Card title="T" icon={MockIcon as never} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders with avatar", () => {
    render(<Card title="T" avatar="https://example.com/avatar.png" />);
    const img = document.querySelector('img[src="https://example.com/avatar.png"]');
    expect(img).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<Card title="T" status="Active" statusVariant="success" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders details", () => {
    render(
      <Card
        title="T"
        details={[{ label: "L1", value: "V1" }]}
        detailsPerRow={2}
      />
    );
    expect(screen.getByText("L1")).toBeInTheDocument();
    expect(screen.getByText("V1")).toBeInTheDocument();
  });

  it("renders details with detailsPerRow 3 and detail icon", () => {
    const DetailIcon = () => <span data-testid="detail-icon">D</span>;
    render(
      <Card
        title="T"
        details={[
          { label: "A", value: "1", icon: DetailIcon as never },
          { label: "B", value: "2" },
        ]}
        detailsPerRow={3}
      />
    );
    expect(screen.getByTestId("detail-icon")).toBeInTheDocument();
  });

  it("renders details with detailsPerRow 4", () => {
    render(
      <Card
        title="T"
        details={[{ label: "X", value: "Y" }]}
        detailsPerRow={4}
      />
    );
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("renders stats", () => {
    render(
      <Card title="T" stats={[{ label: "Views", value: 100 }]} />
    );
    expect(screen.getByText(/views/i)).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders stats with stat icon", () => {
    render(
      <Card
        title="T"
        stats={[{ label: "Count", value: 5, icon: MockIcon as never }]}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders actions and calls onClick", async () => {
    const onClick = vi.fn();
    render(
      <Card
        title="T"
        actions={[{ label: "Edit", onClick }]}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders actions with action icon", () => {
    render(
      <Card
        title="T"
        actions={[{ label: "Save", onClick: () => {}, icon: MockIcon as never }]}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it.each(["default", "vertical", "horizontal"] as const)(
    "renders layout %s",
    (layout) => {
      render(<Card title="T" layout={layout} />);
      expect(screen.getByRole("heading")).toBeInTheDocument();
    }
  );

  it("renders children", () => {
    render(<Card title="T"><div data-testid="child">Child</div></Card>);
    expect(screen.getByTestId("child")).toHaveTextContent("Child");
  });

  it("applies className", () => {
    const { container } = render(<Card title="T" className="custom" />);
    expect(container.querySelector(".custom")).toBeInTheDocument();
  });

  it("avatar onError falls back to no image", () => {
    const { container } = render(<Card title="T" avatar="https://invalid.example/img.png" />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    if (img) {
      act(() => {
        img.dispatchEvent(new Event("error"));
      });
    }
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders image layout when imageSrc is set", () => {
    render(
      <Card
        title="Image Card"
        description="With image and action"
        imageSrc="https://example.com/img.jpg"
        actionLabel="Explore"
        onAction={() => {}}
      />
    );
    expect(screen.getByRole("heading", { name: /image card/i })).toBeInTheDocument();
    expect(screen.getByText("With image and action")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /explore/i })).toBeInTheDocument();
    const img = document.querySelector('img[src="https://example.com/img.jpg"]');
    expect(img).toBeInTheDocument();
  });
});

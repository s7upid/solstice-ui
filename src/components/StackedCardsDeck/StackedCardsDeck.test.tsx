import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StackedCardsDeck from "./StackedCardsDeck";

const items = [
  { title: "A", description: "Desc A", imageSrc: "https://a.png" },
  { title: "B", description: "Desc B", imageSrc: "https://b.png" },
];

describe("StackedCardsDeck", () => {
  it("returns null when items empty", () => {
    const { container } = render(<StackedCardsDeck items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders items", () => {
    render(<StackedCardsDeck items={items} />);
    expect(screen.getByRole("heading", { name: /a/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /b/i })).toBeInTheDocument();
  });

  it("does not render dots or tablist", () => {
    render(<StackedCardsDeck items={items} />);
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("renders with controlled activeIndex", () => {
    render(<StackedCardsDeck items={items} activeIndex={1} />);
    expect(screen.getByRole("region", { name: /card deck/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /b/i })).toBeInTheDocument();
  });

  it("renders scroll region with container height in vh", () => {
    const { container } = render(
      <StackedCardsDeck items={items} containerHeight={65} />
    );
    expect(screen.getByRole("region", { name: /card deck/i })).toBeInTheDocument();
    const track = container.querySelector("[class*='scrollTrack']");
    expect(track).toBeInTheDocument();
    expect(track).toHaveStyle({ height: "65vh" });
  });

  it("applies className", () => {
    const { container } = render(
      <StackedCardsDeck items={items} className="deck-custom" />
    );
    expect(container.querySelector(".deck-custom")).toBeInTheDocument();
  });

  it("renders Card components with image layout", () => {
    const { container } = render(<StackedCardsDeck items={items} />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(2);
  });

  it("renders action buttons when onAction is provided", () => {
    const withAction = items.map((item) => ({
      ...item,
      actionLabel: "Go",
      onAction: () => {},
    }));
    render(<StackedCardsDeck items={withAction} />);
    const buttons = screen.getAllByText("Go");
    expect(buttons.length).toBe(2);
  });
});

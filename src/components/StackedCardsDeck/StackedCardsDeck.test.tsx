import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StackedCardsDeck from "./StackedCardsDeck";

const defaultItems = [
  { title: "Card A", description: "Desc A", imageSrc: "https://a.png" },
  { title: "Card B", description: "Desc B", imageSrc: "https://b.png" },
];

let lastResizeObserverCallback: (() => void) | null = null;

describe("StackedCardsDeck", () => {
  beforeEach(() => {
    lastResizeObserverCallback = null;
    vi.stubGlobal("ResizeObserver", class {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      constructor(callback: () => void) {
        lastResizeObserverCallback = callback;
      }
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders no cards and minimal scroll container when items is empty", () => {
    const { container } = render(<StackedCardsDeck items={[]} />);
    const scrollContainer = container.querySelector(
      "[class*='scrollContainer']"
    );
    expect(scrollContainer).toBeInTheDocument();
    expect(scrollContainer).toHaveAttribute("aria-hidden");
    expect(scrollContainer).toHaveStyle({ height: "0px" });
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders all item titles and images", () => {
    const { container } = render(<StackedCardsDeck items={defaultItems} />);
    expect(screen.getByRole("heading", { name: /card a/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /card b/i })).toBeInTheDocument();
    expect(container.querySelectorAll("img")).toHaveLength(2);
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(
      <StackedCardsDeck items={defaultItems} className="deck-custom" />
    );
    expect(container.querySelector(".deck-custom")).toBeInTheDocument();
  });

  it("uses containerHeight for scroll container height", () => {
    const { container } = render(
      <StackedCardsDeck items={defaultItems} containerHeight={65} />
    );
    const scrollContainer = container.querySelector(
      "[class*='scrollContainer']"
    );
    expect(scrollContainer).toHaveStyle({ height: "65vh" });
  });

  it("passes imageAlt to Card when provided", () => {
    render(
      <StackedCardsDeck
        items={[{ ...defaultItems[0], imageAlt: "Green plants" }]}
      />
    );
    expect(screen.getByAltText("Green plants")).toBeInTheDocument();
  });

  it("renders action buttons and calls onAction when clicked", async () => {
    const onAction = vi.fn();
    const withAction = defaultItems.map((item, i) => ({
      ...item,
      actionLabel: "Go",
      onAction: i === 0 ? onAction : () => {},
    }));
    render(<StackedCardsDeck items={withAction} />);
    const buttons = screen.getAllByRole("button", { name: /go/i });
    expect(buttons).toHaveLength(2);
    await userEvent.click(buttons[0]);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("applies cardHeight and spacing to card wrappers", () => {
    const { container } = render(
      <StackedCardsDeck
        items={defaultItems}
        cardHeight={200}
        spacing={80}
      />
    );
    const cardWrappers = container.querySelectorAll("[class*='cardWrapper']");
    expect(cardWrappers).toHaveLength(2);
    expect((cardWrappers[0] as HTMLElement).style.height).toBe("200px");
    expect((cardWrappers[0] as HTMLElement).style.marginBottom).toBe("80px");
  });

  it("uses zero bottom padding for single item", async () => {
    const { container } = render(
      <StackedCardsDeck items={[defaultItems[0]]} />
    );
    const stack = container.querySelector("[class*='stack']") as HTMLDivElement;
    await act(async () => {
      for (let i = 0; i < 4; i++) {
        await new Promise((r) => requestAnimationFrame(r));
      }
    });
    await waitFor(() => {
      expect(parseFloat(stack.style.paddingBottom)).toBe(0);
    });
  });

  it("disconnects ResizeObserver on unmount", () => {
    const disconnect = vi.fn();
    vi.stubGlobal("ResizeObserver", class {
      observe = vi.fn();
      disconnect = disconnect;
      unobserve = vi.fn();
    });
    const { unmount } = render(<StackedCardsDeck items={defaultItems} />);
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it("trims bottom padding when scroll height exceeds desired", async () => {
    const { container } = render(<StackedCardsDeck items={defaultItems} />);
    const scrollContainer = container.querySelector(
      "[class*='scrollContainer']"
    ) as HTMLDivElement;
    const stack = container.querySelector("[class*='stack']") as HTMLDivElement;
    expect(scrollContainer).toBeTruthy();
    expect(stack).toBeTruthy();
    Object.defineProperty(scrollContainer, "scrollHeight", {
      value: 10000,
      configurable: true,
    });
    Object.defineProperty(scrollContainer, "clientHeight", {
      value: 500,
      configurable: true,
    });
    await act(async () => {
      for (let i = 0; i < 4; i++) {
        await new Promise((r) => requestAnimationFrame(r));
      }
    });
    await waitFor(() => {
      expect(parseFloat(stack.style.paddingBottom)).toBe(0);
    });
  });

  it("uses default containerHeight when not provided", () => {
    const { container } = render(<StackedCardsDeck items={defaultItems} />);
    const scrollContainer = container.querySelector(
      "[class*='scrollContainer']"
    );
    expect(scrollContainer).toHaveStyle({ height: "80vh" });
  });

  it("caps bottom padding at maxPadding when raw padding would be larger", async () => {
    const { container } = render(
      <StackedCardsDeck items={defaultItems} cardHeight={100} spacing={40} />
    );
    const stack = container.querySelector("[class*='stack']") as HTMLDivElement;
    await act(async () => {
      for (let i = 0; i < 4; i++) {
        await new Promise((r) => requestAnimationFrame(r));
      }
    });
    await waitFor(() => {
      const padding = parseFloat(stack.style.paddingBottom);
      expect(padding).toBeLessThanOrEqual(80);
      expect(padding).toBeGreaterThanOrEqual(0);
    });
  });

  it("uses zero padding when measured content height yields non-finite value", async () => {
    const { container } = render(<StackedCardsDeck items={defaultItems} />);
    const stack = container.querySelector("[class*='stack']") as HTMLDivElement;
    const firstChild = stack?.firstElementChild as HTMLDivElement;
    expect(firstChild).toBeTruthy();
    Object.defineProperty(firstChild, "offsetHeight", {
      value: NaN,
      configurable: true,
    });
    lastResizeObserverCallback?.();
    await act(async () => {
      for (let i = 0; i < 4; i++) {
        await new Promise((r) => requestAnimationFrame(r));
      }
    });
    await waitFor(() => {
      expect(parseFloat(stack.style.paddingBottom)).toBe(0);
    });
  });
});

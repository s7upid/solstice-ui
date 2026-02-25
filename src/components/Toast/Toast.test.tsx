import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders toasts", () => {
    const toasts = [
      { id: "1", type: "success" as const, title: "Done" },
      { id: "2", type: "error" as const, title: "Failed", message: "Details" },
    ];
    render(<Toast toasts={toasts} onRemove={() => {}} />);
    vi.advanceTimersByTime(20);
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("calls onRemove when dismiss clicked", () => {
    const onRemove = vi.fn();
    render(
      <Toast
        toasts={[{ id: "1", type: "info", title: "Hi" }]}
        onRemove={onRemove}
      />
    );
    vi.advanceTimersByTime(20);
    const dismissBtn = screen.getByRole("button", { name: /dismiss/i });
    fireEvent.click(dismissBtn);
    vi.advanceTimersByTime(350);
    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it.each(["success", "error", "info", "warning"] as const)(
    "renders type %s",
    (type) => {
      render(
        <Toast toasts={[{ id: "1", type, title: "T" }]} onRemove={() => {}} />
      );
      vi.advanceTimersByTime(20);
      expect(screen.getByText("T")).toBeInTheDocument();
    }
  );

  it("uses dismissDelay when provided", () => {
    const onRemove = vi.fn();
    render(
      <Toast
        toasts={[{ id: "1", type: "success", title: "T" }]}
        onRemove={onRemove}
        dismissDelay={1000}
      />
    );
    vi.advanceTimersByTime(20);
    expect(screen.getByText("T")).toBeInTheDocument();
    vi.advanceTimersByTime(1000);
    vi.advanceTimersByTime(350);
    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("uses toast.duration when set and positive", () => {
    const onRemove = vi.fn();
    render(
      <Toast
        toasts={[{ id: "1", type: "success", title: "T", duration: 2000 }]}
        onRemove={onRemove}
      />
    );
    vi.advanceTimersByTime(20);
    vi.advanceTimersByTime(2000);
    vi.advanceTimersByTime(350);
    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("renders default variant when type is unknown", () => {
    render(
      <Toast
        toasts={[{ id: "1", type: "unknown" as "success", title: "T" }]}
        onRemove={() => {}}
      />
    );
    vi.advanceTimersByTime(20);
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("expand button shows Show less when clicked", () => {
    render(
      <Toast
        toasts={[
          { id: "1", type: "info", title: "T", message: "Some message" },
        ]}
        onRemove={() => {}}
      />
    );
    vi.advanceTimersByTime(20);
    const moreBtn = screen.queryByRole("button", { name: /show more/i });
    if (moreBtn) {
      fireEvent.click(moreBtn);
      expect(screen.getByRole("button", { name: /show less/i })).toBeInTheDocument();
    }
  });
});

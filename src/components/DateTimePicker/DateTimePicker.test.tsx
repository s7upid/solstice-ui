import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DateTimePicker from "./DateTimePicker";

describe("DateTimePicker", () => {
  it("renders with label", () => {
    render(<DateTimePicker label="Date" id="d" />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  it("renders without label", () => {
    const { container } = render(<DateTimePicker id="x" />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it.each(["date", "time", "datetime"] as const)("renders mode %s", (mode) => {
    render(<DateTimePicker mode={mode} id="x" />);
    const input = document.querySelector("input");
    const expectedType =
      mode === "datetime" ? "datetime-local" : mode;
    expect(input).toHaveAttribute("type", expectedType);
  });

  it("shows required indicator", () => {
    render(<DateTimePicker label="When" required id="x" />);
    expect(screen.getByText(/\*/)).toBeInTheDocument();
  });

  it("calls onChange with value", () => {
    const onChange = vi.fn();
    render(<DateTimePicker onChange={onChange} label="When" id="dt-x" />);
    const input = screen.getByLabelText(/when/i) as HTMLInputElement;
    act(() => {
      Object.defineProperty(input, "value", { value: "2025-02-24", writable: true });
      fireEvent.change(input, { target: input });
    });
    expect(onChange).toHaveBeenCalledWith("2025-02-24");
  });

  it("shows error", () => {
    render(<DateTimePicker error="Invalid date" id="x" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid date");
  });

  it("forwards ref and value", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<DateTimePicker ref={ref} value="2025-02-24" id="x" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.getAttribute("value")).toBe("2025-02-24");
  });

  it("applies min and max", () => {
    render(
      <DateTimePicker
        mode="date"
        min="2020-01-01"
        max="2030-12-31"
        id="x"
      />
    );
    const input = document.querySelector("input");
    expect(input).toHaveAttribute("min", "2020-01-01");
    expect(input).toHaveAttribute("max", "2030-12-31");
  });
});

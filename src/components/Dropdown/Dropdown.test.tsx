import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
];

describe("Dropdown", () => {
  it("renders options", () => {
    render(<Dropdown options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /option a/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /option b/i })).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Dropdown options={options} label="Choose" />);
    expect(screen.getByText("Choose")).toBeInTheDocument();
  });

  it("shows placeholder option", () => {
    render(
      <Dropdown options={options} placeholderOption="Select..." />
    );
    expect(screen.getByRole("option", { name: /select/i })).toBeInTheDocument();
  });

  it("calls onValueChange when selection changes", async () => {
    const onValueChange = vi.fn();
    render(
      <Dropdown options={options} onValueChange={onValueChange} />
    );
    await userEvent.selectOptions(screen.getByRole("combobox"), "b");
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("calls onChange", async () => {
    const onChange = vi.fn();
    render(<Dropdown options={options} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("shows error", () => {
    render(<Dropdown options={options} error="Invalid" />);
    expect(screen.getByText("Invalid")).toBeInTheDocument();
  });

  it("shows helperText when no error", () => {
    render(<Dropdown options={options} helperText="Pick one" />);
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("does not show helperText when error present", () => {
    render(<Dropdown options={options} error="Err" helperText="Help" />);
    expect(screen.getByText("Err")).toBeInTheDocument();
    expect(screen.queryByText("Help")).not.toBeInTheDocument();
  });

  it("forwards ref and value", () => {
    const ref = { current: null as HTMLSelectElement | null };
    render(<Dropdown ref={ref} options={options} value="a" />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current?.value).toBe("a");
  });
});

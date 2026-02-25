import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders unchecked", () => {
    render(<Checkbox state={false} onStateChange={() => {}} />);
    const input = screen.getByRole("checkbox");
    expect(input).toHaveAttribute("aria-checked", "false");
  });

  it("renders checked", () => {
    render(<Checkbox state={true} onStateChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("renders indeterminate", () => {
    render(<Checkbox state="indeterminate" onStateChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  it("calls onStateChange on click (triState)", async () => {
    const onStateChange = vi.fn();
    render(<Checkbox state={false} onStateChange={onStateChange} triState />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onStateChange).toHaveBeenCalledWith(true);
  });

  it("calls onStateChange on Space (triState)", async () => {
    const onStateChange = vi.fn();
    render(<Checkbox state={true} onStateChange={onStateChange} triState />);
    screen.getByRole("checkbox").focus();
    await userEvent.keyboard(" ");
    expect(onStateChange).toHaveBeenCalledWith("indeterminate");
  });

  it("cycles to unchecked from indeterminate when triState", async () => {
    const onStateChange = vi.fn();
    render(<Checkbox state="indeterminate" onStateChange={onStateChange} triState />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onStateChange).toHaveBeenCalledWith(false);
  });

  it("binary mode: only toggles between false and true", async () => {
    const onStateChange = vi.fn();
    render(<Checkbox state={true} onStateChange={onStateChange} triState={false} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onStateChange).toHaveBeenCalledWith(false);
  });

  it("renders with label and description", () => {
    render(
      <Checkbox state={false} label="Accept" description="Terms" onStateChange={() => {}} />
    );
    expect(screen.getByLabelText(/accept/i)).toBeInTheDocument();
    expect(screen.getByText("Terms")).toBeInTheDocument();
  });

  it("renders error", () => {
    render(<Checkbox state={false} error="Required" onStateChange={() => {}} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("is disabled", () => {
    render(<Checkbox state={false} disabled onStateChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("applies className", () => {
    const { container } = render(
      <Checkbox state={false} className="cb-custom" onStateChange={() => {}} />
    );
    expect(container.querySelector(".cb-custom")).toBeInTheDocument();
  });

  it("forwards ref when ref is object", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Checkbox state={false} ref={ref} onStateChange={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("forwards ref when ref is function", () => {
    let captured: HTMLInputElement | null = null;
    render(
      <Checkbox
        state={false}
        ref={(el) => {
          captured = el;
        }}
        onStateChange={() => {}}
      />
    );
    expect(captured).toBeInstanceOf(HTMLInputElement);
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle from "./Toggle";

const MockIcon = () => <span data-testid="icon">I</span>;
const MockIconPressed = () => <span data-testid="icon-pressed">P</span>;

describe("Toggle (button variant)", () => {
  it("renders unchecked", () => {
    render(<Toggle label="Toggle" onToggle={() => {}} />);
    const btn = screen.getByRole("switch", { name: /toggle/i });
    expect(btn).toHaveAttribute("aria-checked", "false");
  });

  it("renders checked when defaultPressed", () => {
    render(<Toggle label="T" defaultPressed onToggle={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onToggle when clicked", async () => {
    const onToggle = vi.fn();
    render(<Toggle label="T" onToggle={onToggle} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("controlled: respects pressed prop", () => {
    render(<Toggle label="T" pressed onToggle={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("shows labelPressed when pressed", () => {
    render(
      <Toggle
        label="Off"
        labelPressed="On"
        pressed
        onToggle={() => {}}
      />
    );
    expect(screen.getByRole("switch")).toHaveTextContent("On");
  });

  it("renders with icon", () => {
    render(<Toggle label="T" icon={MockIcon as never} onToggle={() => {}} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders iconPressed when pressed", () => {
    render(
      <Toggle
        icon={MockIcon as never}
        iconPressed={MockIconPressed as never}
        pressed
        onToggle={() => {}}
        aria-label="Toggle"
      />
    );
    expect(screen.getByTestId("icon-pressed")).toBeInTheDocument();
  });

  it("calls onClick when provided", async () => {
    const onClick = vi.fn();
    render(<Toggle label="T" onClick={onClick} onToggle={() => {}} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onToggle when onClick prevents default", async () => {
    const onToggle = vi.fn();
    render(
      <Toggle
        label="T"
        onClick={(e) => e.preventDefault()}
        onToggle={onToggle}
      />
    );
    await userEvent.click(screen.getByRole("switch"));
    expect(onToggle).not.toHaveBeenCalled();
  });

  it("renders icon on right when iconPosition is right", () => {
    render(
      <Toggle
        label="T"
        icon={MockIcon as never}
        iconPosition="right"
        onToggle={() => {}}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it.each(["primary", "secondary", "outline", "ghost"] as const)(
    "renders buttonVariant %s",
    (buttonVariant) => {
      render(
        <Toggle
          variant="button"
          label="T"
          buttonVariant={buttonVariant}
          onToggle={() => {}}
        />
      );
      expect(screen.getByRole("switch")).toBeInTheDocument();
    }
  );

  it.each(["sm", "md", "lg"] as const)("renders size %s", (size) => {
    render(<Toggle label="T" size={size} onToggle={() => {}} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });
});

describe("Toggle (switch variant)", () => {
  it("renders in off state", () => {
    render(
      <Toggle variant="switch" state="off" onStateChange={() => {}} />
    );
    const toggle = screen.getByRole("switch", { name: /toggle state/i });
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("renders in on state", () => {
    render(
      <Toggle variant="switch" state="on" onStateChange={() => {}} />
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("renders in indeterminate state", () => {
    render(
      <Toggle
        variant="switch"
        state="indeterminate"
        onStateChange={() => {}}
      />
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "mixed");
  });

  it("cycles off → on → indeterminate → off when triState is true", async () => {
    const onStateChange = vi.fn();
    let current: "off" | "on" | "indeterminate" = "off";
    const handleChange = (next: "off" | "on" | "indeterminate") => {
      onStateChange(next);
      current = next;
    };
    const { rerender } = render(
      <Toggle
        variant="switch"
        state={current}
        onStateChange={handleChange}
      />
    );
    const toggle = screen.getByRole("switch");
    await userEvent.click(toggle);
    expect(onStateChange).toHaveBeenCalledWith("on");
    rerender(
      <Toggle
        variant="switch"
        state={current}
        onStateChange={handleChange}
      />
    );
    await userEvent.click(toggle);
    expect(onStateChange).toHaveBeenCalledWith("indeterminate");
    rerender(
      <Toggle
        variant="switch"
        state={current}
        onStateChange={handleChange}
      />
    );
    await userEvent.click(toggle);
    expect(onStateChange).toHaveBeenCalledWith("off");
  });

  it("cycles only off ↔ on when triState is false", async () => {
    const onStateChange = vi.fn();
    let current: "off" | "on" = "off";
    const handleChange = (next: "off" | "on" | "indeterminate") => {
      onStateChange(next);
      current = next as "off" | "on";
    };
    const { rerender } = render(
      <Toggle
        variant="switch"
        state={current}
        onStateChange={handleChange}
        triState={false}
      />
    );
    await userEvent.click(screen.getByRole("switch"));
    expect(onStateChange).toHaveBeenCalledWith("on");
    rerender(
      <Toggle
        variant="switch"
        state={current}
        onStateChange={handleChange}
        triState={false}
      />
    );
    await userEvent.click(screen.getByRole("switch"));
    expect(onStateChange).toHaveBeenCalledWith("off");
  });

  it("renders optional labels", () => {
    render(
      <Toggle
        variant="switch"
        state="indeterminate"
        onStateChange={() => {}}
        labels={{ off: "No", indeterminate: "Some", on: "All" }}
      />
    );
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("Some")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Toggle
        variant="switch"
        state="off"
        onStateChange={() => {}}
        disabled
      />
    );
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "./Accordion";

describe("Accordion", () => {
  it("renders items with headers", () => {
    render(
      <Accordion>
        <Accordion.Item id="a" header="Section A">
          Content A
        </Accordion.Item>
        <Accordion.Item id="b" header="Section B">
          Content B
        </Accordion.Item>
      </Accordion>
    );
    expect(screen.getByRole("button", { name: /section a/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /section b/i })).toBeInTheDocument();
  });

  it("shows content when header is clicked", async () => {
    render(
      <Accordion>
        <Accordion.Item id="a" header="Section A">
          Content A
        </Accordion.Item>
      </Accordion>
    );
    expect(screen.queryByText("Content A")).not.toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    expect(screen.getByText("Content A")).toBeVisible();
  });

  it("hides content when header is clicked again", async () => {
    render(
      <Accordion>
        <Accordion.Item id="a" header="Section A">
          Content A
        </Accordion.Item>
      </Accordion>
    );
    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    expect(screen.getByText("Content A")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    const panel = document.getElementById("a-panel");
    expect(panel).toHaveAttribute("hidden");
  });

  it("single type closes previous when opening another", async () => {
    render(
      <Accordion type="single">
        <Accordion.Item id="a" header="Section A">
          Content A
        </Accordion.Item>
        <Accordion.Item id="b" header="Section B">
          Content B
        </Accordion.Item>
      </Accordion>
    );
    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    expect(screen.getByText("Content A")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: /section b/i }));
    expect(document.getElementById("a-panel")).toHaveAttribute("hidden");
    expect(screen.getByText("Content B")).toBeVisible();
  });

  it("multiple type keeps both open", async () => {
    render(
      <Accordion type="multiple">
        <Accordion.Item id="a" header="Section A">
          Content A
        </Accordion.Item>
        <Accordion.Item id="b" header="Section B">
          Content B
        </Accordion.Item>
      </Accordion>
    );
    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    await userEvent.click(screen.getByRole("button", { name: /section b/i }));
    expect(screen.getByText("Content A")).toBeVisible();
    expect(screen.getByText("Content B")).toBeVisible();
  });

  it("respects defaultExpanded", () => {
    render(
      <Accordion defaultExpanded={["b"]}>
        <Accordion.Item id="a" header="Section A">
          Content A
        </Accordion.Item>
        <Accordion.Item id="b" header="Section B">
          Content B
        </Accordion.Item>
      </Accordion>
    );
    expect(screen.getByText("Content B")).toBeVisible();
    expect(document.getElementById("a-panel")).toHaveAttribute("hidden");
  });

  it("calls onExpandedChange when controlled", async () => {
    const onExpandedChange = vi.fn();
    render(
      <Accordion expanded={[]} onExpandedChange={onExpandedChange}>
        <Accordion.Item id="a" header="Section A">
          Content A
        </Accordion.Item>
      </Accordion>
    );
    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    expect(onExpandedChange).toHaveBeenCalledWith(["a"]);
  });

  it("disabled item does not expand on click", async () => {
    render(
      <Accordion>
        <Accordion.Item id="a" header="Section A" disabled>
          Content A
        </Accordion.Item>
      </Accordion>
    );
    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    expect(document.getElementById("a-panel")).toHaveAttribute("hidden");
  });

  it("applies className to accordion", () => {
    const { container } = render(
      <Accordion className="accordion-custom">
        <Accordion.Item id="a" header="A">Content</Accordion.Item>
      </Accordion>
    );
    expect(container.querySelector(".accordion-custom")).toBeInTheDocument();
  });

  it("has accessible expanded state", async () => {
    render(
      <Accordion>
        <Accordion.Item id="a" header="Section A">
          Content A
        </Accordion.Item>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: /section a/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});

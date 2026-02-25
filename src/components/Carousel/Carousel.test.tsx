import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carousel from "./Carousel";

describe("Carousel", () => {
  it("renders single slide", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
      </Carousel>
    );
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.queryByLabelText(/previous slide/i)).not.toBeInTheDocument();
  });

  it("renders multiple slides and shows arrows and dots", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByLabelText(/previous slide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next slide/i)).toBeInTheDocument();
    expect(screen.getByRole("tablist", { name: /slide navigation/i })).toBeInTheDocument();
  });

  it("goes to next slide when next clicked", async () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );
    await userEvent.click(screen.getByLabelText(/next slide/i));
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  it("calls onActiveIndexChange when index changes", async () => {
    const onActiveIndexChange = vi.fn();
    render(
      <Carousel onActiveIndexChange={onActiveIndexChange}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );
    await userEvent.click(screen.getByLabelText(/next slide/i));
    expect(onActiveIndexChange).toHaveBeenCalledWith(1);
  });

  it("respects controlled activeIndex", () => {
    render(
      <Carousel activeIndex={1} onActiveIndexChange={() => {}}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  it("returns null when no children", () => {
    const { container } = render(<Carousel>{null}</Carousel>);
    expect(container.firstChild).toBeNull();
  });
});

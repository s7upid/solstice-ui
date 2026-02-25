import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  it("renders with value and placeholder", () => {
    render(
      <SearchInput value="" onChange={() => {}} placeholder="Search..." />
    );
    const input = screen.getByRole("searchbox", { name: /search/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("calls onChange when typing", async () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "test");
    expect(onChange).toHaveBeenCalled();
  });

  it("is disabled when disabled", () => {
    render(<SearchInput value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("searchbox")).toBeDisabled();
  });

  it("applies className", () => {
    const { container } = render(
      <SearchInput value="" onChange={() => {}} className="search-custom" />
    );
    expect(container.querySelector(".search-custom")).toBeInTheDocument();
  });
});

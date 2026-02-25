import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("returns null when totalPages 0", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nav with current page", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText(/of 5 pages/i)).toBeInTheDocument();
  });

  it("calls onPageChange when previous clicked", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    await userEvent.click(screen.getByRole("button", { name: /previous page/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("disables previous on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
  });

  it("calls onPageChange when next clicked", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    await userEvent.click(screen.getByRole("button", { name: /next page/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables next on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
  });

  it("opens page dropdown and selects page", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );
    await userEvent.click(screen.getByRole("button", { name: "1" }));
    const option3 = screen.getByRole("option", { name: "3" });
    await userEvent.click(option3);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("renders page size selector when onPageSizeChange provided", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={() => {}}
        pageSize={25}
        onPageSizeChange={() => {}}
        pageSizeOptions={[10, 25, 50]}
      />
    );
    expect(screen.getByLabelText(/items per page/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("25");
  });

  it("calls onPageSizeChange when page size select changed", async () => {
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={() => {}}
        pageSize={10}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={[10, 25, 50]}
      />
    );
    await userEvent.selectOptions(screen.getByRole("combobox"), "25");
    expect(onPageSizeChange).toHaveBeenCalledWith(25);
  });

  it("applies className", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={() => {}}
        className="pagination-custom"
      />
    );
    expect(container.querySelector(".pagination-custom")).toBeInTheDocument();
  });

  it("keeps dropdown open when focus moves inside segment", async () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
    await userEvent.click(screen.getByRole("button", { name: "1" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const segment = document.querySelector('[aria-expanded="true"]')?.closest("div");
    const listbox = screen.getByRole("listbox");
    if (segment && listbox) {
      fireEvent.blur(segment, { relatedTarget: listbox });
    }
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("closes dropdown when focus moves outside segment", async () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
    await userEvent.click(screen.getByRole("button", { name: "1" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const segment = document.querySelector('[aria-expanded="true"]')?.closest("div");
    if (segment) {
      fireEvent.blur(segment, { relatedTarget: null });
    }
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

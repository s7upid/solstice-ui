import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ListPage from "./ListPage";

type Item = { id: string; name: string };

const items: Item[] = [
  { id: "1", name: "First" },
  { id: "2", name: "Second" },
];

describe("ListPage", () => {
  it("renders page header when title is provided", () => {
    render(
      <ListPage<Item>
        title="Items"
        items={items}
        renderItem={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByRole("heading", { name: /items/i })).toBeInTheDocument();
  });

  it("renders items via renderItem", () => {
    render(
      <ListPage<Item>
        items={items}
        renderItem={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("shows loading spinner when loading is true", () => {
    render(
      <ListPage<Item>
        items={items}
        loading
        renderItem={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.queryByText("First")).not.toBeInTheDocument();
  });

  it("shows empty state when items is empty and not loading", () => {
    render(
      <ListPage<Item>
        items={[]}
        emptyTitle="No items"
        renderItem={() => null}
      />
    );
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  it("uses keyExtractor when provided", () => {
    render(
      <ListPage<Item>
        items={items}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders actions in header when provided", () => {
    render(
      <ListPage<Item>
        title="Page"
        actions={<button>Add</button>}
        items={[]}
        renderItem={() => null}
      />
    );
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(
      <ListPage<Item>
        items={[]}
        className="my-list-page"
        renderItem={() => null}
      />
    );
    expect(container.querySelector(".my-list-page")).toBeInTheDocument();
  });

  it("renders Pagination when totalPages and onPageChange are provided", () => {
    const onPageChange = vi.fn();
    render(
      <ListPage<Item>
        items={items}
        renderItem={(item) => <span>{item.name}</span>}
        totalPages={3}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );
    expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument();
    expect(screen.getByText(/of 3 pages/i)).toBeInTheDocument();
  });

  it("does not render Pagination when totalPages is not provided", () => {
    render(
      <ListPage<Item>
        items={items}
        renderItem={(item) => <span>{item.name}</span>}
        onPageChange={() => {}}
      />
    );
    expect(screen.queryByRole("navigation", { name: /pagination/i })).not.toBeInTheDocument();
  });

  it("does not render Pagination when onPageChange is not provided", () => {
    render(
      <ListPage<Item>
        items={items}
        renderItem={(item) => <span>{item.name}</span>}
        totalPages={3}
        currentPage={1}
      />
    );
    expect(screen.queryByRole("navigation", { name: /pagination/i })).not.toBeInTheDocument();
  });
});

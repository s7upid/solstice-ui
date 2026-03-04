import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DataPage from "./DataPage";

type Item = { id: string; name: string };

const items: Item[] = [
  { id: "1", name: "Item one" },
  { id: "2", name: "Item two" },
];

describe("DataPage", () => {
  describe("grid layout", () => {
    it("renders items via renderCard", () => {
      render(
        <DataPage<Item>
          layout="grid"
          items={items}
          renderCard={(item) => <span>{item.name}</span>}
        />
      );
      expect(screen.getByText("Item one")).toBeInTheDocument();
      expect(screen.getByText("Item two")).toBeInTheDocument();
    });

    it("renders page header when title is provided", () => {
      render(
        <DataPage<Item>
          layout="grid"
          title="Projects"
          items={items}
          renderCard={(item) => <span>{item.name}</span>}
        />
      );
      expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
    });

    it("shows empty state when items is empty", () => {
      render(
        <DataPage<Item>
          layout="grid"
          items={[]}
          emptyTitle="No projects"
          renderCard={() => null}
        />
      );
      expect(screen.getByText("No projects")).toBeInTheDocument();
    });

    it("shows loading spinner when loading", () => {
      render(
        <DataPage<Item>
          layout="grid"
          items={items}
          loading
          renderCard={(item) => <span>{item.name}</span>}
        />
      );
      expect(screen.queryByText("Item one")).not.toBeInTheDocument();
    });

    it("renders contentBetweenHeaderAndContent", () => {
      render(
        <DataPage<Item>
          layout="grid"
          title="Projects"
          contentBetweenHeaderAndContent={<p data-testid="toolbar">Filters</p>}
          items={items}
          renderCard={(item) => <span>{item.name}</span>}
        />
      );
      expect(screen.getByTestId("toolbar")).toBeInTheDocument();
    });

    it("renders Pagination when totalPages and onPageChange are provided", () => {
      const onPageChange = vi.fn();
      render(
        <DataPage<Item>
          layout="grid"
          items={items}
          renderCard={(item) => <span>{item.name}</span>}
          totalPages={4}
          currentPage={1}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument();
    });
  });

  describe("list layout", () => {
    it("renders items via renderItem", () => {
      render(
        <DataPage<Item>
          items={items}
          renderItem={(item) => <span>{item.name}</span>}
        />
      );
      expect(screen.getByText("Item one")).toBeInTheDocument();
      expect(screen.getByText("Item two")).toBeInTheDocument();
    });

    it("renders page header when title is provided", () => {
      render(
        <DataPage<Item>
          title="Items"
          items={items}
          renderItem={(item) => <span>{item.name}</span>}
        />
      );
      expect(screen.getByRole("heading", { name: /items/i })).toBeInTheDocument();
    });

    it("shows empty state when items is empty", () => {
      render(
        <DataPage<Item>
          items={[]}
          emptyTitle="No items"
          renderItem={() => null}
        />
      );
      expect(screen.getByText("No items")).toBeInTheDocument();
    });

    it("shows loading spinner when loading", () => {
      render(
        <DataPage<Item>
          items={items}
          loading
          renderItem={(item) => <span>{item.name}</span>}
        />
      );
      expect(screen.queryByText("Item one")).not.toBeInTheDocument();
    });

    it("renders Pagination when totalPages and onPageChange are provided", () => {
      const onPageChange = vi.fn();
      render(
        <DataPage<Item>
          items={items}
          renderItem={(item) => <span>{item.name}</span>}
          totalPages={3}
          currentPage={1}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument();
    });
  });

  it("applies className", () => {
    const { container } = render(
      <DataPage<Item>
        items={[]}
        className="my-page"
        renderItem={() => null}
      />
    );
    expect(container.querySelector(".my-page")).toBeInTheDocument();
  });

  it("renders actions in header", () => {
    render(
      <DataPage<Item>
        title="Page"
        actions={<button>Add</button>}
        items={[]}
        renderItem={() => null}
      />
    );
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });
});

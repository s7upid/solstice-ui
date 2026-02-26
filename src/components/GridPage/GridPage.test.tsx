import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GridPage from "./GridPage";

type Item = { id: string; name: string };

const items: Item[] = [
  { id: "1", name: "Item one" },
  { id: "2", name: "Item two" },
];

describe("GridPage", () => {
  it("renders page header when title is provided", () => {
    render(
      <GridPage<Item>
        title="Projects"
        items={items}
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
  });

  it("renders cards via renderCard", () => {
    render(
      <GridPage<Item>
        items={items}
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("Item one")).toBeInTheDocument();
    expect(screen.getByText("Item two")).toBeInTheDocument();
  });

  it("shows loading spinner when loading is true", () => {
    render(
      <GridPage<Item>
        items={items}
        loading
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.queryByText("Item one")).not.toBeInTheDocument();
    const list = document.querySelector('[role="list"]');
    expect(list).not.toBeInTheDocument();
  });

  it("shows empty state when items is empty and not loading", () => {
    render(
      <GridPage<Item>
        items={[]}
        emptyTitle="No projects yet"
        renderCard={() => null}
      />
    );
    expect(screen.getByText("No projects yet")).toBeInTheDocument();
  });

  it("uses keyExtractor when provided", () => {
    render(
      <GridPage<Item>
        items={items}
        keyExtractor={(item) => item.id}
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("Item one")).toBeInTheDocument();
    expect(screen.getByText("Item two")).toBeInTheDocument();
  });

  it("renders actions in header when provided", () => {
    render(
      <GridPage<Item>
        title="Page"
        actions={<button>Add</button>}
        items={[]}
        renderCard={() => null}
      />
    );
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(
      <GridPage<Item>
        items={[]}
        className="my-grid-page"
        renderCard={() => null}
      />
    );
    expect(container.querySelector(".my-grid-page")).toBeInTheDocument();
  });
});

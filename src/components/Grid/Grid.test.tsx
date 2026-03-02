import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Grid from "./Grid";

type Item = { id: string; name: string };

const items: Item[] = [
  { id: "1", name: "Item one" },
  { id: "2", name: "Item two" },
];

describe("Grid", () => {
  it("renders items via renderCard", () => {
    render(
      <Grid<Item>
        items={items}
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("Item one")).toBeInTheDocument();
    expect(screen.getByText("Item two")).toBeInTheDocument();
  });

  it("renders with role list and listitem", () => {
    render(
      <Grid<Item>
        items={items}
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("uses keyExtractor when provided", () => {
    render(
      <Grid<Item>
        items={items}
        keyExtractor={(item) => item.id}
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("Item one")).toBeInTheDocument();
    expect(screen.getByText("Item two")).toBeInTheDocument();
  });

  it("applies gridClassName", () => {
    const { container } = render(
      <Grid<Item>
        items={items}
        gridClassName="my-grid"
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    expect(container.querySelector(".my-grid")).toBeInTheDocument();
  });

  it("renders empty grid", () => {
    render(<Grid<Item> items={[]} renderCard={() => null} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it.each([1, 2, 3, 4] as const)("accepts columns %s", (columns) => {
    render(
      <Grid<Item>
        items={items}
        columns={columns}
        renderCard={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("Item one")).toBeInTheDocument();
  });
});

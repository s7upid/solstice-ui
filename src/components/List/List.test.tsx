import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import List from "./List";

describe("List", () => {
  it("renders items via renderItem", () => {
    const items = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
    render(
      <List
        items={items}
        renderItem={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("uses keyExtractor when provided", () => {
    const items = [{ id: "x" }, { id: "y" }];
    const keyExtractor = (item: { id: string }) => item.id;
    render(
      <List
        items={items}
        renderItem={(item) => <span>{item.id}</span>}
        keyExtractor={keyExtractor}
      />
    );
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(screen.getByText("y")).toBeInTheDocument();
  });

  it("uses index as key when keyExtractor not provided and item has no id", () => {
    const items: { id?: number | string; name: string }[] = [
      { name: "a" },
      { name: "b" },
    ];
    render(
      <List
        items={items}
        renderItem={(item) => <span>{item.name}</span>}
      />
    );
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
  });

  it("applies listClassName", () => {
    const { container } = render(
      <List items={[]} renderItem={() => null} listClassName="my-list" />
    );
    expect(container.querySelector(".my-list")).toBeInTheDocument();
  });

  it("renders empty list", () => {
    const { container } = render(
      <List items={[]} renderItem={() => null} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

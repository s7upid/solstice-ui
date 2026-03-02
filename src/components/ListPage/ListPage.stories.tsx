import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { List as ListIcon, Plus } from "lucide-react";
import ListPage from "./ListPage";
import Card from "../Card/Card";
import Button from "../Button/Button";

type Item = { id: string; name: string };

const simpleItems: Item[] = [
  { id: "1", name: "First item" },
  { id: "2", name: "Second item" },
  { id: "3", name: "Third item" },
];

type CardItem = { id: string; title: string; description: string };

const cardItems: CardItem[] = [
  { id: "1", title: "Project Alpha", description: "Dashboard and analytics." },
  { id: "2", title: "Project Beta", description: "Internal tools." },
  { id: "3", title: "Project Gamma", description: "Mobile app." },
];

const meta: Meta<typeof ListPage> = {
  title: "Components/ListPage",
  component: ListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Generic page layout with optional PageHeader and a list. Use **renderItem** to render each row (e.g. with List, Card, or custom row). Supports loading, empty state, and optional pagination (totalPages, currentPage, onPageChange).",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListPage>;

export const WithSimpleList: Story = {
  render: () => (
    <ListPage<Item>
      title="Items"
      description="A simple list page"
      icon={ListIcon}
      actions={<Button icon={Plus}>Add</Button>}
      items={simpleItems}
      renderItem={(item) => (
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
          {item.name}
        </div>
      )}
    />
  ),
};

export const WithCardsInList: Story = {
  render: () => (
    <ListPage<CardItem>
      title="Projects"
      items={cardItems}
      listClassName="space-y-3"
      renderItem={(item) => (
        <Card
          title={item.title}
          description={item.description}
          layout="horizontal"
        />
      )}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <ListPage<Item>
      title="Items"
      items={[]}
      emptyTitle="No items"
      emptyDescription="Add items to see them here."
      renderItem={() => null}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <ListPage<Item>
      title="Items"
      items={simpleItems}
      loading
      renderItem={(item) => <div>{item.name}</div>}
    />
  ),
};

const paginatedItems: Item[] = [
  { id: "1", name: "Item one" },
  { id: "2", name: "Item two" },
  { id: "3", name: "Item three" },
];

function ListPageWithPagination() {
  const [page, setPage] = useState(1);
  const totalPages = 4;
  const pageItems = paginatedItems.map((item, i) => ({
    ...item,
    name: `Page ${page} – Item ${i + 1}`,
  }));
  return (
    <ListPage<Item>
      title="Paginated list"
      description="Navigate between pages"
      items={pageItems}
      renderItem={(item) => (
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
          {item.name}
        </div>
      )}
      totalPages={totalPages}
      currentPage={page}
      onPageChange={setPage}
    />
  );
}

export const WithPagination: Story = {
  render: () => <ListPageWithPagination />,
};

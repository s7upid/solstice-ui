import type { Meta, StoryObj } from "@storybook/react";
import List from "./List";
import Card from "../Card/Card";

type Item = { id: string; name: string };

const items: Item[] = [
  { id: "1", name: "First item" },
  { id: "2", name: "Second item" },
  { id: "3", name: "Third item" },
];

type CardItem = { id: string; title: string; description: string; status?: string };

const cardItems: CardItem[] = [
  { id: "1", title: "Project Alpha", description: "Dashboard and analytics for the main product.", status: "Active" },
  { id: "2", title: "Project Beta", description: "Internal tools and admin panel.", status: "In progress" },
  { id: "3", title: "Project Gamma", description: "Mobile app and API integration.", status: "Planned" },
];

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Generic list that renders items via renderItem. Optional keyExtractor; otherwise uses item.id or index. Supports listClassName.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: () => (
    <List
      items={items}
      renderItem={(item: Item) => (
        <div className="p-2 border border-gray-200 dark:border-gray-700 rounded">
          {item.name}
        </div>
      )}
    />
  ),
};

export const SimpleText: Story = {
  render: () => (
    <List
      items={["Alpha", "Beta", "Gamma"].map((name, i) => ({ id: String(i), name }))}
      renderItem={(item: Item) => <span>{item.name}</span>}
    />
  ),
};

export const WithCards: Story = {
  render: () => (
    <List
      items={cardItems}
      renderItem={(item: CardItem) => (
        <Card
          title={item.title}
          description={item.description}
          status={item.status}
          statusVariant={
            item.status === "Active"
              ? "success"
              : item.status === "In progress"
                ? "warning"
                : "default"
          }
        />
      )}
    />
  ),
};

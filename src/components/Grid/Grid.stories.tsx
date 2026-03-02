import type { Meta, StoryObj } from "@storybook/react";
import Grid from "./Grid";
import Card from "../Card/Card";

type Item = { id: string; title: string; description: string; status?: string };

const items: Item[] = [
  { id: "1", title: "Project Alpha", description: "Dashboard and analytics.", status: "Active" },
  { id: "2", title: "Project Beta", description: "Internal tools and admin.", status: "In progress" },
  { id: "3", title: "Project Gamma", description: "Mobile app and API.", status: "Planned" },
];

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Responsive grid that renders items via renderCard. Columns 1–4, optional keyExtractor and gridClassName.",
      },
    },
  },
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4] },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => (
    <Grid<Item>
      items={items}
      columns={3}
      keyExtractor={(item) => item.id}
      renderCard={(item) => (
        <Card
          title={item.title}
          description={item.description}
          status={item.status}
        />
      )}
    />
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Grid<Item>
      items={items}
      columns={2}
      keyExtractor={(item) => item.id}
      renderCard={(item) => (
        <Card title={item.title} description={item.description} status={item.status} />
      )}
    />
  ),
};

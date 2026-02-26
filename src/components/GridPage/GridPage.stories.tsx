import type { Meta, StoryObj } from "@storybook/react";
import { LayoutGrid, Plus } from "lucide-react";
import GridPage from "./GridPage";
import Card from "../Card/Card";
import Button from "../Button/Button";

type Project = { id: string; title: string; description: string; status?: string };

const projects: Project[] = [
  { id: "1", title: "Project Alpha", description: "Dashboard and analytics.", status: "Active" },
  { id: "2", title: "Project Beta", description: "Internal tools and admin.", status: "In progress" },
  { id: "3", title: "Project Gamma", description: "Mobile app and API.", status: "Planned" },
];

const meta: Meta<typeof GridPage> = {
  title: "Components/GridPage",
  component: GridPage,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Generic page layout with optional PageHeader and a responsive grid. Use **renderCard** to render each item (e.g. with Card). Supports loading, empty state, and 1–4 columns. Reusable from any project.",
      },
    },
  },
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4] },
  },
};

export default meta;

type Story = StoryObj<typeof GridPage>;

export const WithCards: Story = {
  render: () => (
    <GridPage<Project>
      title="Projects"
      description="Manage your projects"
      icon={LayoutGrid}
      actions={<Button icon={Plus}>New project</Button>}
      items={projects}
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
    <GridPage<Project>
      title="Projects"
      items={projects}
      columns={2}
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

export const Empty: Story = {
  render: () => (
    <GridPage<Project>
      title="Projects"
      items={[]}
      emptyTitle="No projects yet"
      emptyDescription="Create your first project to get started."
      renderCard={() => null}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <GridPage<Project>
      title="Projects"
      items={projects}
      loading
      renderCard={(item) => (
        <Card title={item.title} description={item.description} />
      )}
    />
  ),
};

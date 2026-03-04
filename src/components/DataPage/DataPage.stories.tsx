import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LayoutGrid, List as ListIcon, Plus } from "lucide-react";
import DataPage from "./DataPage";
import Card from "../Card/Card";
import Button from "../Button/Button";

type Project = { id: string; title: string; description: string; status?: string };

const projects: Project[] = [
  { id: "1", title: "Project Alpha", description: "Dashboard and analytics.", status: "Active" },
  { id: "2", title: "Project Beta", description: "Internal tools and admin.", status: "In progress" },
  { id: "3", title: "Project Gamma", description: "Mobile app and API.", status: "Planned" },
];

const meta: Meta<typeof DataPage> = {
  title: "Components/DataPage",
  component: DataPage,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Unified page layout for displaying data as a grid or list. Includes optional PageHeader, loading/empty states, and pagination. Use `layout=\"grid\"` with `renderCard` or `layout=\"list\"` (default) with `renderItem`.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataPage>;

export const GridLayout: Story = {
  render: () => (
    <DataPage<Project>
      layout="grid"
      title="Projects"
      description="Manage your projects"
      icon={LayoutGrid}
      actions={<Button icon={Plus}>New project</Button>}
      items={projects}
      columns={3}
      keyExtractor={(item) => item.id}
      renderCard={(item) => (
        <Card title={item.title} description={item.description} status={item.status} />
      )}
    />
  ),
};

export const ListLayout: Story = {
  render: () => (
    <DataPage<Project>
      layout="list"
      title="Projects"
      description="Browse all projects"
      icon={ListIcon}
      actions={<Button icon={Plus}>Add</Button>}
      items={projects}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <Card title={item.title} description={item.description} layout="horizontal" />
      )}
    />
  ),
};

export const GridEmpty: Story = {
  render: () => (
    <DataPage<Project>
      layout="grid"
      title="Projects"
      items={[]}
      emptyTitle="No projects yet"
      emptyDescription="Create your first project to get started."
      renderCard={() => null}
    />
  ),
};

export const GridLoading: Story = {
  render: () => (
    <DataPage<Project>
      layout="grid"
      title="Projects"
      items={projects}
      loading
      renderCard={(item) => <Card title={item.title} description={item.description} />}
    />
  ),
};

export const ListEmpty: Story = {
  render: () => (
    <DataPage<Project>
      layout="list"
      title="Items"
      items={[]}
      emptyTitle="No items"
      emptyDescription="Add items to get started."
      renderItem={() => null}
    />
  ),
};

export const ListLoading: Story = {
  render: () => (
    <DataPage<Project>
      layout="list"
      title="Items"
      items={projects}
      loading
      renderItem={(item) => (
        <Card title={item.title} description={item.description} layout="horizontal" />
      )}
    />
  ),
};

const allProjects: Project[] = [
  ...projects,
  { id: "4", title: "Project Delta", description: "API gateway.", status: "Active" },
  { id: "5", title: "Project Epsilon", description: "Data pipeline.", status: "Planned" },
  { id: "6", title: "Project Zeta", description: "Monitoring.", status: "In progress" },
];

function GridWithPagination() {
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const start = (page - 1) * pageSize;
  const pageItems = allProjects.slice(start, start + pageSize);
  return (
    <DataPage<Project>
      layout="grid"
      title="Projects"
      description="Browse with pagination"
      icon={LayoutGrid}
      items={pageItems}
      columns={2}
      keyExtractor={(item) => item.id}
      renderCard={(item) => (
        <Card title={item.title} description={item.description} status={item.status} />
      )}
      totalPages={3}
      currentPage={page}
      onPageChange={setPage}
    />
  );
}

export const WithPagination: Story = {
  render: () => <GridWithPagination />,
};

import type { Meta, StoryObj } from "@storybook/react";
import { LayoutDashboard } from "lucide-react";
import Button from "../Button/Button";
import PageHeader from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Page title with optional description and actions (e.g. buttons). Use at the top of a page.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "Page title",
    description: "Optional description for the page.",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Settings",
    subtitle: "Manage your account",
    description: "Update your profile and preferences.",
  },
};

export const WithIcon: Story = {
  args: {
    title: "Dashboard",
    description: "Overview of your activity.",
    icon: LayoutDashboard,
  },
};

export const WithActions: Story = {
  args: {
    title: "Projects",
    description: "Manage your projects.",
    actions: <Button variant="primary">New project</Button>,
  },
};

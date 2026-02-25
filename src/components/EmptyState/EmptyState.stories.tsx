import type { Meta, StoryObj } from "@storybook/react";
import { Inbox } from "lucide-react";
import EmptyState from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Empty state message with title and optional description. Use when a list or section has no data.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No items yet",
    description: "Get started by creating your first item.",
  },
};

export const WithIcon: Story = {
  args: {
    title: "No messages",
    description: "Your inbox is empty.",
    icon: Inbox,
  },
};

export const WithPrimaryAction: Story = {
  args: {
    title: "No projects",
    description: "Create a project to get started.",
    primaryAction: { label: "Create project", onClick: () => {} },
  },
};

export const WithBothActions: Story = {
  args: {
    title: "No results",
    description: "Try adjusting your filters or search.",
    primaryAction: { label: "Clear filters", onClick: () => {} },
    secondaryAction: { label: "Go back", onClick: () => {} },
  },
};

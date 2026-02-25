import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Status or label badge with variants (default, success, warning, error, info).",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info", "neutral"],
    },
    pill: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge", variant: "default" },
};

export const Success: Story = {
  args: { children: "Active", variant: "success" },
};

export const Warning: Story = {
  args: { children: "Pending", variant: "warning" },
};

export const Error: Story = {
  args: { children: "Failed", variant: "error" },
};

export const Info: Story = {
  args: { children: "Info", variant: "info" },
};

export const NotPill: Story = {
  args: { children: "Rectangle badge", variant: "default", pill: false },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

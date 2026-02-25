import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Trash2 } from "lucide-react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Button with variants (primary, secondary, danger, ghost, success, outline), sizes, optional icon (left/right), and loading state.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "success", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    children: "Delete",
    variant: "danger",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Success: Story = {
  args: {
    children: "Save",
    variant: "success",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Add item",
    variant: "primary",
    icon: Plus,
    iconPosition: "left",
  },
};

export const IconRight: Story = {
  args: {
    children: "Delete",
    variant: "danger",
    icon: Trash2,
    iconPosition: "right",
  },
};

export const Loading: Story = {
  args: {
    children: "Saving...",
    loading: true,
    variant: "primary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "primary",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="success">Success</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

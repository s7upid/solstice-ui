import type { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Progress bar showing value against max. Variants (default, success, warning, error), sizes, and optional percentage label.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full min-w-[240px] max-w-[400px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100 } },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    showLabel: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 45, max: 100, showLabel: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={40} variant="default" showLabel />
      <Progress value={80} variant="success" showLabel />
      <Progress value={60} variant="warning" showLabel />
      <Progress value={20} variant="error" showLabel />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={50} size="sm" showLabel />
      <Progress value={50} size="md" showLabel />
      <Progress value={50} size="lg" showLabel />
    </div>
  ),
};

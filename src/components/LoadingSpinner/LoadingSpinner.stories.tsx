import type { Meta, StoryObj } from "@storybook/react";
import LoadingSpinner from "./LoadingSpinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Loading spinner with optional message. Sizes: sm, md, lg. Use for loading states.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    showMessage: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: "Loading data...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <LoadingSpinner size="sm" text="Small" />
      <LoadingSpinner size="md" text="Medium" />
      <LoadingSpinner size="lg" text="Large" />
    </div>
  ),
};

export const NoMessage: Story = {
  args: {
    showMessage: false,
  },
};

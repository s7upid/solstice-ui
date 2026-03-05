import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Inline alert with title and message. Variants: info, success, warning, error. Optional dismissible with onDismiss.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    dismissible: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Alert variant="info" title="Info">Informational message.</Alert>
      <Alert variant="success" title="Success">Action completed.</Alert>
      <Alert variant="warning" title="Warning">Please review.</Alert>
      <Alert variant="error" title="Error">Something went wrong.</Alert>
    </div>
  ),
};

export const NoTitle: Story = {
  args: {
    variant: "info",
    children: "A short message without a title.",
  },
};

export const Dismissible: Story = {
  args: {
    variant: "info",
    title: "Dismissible",
    children: "You can close this alert.",
    dismissible: true,
    onDismiss: () => {},
  },
};

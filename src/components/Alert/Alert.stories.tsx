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

export const Info: Story = {
  args: {
    variant: "info",
    title: "Info",
    children: "This is an informational message.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your changes have been saved.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please review before continuing.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "Something went wrong. Please try again.",
  },
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

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Alert variant="info" title="Info" children="Informational message." />
      <Alert variant="success" title="Success" children="Action completed." />
      <Alert variant="warning" title="Warning" children="Please review." />
      <Alert variant="error" title="Error" children="Something went wrong." />
    </div>
  ),
};

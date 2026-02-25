import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "../Button/Button";
import ConfirmationDialog from "./ConfirmationDialog";

const meta: Meta<typeof ConfirmationDialog> = {
  title: "Components/ConfirmationDialog",
  component: ConfirmationDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Confirm/cancel dialog with title and message. Variants: danger, warning, info. Optional loading state and custom button text.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["danger", "warning", "info"] },
    isLoading: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmationDialog>;

function DialogDemo({ variant }: { variant: "danger" | "warning" | "info" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="danger">
        Open dialog
      </Button>
      <ConfirmationDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Confirm action"
        message="Are you sure you want to proceed? This action cannot be undone."
        confirmText="Confirm"
        cancelText="Cancel"
        variant={variant}
      />
    </>
  );
}

export const Danger: Story = {
  render: () => <DialogDemo variant="danger" />,
};

export const Warning: Story = {
  render: () => <DialogDemo variant="warning" />,
};

export const Info: Story = {
  render: () => <DialogDemo variant="info" />,
};

export const DangerMessage: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Delete item?",
    message: "This action cannot be undone. The item will be permanently removed.",
    confirmText: "Delete",
    cancelText: "Cancel",
    variant: "danger",
  },
};

export const WarningMessage: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Unsaved changes",
    message: "You have unsaved changes. Do you want to save before leaving?",
    confirmText: "Save",
    cancelText: "Discard",
    variant: "warning",
  },
};

export const InfoMessage: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Information",
    message: "This will update your preferences. You can change them later.",
    confirmText: "Continue",
    cancelText: "Cancel",
    variant: "info",
  },
};

export const Loading: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Deleting...",
    message: "Please wait.",
    isLoading: true,
  },
};

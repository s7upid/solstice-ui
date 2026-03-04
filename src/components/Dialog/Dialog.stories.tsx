import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";
import { XCircle, Trash2, Save, Info } from "lucide-react";
import Dialog from "./Dialog";
import Button from "../Button/Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Modal dialog with title, content, optional footer or footerActions (buttons with optional icons). Sizes: sm, md, lg, full. Close via button, backdrop click, or Escape.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "full"] },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

const DialogWithButton = ({
  children,
  useFooterActions,
  ...props
}: Partial<Story["args"]> & { children?: ReactNode; useFooterActions?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Dialog title"
        footer={
          useFooterActions
            ? undefined
            : (
                <>
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setOpen(false)}>Confirm</Button>
                </>
              )
        }
        footerActions={
          useFooterActions
            ? [
                { label: "Cancel", onClick: () => setOpen(false), variant: "ghost" as const, icon: XCircle },
                { label: "Confirm", onClick: () => setOpen(false), icon: Trash2 },
              ]
            : undefined
        }
        {...props}
      >
        {children ?? <p>This is the dialog content. You can put any React nodes here.</p>}
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <DialogWithButton>
      <p>Dialog body content goes here.</p>
    </DialogWithButton>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <DialogWithButton size="sm" />
      <DialogWithButton size="md" />
      <DialogWithButton size="lg" />
    </div>
  ),
};

function WithoutTitleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open (no title)</Button>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <p>Content only, with close button in header.</p>
      </Dialog>
    </>
  );
}

export const WithoutTitle: Story = {
  render: () => <WithoutTitleDemo />,
};

export const LongContent: Story = {
  render: () => (
    <DialogWithButton title="Scrollable content">
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>Paragraph {i + 1}. Lorem ipsum dolor sit amet.</p>
      ))}
    </DialogWithButton>
  ),
};

export const WithFooterActionsAndIcons: Story = {
  render: () => (
    <DialogWithButton useFooterActions title="Confirm action">
      <p>Are you sure you want to proceed? This action cannot be undone.</p>
    </DialogWithButton>
  ),
};

function ConfirmationVariantsDemo() {
  const [open, setOpen] = useState<"danger" | "warning" | "info" | null>(null);
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button variant="danger" onClick={() => setOpen("danger")}>
          Danger
        </Button>
        <Button variant="outline" onClick={() => setOpen("warning")}>
          Warning
        </Button>
        <Button variant="secondary" onClick={() => setOpen("info")}>
          Info
        </Button>
      </div>
      <Dialog
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        title={open === "danger" ? "Delete item?" : open === "warning" ? "Unsaved changes" : "Information"}
        footerActions={
          open === "danger"
            ? [
                { label: "Cancel", onClick: () => setOpen(null), variant: "ghost", icon: XCircle },
                { label: "Delete", onClick: () => setOpen(null), variant: "danger", icon: Trash2 },
              ]
            : open === "warning"
              ? [
                  { label: "Discard", onClick: () => setOpen(null), variant: "ghost", icon: XCircle },
                  { label: "Save", onClick: () => setOpen(null), icon: Save },
                ]
              : [
                  { label: "Cancel", onClick: () => setOpen(null), variant: "ghost", icon: XCircle },
                  { label: "Continue", onClick: () => setOpen(null), icon: Info },
                ]
        }
      >
        <p>
          {open === "danger"
            ? "This action cannot be undone. The item will be permanently removed."
            : open === "warning"
              ? "You have unsaved changes. Do you want to save before leaving?"
              : "This will update your preferences. You can change them later."}
        </p>
      </Dialog>
    </>
  );
}

export const ConfirmationVariants: Story = {
  render: () => <ConfirmationVariantsDemo />,
};

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Dialog from "./Dialog";
import Button from "../Button/Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Modal dialog with title, content, optional footer. Sizes: sm, md, lg, full. Close via button, backdrop click, or Escape.",
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
  ...props
}: Partial<Story["args"]> & { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Dialog title"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
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

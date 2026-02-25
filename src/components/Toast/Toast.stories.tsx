import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "../Button/Button";
import Toast from "./Toast";
import type { ToastItem } from "./Toast";

const sampleToasts: ToastItem[] = [
  { id: "1", type: "success", title: "Saved", message: "Your changes have been saved." },
  { id: "2", type: "error", title: "Error", message: "Something went wrong." },
  { id: "3", type: "info", title: "Info", message: "Here is some information." },
  { id: "4", type: "warning", title: "Warning", message: "Please review this." },
];

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Toast notifications. Pass toasts array and onRemove. Types: success, error, info, warning. Optional duration, auto-dismiss, and expandable long messages.",
      },
    },
  },
  argTypes: {
    autoDismiss: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

function ToastDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const add = (type: ToastItem["type"]) => {
    setToasts((t) => [
      ...t,
      {
        id: String(Date.now()),
        type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
        message: "This toast was added by the demo.",
      },
    ]);
  };
  const remove = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button variant="success" onClick={() => add("success")}>Add success</Button>
        <Button variant="danger" onClick={() => add("error")}>Add error</Button>
        <Button variant="secondary" onClick={() => add("info")}>Add info</Button>
        <Button variant="outline" onClick={() => add("warning")}>Add warning</Button>
      </div>
      <Toast toasts={toasts} onRemove={remove} />
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const WithSampleToasts: Story = {
  args: {
    toasts: sampleToasts,
    onRemove: () => {},
    autoDismiss: false,
  },
};

export const SingleToast: Story = {
  args: {
    toasts: [sampleToasts[0]],
    onRemove: () => {},
    autoDismiss: false,
  },
};

export const SuccessOnly: Story = {
  args: {
    toasts: [sampleToasts[0]],
    onRemove: () => {},
    autoDismiss: false,
  },
};

export const ErrorOnly: Story = {
  args: {
    toasts: [sampleToasts[1]],
    onRemove: () => {},
    autoDismiss: false,
  },
};

export const InfoOnly: Story = {
  args: {
    toasts: [sampleToasts[2]],
    onRemove: () => {},
    autoDismiss: false,
  },
};

export const WarningOnly: Story = {
  args: {
    toasts: [sampleToasts[3]],
    onRemove: () => {},
    autoDismiss: false,
  },
};

import type { Meta, StoryObj } from "@storybook/react";
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
    layout: "fullscreen",
    docs: {
      description: {
        component: "Toast notifications. Pass toasts array and onRemove. Types: success, error, info, warning. Optional duration, auto-dismiss, and expandable long messages.",
      },
    },
  },
  argTypes: {
    autoDismiss: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const AllTypes: Story = {
  args: {
    toasts: sampleToasts,
    onRemove: () => {},
    autoDismiss: false,
  },
};

export const Success: Story = {
  args: {
    toasts: [sampleToasts[0]],
    onRemove: () => {},
    autoDismiss: false,
  },
};

export const Error: Story = {
  args: {
    toasts: [sampleToasts[1]],
    onRemove: () => {},
    autoDismiss: false,
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Mail } from "lucide-react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Text input with optional label, error message, required indicator, and left/right icon (LucideIcon or React node).",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    id: "email",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    error: "Please enter a valid email address",
    id: "email-error",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Email",
    icon: Mail,
    placeholder: "you@example.com",
    id: "email-icon",
  },
};

export const Required: Story = {
  args: {
    label: "Name",
    required: true,
    id: "name",
  },
};

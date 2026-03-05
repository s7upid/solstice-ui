import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Mail, Search, Eye, EyeOff } from "lucide-react";
import Input from "./Input";
import Button from "../Button/Button";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text input with optional label, error message, required indicator, left/right icon (LucideIcon or React node), and endAdornment slot (e.g. button at the end).",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    iconPosition: { control: "select", options: ["left", "right"] },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
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

export const WithIconLeft: Story = {
  args: {
    label: "Email",
    icon: Mail,
    iconPosition: "left",
    placeholder: "you@example.com",
    id: "email-icon-left",
  },
};

export const WithIconRight: Story = {
  args: {
    label: "Search",
    icon: Search,
    iconPosition: "right",
    placeholder: "Search...",
    id: "search-icon-right",
  },
};

function PasswordWithToggle() {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      label="Password"
      type={visible ? "text" : "password"}
      placeholder="Enter password"
      id="password-toggle"
      endAdornment={
        <Button
          variant="ghost"
          size="sm"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      }
    />
  );
}

export const PasswordToggle: Story = {
  render: () => <PasswordWithToggle />,
};

export const WithIconAndEndAdornment: Story = {
  args: {
    label: "Search",
    icon: Search,
    iconPosition: "left",
    placeholder: "Search users...",
    id: "search-with-btn",
    endAdornment: (
      <Button variant="primary" size="sm">
        Search
      </Button>
    ),
  },
};

export const Required: Story = {
  args: {
    label: "Name",
    required: true,
    id: "name",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    disabled: true,
    id: "email-disabled",
  },
};

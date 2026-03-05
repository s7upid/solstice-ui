import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import Form from "./Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Form layout wrapper with onSubmit. Renders a styled form element; pass children (inputs, buttons, etc.).",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

function PasswordInput({ id = "pass" }: { id?: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      label="Password"
      type={visible ? "text" : "password"}
      placeholder="••••••"
      id={id}
      icon={Lock}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}
        >
          {visible ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
        </button>
      }
    />
  );
}

export const Login: Story = {
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Input label="Email" placeholder="you@example.com" id="email" icon={Mail} />
      <PasswordInput />
      <Button type="submit" variant="primary">Sign in</Button>
    </Form>
  ),
};

export const Registration: Story = {
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Input label="Full name" placeholder="John Doe" id="name" icon={User} required />
      <Input label="Email" placeholder="you@example.com" id="reg-email" icon={Mail} required />
      <PasswordInput id="reg-pass" />
      <Dropdown
        label="Role"
        options={[
          { value: "developer", label: "Developer" },
          { value: "designer", label: "Designer" },
          { value: "manager", label: "Manager" },
        ]}
        placeholderOption="Select role..."
      />
      <Button type="submit" variant="primary">Create account</Button>
    </Form>
  ),
};

export const SimpleEdit: Story = {
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Input label="Name" id="edit-name" icon={User} />
      <Button type="submit" variant="primary">Save</Button>
    </Form>
  ),
};

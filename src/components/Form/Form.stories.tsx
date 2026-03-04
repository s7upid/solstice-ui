import type { Meta, StoryObj } from "@storybook/react";
import Form from "./Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

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

export const Default: Story = {
  args: {
    children: (
      <>
        <Input label="Email" placeholder="you@example.com" id="email" />
        <Input label="Password" type="password" placeholder="••••••" id="pass" />
        <Button type="submit" variant="primary">Submit</Button>
      </>
    ),
  },
};

export const WithSubmit: Story = {
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Input label="Name" id="name" />
      <Button type="submit" variant="primary">Save</Button>
    </Form>
  ),
};

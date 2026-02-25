import type { Meta, StoryObj } from "@storybook/react";
import ThemeToggle from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Button to toggle light/dark theme. Use inside ThemeProvider, or pass theme and onToggle for controlled use. Syncs .dark class on document root.",
      },
    },
  },
  argTypes: {
    theme: { control: "select", options: ["light", "dark"] },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Light: Story = {
  args: { theme: "light" },
};

export const Dark: Story = {
  args: { theme: "dark" },
};

export const WithCallback: Story = {
  args: {
    theme: "light",
    onToggle: () => alert("Toggle clicked"),
  },
};

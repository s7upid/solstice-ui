import type { Meta, StoryObj } from "@storybook/react";
import DangerZone from "./DangerZone";

const meta: Meta<typeof DangerZone> = {
  title: "Components/DangerZone",
  component: DangerZone,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Section for destructive actions (e.g. delete account). Title, description, and action button. Optional disabled state.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof DangerZone>;

export const Default: Story = {
  args: {
    title: "Delete account",
    description: "Once you delete your account, there is no going back. Please be certain.",
    buttonLabel: "Delete account",
    onConfirm: () => alert("Confirmed"),
  },
};

export const Disabled: Story = {
  args: {
    title: "Remove workspace",
    description: "This action is currently disabled.",
    buttonLabel: "Remove",
    onConfirm: () => {},
    disabled: true,
  },
};

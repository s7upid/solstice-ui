import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Select-style dropdown with options (value/label). Optional label, placeholder, and controlled value/onChange.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    options,
    placeholderOption: "Select...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Choose option",
    options,
    value: "b",
    onValueChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    label: "Country",
    options,
    error: "This field is required",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Region",
    options,
    helperText: "Select your region for shipping.",
  },
};

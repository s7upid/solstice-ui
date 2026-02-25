import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchInput from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Search field with placeholder and optional label. Controlled via value and onChange. Clears on Escape.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

function SearchInputWrapper() {
  const [value, setValue] = useState("");
  return (
    <SearchInput
      value={value}
      onChange={setValue}
      placeholder="Search..."
    />
  );
}

export const Default: Story = {
  render: () => <SearchInputWrapper />,
};

export const WithValue: Story = {
  args: {
    value: "query",
    onChange: () => {},
    placeholder: "Search items...",
  },
};

export const Disabled: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "Search...",
    disabled: true,
  },
};

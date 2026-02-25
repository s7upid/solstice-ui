import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Checkbox from "./Checkbox";
import type { CheckboxState } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Checkbox with three states: unchecked, checked, indeterminate. Use triState to cycle through all three or only two. Supports label, description, and error.",
      },
    },
  },
  argTypes: {
    state: { control: "select", options: [false, true, "indeterminate"] },
    triState: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    state: false,
    label: "Option",
  },
};

export const Checked: Story = {
  args: {
    state: true,
    label: "Option",
  },
};

export const Indeterminate: Story = {
  args: {
    state: "indeterminate",
    label: "Some items selected",
  },
};

export const WithDescription: Story = {
  args: {
    state: false,
    label: "Enable notifications",
    description: "Receive email when someone comments.",
  },
};

export const Disabled: Story = {
  args: {
    state: false,
    label: "Disabled unchecked",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    state: true,
    label: "Disabled checked",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    state: false,
    label: "Accept terms",
    error: "You must accept the terms to continue.",
  },
};

export const BinaryOnly: Story = {
  args: {
    state: false,
    triState: false,
    label: "Binary checkbox (no indeterminate)",
  },
};

export const InteractiveTriState: Story = {
  render: function InteractiveTriState() {
    const [state, setState] = useState<CheckboxState>(false);
    return (
      <div className="space-y-2">
        <Checkbox
          state={state}
          onStateChange={setState}
          triState={true}
          label="Click to cycle: unchecked → checked → indeterminate → unchecked"
        />
        <p className="text-sm text-gray-500">
          Current state: <strong>{String(state)}</strong>
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox state={false} label="Unchecked" />
      <Checkbox state={true} label="Checked" />
      <Checkbox state="indeterminate" label="Indeterminate" />
    </div>
  ),
};

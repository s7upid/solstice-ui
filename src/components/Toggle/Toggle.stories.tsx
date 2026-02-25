import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Compass, Bell, BellOff, Star } from "lucide-react";
import Toggle from "./Toggle";
import type { ToggleState } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Unified toggle: **button** variant (pressed/unpressed with label/icon) or **switch** variant (track+thumb, optional tri-state off/indeterminate/on). Use `variant=\"button\"` with label, icon, buttonVariant, size; use `variant=\"switch\"` with state, onStateChange, triState, labels.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["button", "switch"] },
    buttonVariant: { control: "select", options: ["primary", "secondary", "outline", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    iconPosition: { control: "select", options: ["left", "right"] },
    state: { control: "select", options: ["off", "indeterminate", "on"] },
    triState: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

/* ----- Button variant stories ----- */
export const ButtonWithLabel: Story = {
  args: {
    label: "Explore",
    defaultPressed: false,
  },
};

export const ButtonPressed: Story = {
  args: {
    label: "On",
    labelPressed: "Off",
    defaultPressed: true,
  },
};

export const ButtonWithIcon: Story = {
  args: {
    label: "Explore",
    icon: Compass,
    defaultPressed: false,
  },
};

export const ButtonIconOnly: Story = {
  args: {
    icon: Bell,
    iconPressed: BellOff,
    "aria-label": "Notifications",
    defaultPressed: false,
  },
};

export const ButtonAllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Toggle variant="button" buttonVariant="primary" label="Primary" defaultPressed={false} />
      <Toggle variant="button" buttonVariant="primary" label="Primary" defaultPressed />
      <Toggle variant="button" buttonVariant="secondary" label="Secondary" defaultPressed={false} />
      <Toggle variant="button" buttonVariant="outline" label="Outline" defaultPressed={false} />
      <Toggle variant="button" buttonVariant="ghost" label="Ghost" defaultPressed={false} />
    </div>
  ),
};

export const ButtonSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Toggle variant="button" size="sm" label="Small" icon={Star} />
      <Toggle variant="button" size="md" label="Medium" icon={Star} />
      <Toggle variant="button" size="lg" label="Large" icon={Star} />
    </div>
  ),
};

/* ----- Switch variant stories ----- */
/** Click the switch to cycle: off → on → indeterminate → off. Layout stays fixed. */
export const SwitchInteractive: Story = {
  render: function SwitchInteractive() {
    const [state, setState] = useState<ToggleState>("off");
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click the switch to cycle through the three states.
        </p>
        <Toggle
          variant="switch"
          state={state}
          onStateChange={setState}
          triState
          labels={{ off: "Off", indeterminate: "Some", on: "All" }}
          aria-label="Tri-state filter"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[1.5rem] flex items-center">
          Current state:{" "}
          <strong
            className="text-gray-900 dark:text-gray-100 inline-block min-w-[8.5rem]"
            aria-live="polite"
          >
            {state}
          </strong>
        </p>
      </div>
    );
  },
};

export const SwitchDefault: Story = {
  args: {
    variant: "switch",
    state: "off",
    "aria-label": "Toggle",
  },
};

export const SwitchOff: Story = {
  args: {
    variant: "switch",
    state: "off",
    "aria-label": "Toggle",
  },
};

export const SwitchIndeterminate: Story = {
  args: {
    variant: "switch",
    state: "indeterminate",
    "aria-label": "Toggle",
  },
};

export const SwitchOn: Story = {
  args: {
    variant: "switch",
    state: "on",
    "aria-label": "Toggle",
  },
};

export const SwitchWithLabels: Story = {
  args: {
    variant: "switch",
    state: "off",
    labels: { off: "No", indeterminate: "Some", on: "All" },
    "aria-label": "Filter scope",
  },
};

export const SwitchTwoState: Story = {
  args: {
    variant: "switch",
    state: "off",
    triState: false,
    "aria-label": "Toggle",
  },
};

export const SwitchDisabled: Story = {
  args: {
    variant: "switch",
    state: "on",
    disabled: true,
    "aria-label": "Toggle",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import DateTimePicker from "./DateTimePicker";

const meta: Meta<typeof DateTimePicker> = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Date, time, or datetime-local input with optional label, error, required, min/max, and value/onChange. Modes: date, time, datetime.",
      },
    },
  },
  argTypes: {
    mode: { control: "select", options: ["date", "time", "datetime"] },
  },
};

export default meta;

type Story = StoryObj<typeof DateTimePicker>;

export const DateTime: Story = {
  args: {
    mode: "datetime",
    label: "Date and time",
    placeholder: "Select date and time",
  },
};

export const DateOnly: Story = {
  args: {
    mode: "date",
    label: "Date",
  },
};

export const TimeOnly: Story = {
  args: {
    mode: "time",
    label: "Time",
  },
};

export const WithValue: Story = {
  args: {
    mode: "datetime",
    label: "Scheduled at",
    value: "2025-02-24T14:30",
  },
};

export const WithMinMax: Story = {
  args: {
    mode: "date",
    label: "Birth date",
    min: "1900-01-01",
    max: "2025-12-31",
  },
};

export const Required: Story = {
  args: {
    mode: "date",
    label: "Due date",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    mode: "datetime",
    label: "Appointment",
    error: "Please select a future date and time.",
  },
};

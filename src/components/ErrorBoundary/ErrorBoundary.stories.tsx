import type { Meta, StoryObj } from "@storybook/react";
import ErrorBoundary from "./ErrorBoundary";

const ThrowError = () => {
  throw new Error("Simulated error for demo");
};

const meta: Meta<typeof ErrorBoundary> = {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Catches React errors and shows a fallback UI (default or custom). Optional onError, showDetails, resetKeys/resetOnPropsChange, homeUrl. Try Again, Refresh, Go Home actions.",
      },
    },
  },
  argTypes: {
    showDetails: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  args: {
    children: <p>This content renders normally. Use the story below to see the fallback.</p>,
  },
};

export const WithError: Story = {
  args: {
    children: <ThrowError />,
    showDetails: true,
  },
};

export const CustomFallback: Story = {
  args: {
    children: <ThrowError />,
    fallback: (
      <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100">
        <strong>Something went wrong.</strong>
        <p className="m-0 mt-2">This is a custom fallback UI.</p>
      </div>
    ),
  },
};

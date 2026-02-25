import type { Meta, StoryObj } from "@storybook/react";
import ModalPortal from "./ModalPortal";

const meta: Meta<typeof ModalPortal> = {
  title: "Components/ModalPortal",
  component: ModalPortal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Renders children into document.body (e.g. for modals). Use as wrapper for overlay content.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ModalPortal>;

export const Default: Story = {
  args: {
    children: (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg max-w-[400px] shadow-xl">
          <h3 className="mt-0 mb-2 text-lg font-semibold">Modal content</h3>
          <p className="m-0 text-sm">
            This content is rendered via ModalPortal (React portal into document.body).
          </p>
        </div>
      </div>
    ),
  },
};

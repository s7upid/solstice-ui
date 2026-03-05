import type { Meta, StoryObj } from "@storybook/react";
import { Settings, User, Compass } from "lucide-react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Content card: title, description, optional icon/avatar, status badge, details, stats, actions. Use **onClick** to make the whole card clickable (e.g. open details); action buttons still fire only when clicked. Set **imageSrc** for image layout (text left, image right, optional action button). Layout variants: default, vertical, horizontal.",
      },
    },
  },
  argTypes: {
    layout: { control: "select", options: ["default", "vertical", "horizontal"] },
    statusVariant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Simple: Story = {
  args: {
    title: "Card title",
    description: "Optional short description for the card.",
  },
};

export const WithImage: Story = {
  args: {
    title: "CyberNexus",
    description:
      "Connecting minds in the digital realm through advanced neural interfaces.",
    imageSrc: "https://picsum.photos/400/300?random=1",
    imageAlt: "Card image",
    actionLabel: "Explore",
    actionIcon: Compass,
    onAction: () => {},
  },
};

export const WithIcon: Story = {
  args: {
    title: "Settings",
    description: "Manage your preferences.",
    icon: Settings,
  },
};

export const WithActions: Story = {
  args: {
    title: "User profile",
    description: "Edit your account details.",
    icon: User,
    actions: [
      { label: "Edit", onClick: () => {}, variant: "primary" },
      { label: "Cancel", onClick: () => {}, variant: "secondary" },
    ],
  },
};

export const Clickable: Story = {
  args: {
    title: "Project Alpha",
    description: "Click anywhere on the card to open details. Action buttons (Edit, Archive) do not trigger the card click.",
    status: "Active",
    statusVariant: "success",
    onClick: () => alert("Card clicked — open details view"),
    actions: [
      { label: "Edit", onClick: () => alert("Edit clicked") },
      { label: "Archive", onClick: () => alert("Archive clicked") },
    ],
  },
};

export const Layouts: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Card title="Default layout" description="Standard card layout." />
      <Card title="Vertical layout" description="Stacked vertically." layout="vertical" />
      <Card title="Horizontal layout" description="Side by side." layout="horizontal" />
    </div>
  ),
};

export const AllStatusVariants: Story = {
  render: () => (
    <div className="grid gap-4 max-w-md">
      <Card title="Default" status="Draft" statusVariant="default" />
      <Card title="Success" status="Active" statusVariant="success" />
      <Card title="Warning" status="Pending" statusVariant="warning" />
      <Card title="Error" status="Failed" statusVariant="error" />
      <Card title="Info" status="Info" statusVariant="info" />
    </div>
  ),
};

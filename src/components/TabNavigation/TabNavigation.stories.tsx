import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";
import { Home, Settings, User } from "lucide-react";
import TabNavigation from "./TabNavigation";
import type { TabItem } from "./TabNavigation";

const tabs: TabItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

const meta: Meta<typeof TabNavigation> = {
  title: "Components/TabNavigation",
  component: TabNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Tab bar with activeTab and onTabChange. Optional contentByTabId to render content below tabs. Variants: default, pills, underline. Supports icons, badges, permissions, disabled.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "pills", "underline"] },
  },
};

export default meta;

type Story = StoryObj<typeof TabNavigation>;

const contentByTabId: Record<string, ReactNode> = {
  home: (
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Home</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        This is the home tab content. Use <code>contentByTabId</code> to pass content for each tab.
      </p>
    </div>
  ),
  profile: (
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Profile</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Profile settings and user info go here.
      </p>
    </div>
  ),
  settings: (
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Settings</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Application settings and preferences.
      </p>
    </div>
  ),
};

function TabNavigationWrapper({ withContent = true }: { withContent?: boolean }) {
  const [active, setActive] = useState("home");
  return (
    <TabNavigation
      tabs={tabs}
      activeTab={active}
      onTabChange={setActive}
      contentByTabId={withContent ? contentByTabId : undefined}
    />
  );
}

export const Default: Story = {
  render: () => <TabNavigationWrapper />,
};

function PillsDemo() {
  const [active, setActive] = useState("home");
  return (
    <TabNavigation
      tabs={tabs}
      activeTab={active}
      onTabChange={setActive}
      variant="pills"
      contentByTabId={contentByTabId}
    />
  );
}

export const Pills: Story = {
  render: () => <PillsDemo />,
};

function UnderlineDemo() {
  const [active, setActive] = useState("home");
  return (
    <TabNavigation
      tabs={tabs}
      activeTab={active}
      onTabChange={setActive}
      variant="underline"
      contentByTabId={contentByTabId}
    />
  );
}

export const Underline: Story = {
  render: () => <UnderlineDemo />,
};

function WithBadgeDemo() {
  const [active, setActive] = useState("home");
  const tabsWithBadge = [...tabs, { id: "alerts", label: "Alerts", badge: "3" }];
  const contentWithAlerts = {
    ...contentByTabId,
    alerts: (
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Alerts</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">You have 3 unread alerts.</p>
      </div>
    ),
  };
  return (
    <TabNavigation
      tabs={tabsWithBadge}
      activeTab={active}
      onTabChange={setActive}
      contentByTabId={contentWithAlerts}
    />
  );
}

export const WithBadge: Story = {
  render: () => <WithBadgeDemo />,
};

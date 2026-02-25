import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TabNavigation from "./TabNavigation";

const MockIcon = () => <span data-testid="tab-icon">I</span>;

const tabs = [
  { id: "home", label: "Home" },
  { id: "settings", label: "Settings" },
  { id: "profile", label: "Profile" },
];

describe("TabNavigation", () => {
  it("returns null when one or zero visible tabs and no content", () => {
    const { container } = render(
      <TabNavigation tabs={[{ id: "a", label: "A" }]} activeTab="a" onTabChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders tab panel content below tabs when contentByTabId provided", () => {
    render(
      <TabNavigation
        tabs={tabs}
        activeTab="home"
        onTabChange={() => {}}
        contentByTabId={{
          home: <div data-testid="home-content">Home content</div>,
          settings: <div data-testid="settings-content">Settings content</div>,
          profile: <div data-testid="profile-content">Profile content</div>,
        }}
      />
    );
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    expect(screen.getByTestId("home-content")).toHaveTextContent("Home content");
    expect(screen.queryByTestId("settings-content")).not.toBeInTheDocument();
  });

  it("switches tab panel when activeTab changes", () => {
    const { rerender } = render(
      <TabNavigation
        tabs={tabs}
        activeTab="home"
        onTabChange={() => {}}
        contentByTabId={{
          home: <span data-testid="panel-home">Home panel</span>,
          settings: <span data-testid="panel-settings">Settings panel</span>,
          profile: <span data-testid="panel-profile">Profile panel</span>,
        }}
      />
    );
    expect(screen.getByTestId("panel-home")).toHaveTextContent("Home panel");
    rerender(
      <TabNavigation
        tabs={tabs}
        activeTab="settings"
        onTabChange={() => {}}
        contentByTabId={{
          home: <span data-testid="panel-home">Home panel</span>,
          settings: <span data-testid="panel-settings">Settings panel</span>,
          profile: <span data-testid="panel-profile">Profile panel</span>,
        }}
      />
    );
    expect(screen.getByTestId("panel-settings")).toHaveTextContent("Settings panel");
  });

  it("renders tabs and calls onTabChange", async () => {
    const onTabChange = vi.fn();
    render(
      <TabNavigation tabs={tabs} activeTab="home" onTabChange={onTabChange} />
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: /settings/i }));
    expect(onTabChange).toHaveBeenCalledWith("settings");
  });

  it("filters by isVisible", () => {
    const tabsWithVisible = [
      { id: "a", label: "A", isVisible: true },
      { id: "b", label: "B", isVisible: false },
      { id: "c", label: "C", isVisible: true },
    ];
    render(
      <TabNavigation tabs={tabsWithVisible} activeTab="a" onTabChange={() => {}} />
    );
    expect(screen.getByRole("tab", { name: /a/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /c/i })).toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /b/i })).not.toBeInTheDocument();
  });

  it("filters by permission when hasPermission returns false", () => {
    const tabsWithPerm = [
      { id: "a", label: "A" },
      { id: "b", label: "B", permission: "admin" },
      { id: "c", label: "C" },
    ];
    const hasPermission = vi.fn((p: string) => p !== "admin");
    render(
      <TabNavigation
        tabs={tabsWithPerm}
        activeTab="a"
        onTabChange={() => {}}
        hasPermission={hasPermission}
      />
    );
    expect(hasPermission).toHaveBeenCalledWith("admin");
    expect(screen.getByRole("tab", { name: /a/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /c/i })).toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /b/i })).not.toBeInTheDocument();
  });

  it("disabled tab does not call onTabChange", async () => {
    const onTabChange = vi.fn();
    const tabsWithDisabled = [
      { id: "a", label: "A" },
      { id: "b", label: "B", disabled: true },
    ];
    render(
      <TabNavigation tabs={tabsWithDisabled} activeTab="a" onTabChange={onTabChange} />
    );
    await userEvent.click(screen.getByRole("tab", { name: /b/i }));
    expect(onTabChange).not.toHaveBeenCalled();
  });

  it("renders icon and badge when multiple tabs", () => {
    render(
      <TabNavigation
        tabs={[
          { id: "a", label: "A" },
          { id: "b", label: "B", icon: MockIcon as never, badge: 3 },
        ]}
        activeTab="a"
        onTabChange={() => {}}
      />
    );
    expect(screen.getByTestId("tab-icon")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"] as const)("renders size %s", (size) => {
    render(
      <TabNavigation
        tabs={tabs}
        activeTab="home"
        onTabChange={() => {}}
        size={size}
      />
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it.each(["default", "pills", "underline"] as const)("renders variant %s", (variant) => {
    render(
      <TabNavigation
        tabs={tabs}
        activeTab="home"
        onTabChange={() => {}}
        variant={variant}
      />
    );
    expect(screen.getByRole("tab", { name: /home/i })).toBeInTheDocument();
  });
});

import React, { useMemo, memo } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./TabNavigation.module.css";

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  permission?: string;
  disabled?: boolean;
  badge?: string | number;
  isVisible?: boolean;
}

export interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  /** Content to show below the tabs, keyed by tab id. When provided, the active tab's content is rendered. */
  contentByTabId?: Record<string, React.ReactNode>;
  hasPermission?: (permission: string) => boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "pills" | "underline";
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

const SIZE_CLASSES = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const VARIANT_CLASSES = {
  default: { base: styles.tab, active: styles.tabActive },
  pills: { base: styles.tabPill, active: styles.tabPillActive },
  underline: { base: styles.tabUnderline, active: styles.tabUnderlineActive },
} as const;

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  contentByTabId,
  hasPermission = () => true,
  className,
  size = "md",
  variant = "default",
  threeD = false,
}) => {
  const visibleTabs = useMemo(
    () =>
      tabs.filter((tab) => {
        if (tab.isVisible !== undefined) return tab.isVisible;
        if (tab.permission) return hasPermission(tab.permission);
        return true;
      }),
    [tabs, hasPermission]
  );

  const variantStyle = VARIANT_CLASSES[variant];
  const sizeClass = SIZE_CLASSES[size];

  const tabList = (
    <div className={styles.content}>
      <div className={styles.tabList} role="tablist">
        {visibleTabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                variantStyle.base,
                sizeClass,
                isActive && variantStyle.active,
                tab.disabled && styles.tabDisabled
              )}
            >
              {TabIcon && <TabIcon className={styles.icon} />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={styles.badge}>{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (visibleTabs.length <= 1 && !contentByTabId) return null;

  return (
    <div className={cn(styles.container, threeD && "solstice-ui-3d", className)}>
      {tabList}
      {contentByTabId && (
        <div className={styles.tabPanel} role="tabpanel">
          {contentByTabId[activeTab] ?? null}
        </div>
      )}
    </div>
  );
};

export default memo(TabNavigation);

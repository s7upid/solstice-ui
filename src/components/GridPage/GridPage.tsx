import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import PageHeader from "../PageHeader/PageHeader";
import EmptyState from "../EmptyState/EmptyState";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./GridPage.module.css";

export interface GridPageProps<T> {
  /** Page title (optional). When set, renders PageHeader. */
  title?: string;
  /** Page description or subtitle (optional). */
  description?: string;
  /** Optional icon for the page header. */
  icon?: LucideIcon;
  /** Actions (e.g. buttons) to render in the page header. */
  actions?: React.ReactNode;
  /** Data items to render as cards. */
  items: T[];
  /** Render each item as a card (or any node). Use Card component from the library. */
  renderCard: (item: T) => React.ReactNode;
  /** Number of grid columns (1–4). Default 3. */
  columns?: 1 | 2 | 3 | 4;
  /** When true, shows loading spinner instead of the grid. */
  loading?: boolean;
  /** Empty state title when items.length === 0 and not loading. */
  emptyTitle?: string;
  /** Empty state description (optional). */
  emptyDescription?: string;
  /** Key for each item (optional). Defaults to index. */
  keyExtractor?: (item: T, index: number) => React.Key;
  /** When true, adds 3D-style shadow to header. */
  threeD?: boolean;
  className?: string;
  /** Optional grid container class. */
  gridClassName?: string;
}

function GridPage<T>({
  title,
  description,
  icon,
  actions,
  items,
  renderCard,
  columns = 3,
  loading = false,
  emptyTitle = "No items",
  emptyDescription,
  keyExtractor,
  threeD = false,
  className = "",
  gridClassName = "",
}: GridPageProps<T>) {
  const gridColsClass =
    columns === 1
      ? styles.gridCols1
      : columns === 2
        ? styles.gridCols2
        : columns === 4
          ? styles.gridCols4
          : styles.gridCols3;

  return (
    <div className={cn(styles.content, className)}>
      {(title || actions) && (
        <PageHeader
          title={title ?? ""}
          description={description}
          icon={icon}
          actions={actions}
          threeD={threeD}
        />
      )}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          threeD={threeD}
        />
      ) : (
        <div
          className={cn(styles.grid, gridColsClass, gridClassName)}
          role="list"
        >
          {items.map((item, index) => (
            <div
              key={keyExtractor ? keyExtractor(item, index) : index}
              role="listitem"
            >
              {renderCard(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GridPage;

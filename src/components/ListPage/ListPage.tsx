import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import PageHeader from "../PageHeader/PageHeader";
import List from "../List/List";
import EmptyState from "../EmptyState/EmptyState";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination";
import styles from "./ListPage.module.css";

type BaseListItem = { id?: number | string };

export interface ListPageProps<T extends BaseListItem> {
  /** Page title (optional). When set, renders PageHeader. */
  title?: string;
  /** Page description or subtitle (optional). */
  description?: string;
  /** Optional icon for the page header. */
  icon?: LucideIcon;
  /** Actions (e.g. buttons) to render in the page header. */
  actions?: React.ReactNode;
  /** Data items to render in the list. Items should have an optional `id` for keys, or use keyExtractor. */
  items: T[];
  /** Render each item (e.g. row, card, or custom node). Use List from the library for simple lists. */
  renderItem: (item: T) => React.ReactNode;
  /** When true, shows loading spinner instead of the list. */
  loading?: boolean;
  /** Empty state title when items.length === 0 and not loading. */
  emptyTitle?: string;
  /** Empty state description (optional). */
  emptyDescription?: string;
  /** Key for each item (optional). Defaults to item.id or index. */
  keyExtractor?: (item: T, index: number) => React.Key;
  /** Optional class for the list container. */
  listClassName?: string;
  /** When true, adds 3D-style shadow to header and list. */
  threeD?: boolean;
  className?: string;
  /** Pagination: total number of pages. When set with onPageChange, renders Pagination below the list. */
  totalPages?: number;
  /** Current page (1-based). Used with totalPages and onPageChange. */
  currentPage?: number;
  /** Called when user changes page. Used with totalPages and currentPage. */
  onPageChange?: (page: number) => void;
  /** Page size for Pagination selector (optional). */
  pageSize?: number;
  /** Called when page size changes (optional). */
  onPageSizeChange?: (size: number) => void;
  /** Page size options (optional). */
  pageSizeOptions?: number[];
}

function ListPage<T extends BaseListItem>({
  title,
  description,
  icon,
  actions,
  items,
  renderItem,
  loading = false,
  emptyTitle = "No items",
  emptyDescription,
  keyExtractor,
  listClassName = "",
  threeD = false,
  className = "",
  totalPages,
  currentPage = 1,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
}: ListPageProps<T>) {
  const showPagination =
    totalPages != null && totalPages > 0 && onPageChange != null;

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
        <>
          <List<T>
            items={items}
            renderItem={renderItem}
            listClassName={listClassName}
            keyExtractor={keyExtractor}
            threeD={threeD}
          />
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              pageSize={pageSize}
              onPageSizeChange={onPageSizeChange}
              pageSizeOptions={pageSizeOptions}
              threeD={threeD}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ListPage;

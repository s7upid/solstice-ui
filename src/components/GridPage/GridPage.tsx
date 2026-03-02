import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import PageHeader from "../PageHeader/PageHeader";
import Grid from "../Grid/Grid";
import EmptyState from "../EmptyState/EmptyState";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination";
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
  /** Content to render between the header and the grid (e.g. filters, toolbar). */
  contentBetweenHeaderAndGrid?: React.ReactNode;
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
  /** Pagination: total number of pages. When set with onPageChange, renders Pagination below the grid. */
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

function GridPage<T>({
  title,
  description,
  icon,
  actions,
  contentBetweenHeaderAndGrid,
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
  totalPages,
  currentPage = 1,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
}: GridPageProps<T>) {
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
      {contentBetweenHeaderAndGrid != null && contentBetweenHeaderAndGrid}
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
          <Grid<T>
            items={items}
            renderCard={renderCard}
            columns={columns}
            keyExtractor={keyExtractor}
            gridClassName={gridClassName}
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

export default GridPage;

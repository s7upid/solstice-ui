import { type ReactNode, type Key } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import PageHeader from "../PageHeader/PageHeader";
import Grid from "../Grid/Grid";
import List from "../List/List";
import EmptyState from "../EmptyState/EmptyState";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination";
import styles from "./DataPage.module.css";

type BaseListItem = { id?: number | string };

interface DataPageBaseProps {
  /** Page title (optional). When set, renders PageHeader. */
  title?: string;
  /** Page description or subtitle (optional). */
  description?: string;
  /** Optional icon for the page header. */
  icon?: LucideIcon;
  /** Actions (e.g. buttons) to render in the page header. */
  actions?: ReactNode;
  /** When true, shows loading spinner instead of the content. */
  loading?: boolean;
  /** Empty state title when items.length === 0 and not loading. */
  emptyTitle?: string;
  /** Empty state description (optional). */
  emptyDescription?: string;
  /** When true, adds 3D-style shadow. */
  threeD?: boolean;
  className?: string;
  /** Pagination: total number of pages. When set with onPageChange, renders Pagination. */
  totalPages?: number;
  /** Current page (1-based). */
  currentPage?: number;
  /** Called when user changes page. */
  onPageChange?: (page: number) => void;
  /** Page size for Pagination selector (optional). */
  pageSize?: number;
  /** Called when page size changes (optional). */
  onPageSizeChange?: (size: number) => void;
  /** Page size options (optional). */
  pageSizeOptions?: number[];
}

export type DataPageGridProps<T> = DataPageBaseProps & {
  layout: "grid";
  items: T[];
  /** Render each item as a card. */
  renderCard: (item: T) => ReactNode;
  /** Number of grid columns (1-4). Default 3. */
  columns?: 1 | 2 | 3 | 4;
  /** Key for each item (optional). Defaults to index. */
  keyExtractor?: (item: T, index: number) => Key;
  /** Optional grid container class. */
  gridClassName?: string;
  /** Content to render between the header and the grid (e.g. filters, toolbar). */
  contentBetweenHeaderAndContent?: ReactNode;
};

export type DataPageListProps<T extends BaseListItem> = DataPageBaseProps & {
  layout?: "list";
  items: T[];
  /** Render each item. */
  renderItem: (item: T) => ReactNode;
  /** Key for each item (optional). Defaults to item.id or index. */
  keyExtractor?: (item: T, index: number) => Key;
  /** Optional class for the list container. */
  listClassName?: string;
  /** Content to render between the header and the list (e.g. filters, toolbar). */
  contentBetweenHeaderAndContent?: ReactNode;
};

export type DataPageProps<T extends BaseListItem = BaseListItem> =
  | DataPageGridProps<T>
  | DataPageListProps<T>;

function DataPage<T extends BaseListItem>(props: DataPageProps<T>) {
  const {
    title,
    description,
    icon,
    actions,
    loading = false,
    emptyTitle = "No items",
    emptyDescription,
    threeD = false,
    className = "",
    totalPages,
    currentPage = 1,
    onPageChange,
    pageSize,
    onPageSizeChange,
    pageSizeOptions,
    items,
    contentBetweenHeaderAndContent,
  } = props;

  const showPagination =
    totalPages != null && totalPages > 0 && onPageChange != null;

  const renderContent = () => {
    if (props.layout === "grid") {
      return (
        <Grid<T>
          items={items}
          renderCard={props.renderCard}
          columns={props.columns}
          keyExtractor={props.keyExtractor}
          gridClassName={props.gridClassName}
          threeD={threeD}
        />
      );
    }
    const listProps = props as DataPageListProps<T>;
    return (
      <List<T>
        items={items}
        renderItem={listProps.renderItem}
        listClassName={listProps.listClassName}
        keyExtractor={listProps.keyExtractor}
        threeD={threeD}
      />
    );
  };

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
      {contentBetweenHeaderAndContent != null && contentBetweenHeaderAndContent}
      {loading ? (
        <div className={styles.loadingWrapper}>
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
          {renderContent()}
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

export default DataPage;

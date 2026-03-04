import { useState, useId, memo } from "react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  threeD = false,
}: PaginationProps) {
  const pageSizeId = useId();

  const clampPage = (value: number) => {
    if (Number.isNaN(value)) return currentPage;
    return Math.min(Math.max(1, Math.trunc(value)), totalPages);
  };

  const [open, setOpen] = useState(false);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages === 0) return null;

  return (
    <nav
      className={cn(styles.container, threeD && "solstice-ui-3d", className)}
      role="navigation"
      aria-label="Pagination"
    >
      <div className={styles.compact}>
        <div
          className={cn(styles.segment, styles.segmentRelative)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setOpen(false);
            }
          }}
        >
          <button
            type="button"
            className={styles.pageDisplay}
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {currentPage}
            <ChevronUp size={16} className={styles.chevron} />
          </button>
          {open && (
            <div role="listbox" className={styles.dropdown} tabIndex={-1}>
              {pages.map((p) => (
                <button
                  key={p}
                  type="button"
                  role="option"
                  aria-selected={currentPage === p}
                  className={cn(
                    styles.dropdownItem,
                    currentPage === p && styles.dropdownItemActive
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const next = clampPage(p);
                    if (next !== currentPage) {
                      onPageChange(next);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    setOpen(false);
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={styles.segment}>
          <span className={styles.labelInline}>of {totalPages} pages</span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          disabled={currentPage === 1}
          className={styles.segmentButton}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          disabled={currentPage === totalPages}
          className={styles.segmentButton}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
        {onPageSizeChange && (
          <div className={styles.segment}>
            <label htmlFor={pageSizeId} className={styles.label}>
              Items per page
            </label>
            <select
              id={pageSizeId}
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={styles.select}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </nav>
  );
}

export default memo(Pagination);

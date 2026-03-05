import { useEffect, useId, type ReactNode, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { LucideIcon, X } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "../Button/Button";
import styles from "./Dialog.module.css";

export interface DialogFooterAction {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success" | "outline";
  loading?: boolean;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Custom footer content. When provided, used instead of footerActions. */
  footer?: ReactNode;
  /** Optional actions rendered as buttons with optional icons (left of label). */
  footerActions?: DialogFooterAction[];
  className?: string;
  /** Max width: sm, md, lg, full */
  size?: "sm" | "md" | "lg" | "full";
  /** Close on backdrop click (default true) */
  closeOnBackdropClick?: boolean;
  /** Close on Escape (default true) */
  closeOnEscape?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

function Dialog({
  isOpen,
  onClose,
  title,
  children,
  footer,
  footerActions,
  className,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  threeD = false,
}: DialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      <div className={cn(styles.dialog, styles[`size_${size}`], threeD && "solstice-ui-3d", className)}>
        <div className={styles.header}>
          {title ? (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          ) : (
            <span className={styles.titleSpacer} />
          )}
          <button
            type="button"
            onClick={onClose}
            className={styles.close}
            aria-label="Close"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
        {(footer != null || (footerActions != null && footerActions.length > 0)) && (
          <div className={styles.footer}>
            {footer ??
              footerActions?.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant ?? "primary"}
                  onClick={action.onClick}
                  icon={action.icon}
                  loading={action.loading}
                  threeD={threeD}
                >
                  {action.label}
                </Button>
              ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default Dialog;

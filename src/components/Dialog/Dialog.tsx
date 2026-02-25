import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import ModalPortal from "../ModalPortal/ModalPortal";
import styles from "./Dialog.module.css";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
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

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  threeD = false,
}) => {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) onClose();
  };

  return (
    <ModalPortal>
      <div
        className={styles.backdrop}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
      >
        <div className={cn(styles.dialog, styles[`size_${size}`], threeD && "solstice-ui-3d", className)}>
          <div className={styles.header}>
            {title ? (
              <h2 id="dialog-title" className={styles.title}>
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
          {footer != null && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Dialog;

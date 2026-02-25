import React from "react";
import { AlertTriangle, AlertCircle, X, XCircle, Trash2, Save, Info } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "../Button/Button";
import styles from "./ConfirmationDialog.module.css";

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
  threeD = false,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          iconClass: styles.iconDanger,
          headerIcon: AlertCircle,
          confirmVariant: "danger" as const,
          confirmIcon: Trash2,
        };
      case "warning":
        return {
          iconClass: styles.iconWarning,
          headerIcon: AlertTriangle,
          confirmVariant: "primary" as const,
          confirmIcon: Save,
        };
      case "info":
        return {
          iconClass: styles.iconInfo,
          headerIcon: Info,
          confirmVariant: "primary" as const,
          confirmIcon: Info,
        };
      default:
        return {
          iconClass: styles.iconDanger,
          headerIcon: AlertCircle,
          confirmVariant: "danger" as const,
          confirmIcon: Trash2,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const ConfirmIcon = variantStyles.confirmIcon;
  const HeaderIcon = variantStyles.headerIcon;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={cn(styles.dialog, threeD && "solstice-ui-3d")}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={cn(styles.iconContainer, variantStyles.iconClass)}>
              <HeaderIcon className={styles.iconMedium} aria-hidden />
            </div>
            <h3 className={styles.title}>{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.close}
            disabled={isLoading}
            aria-label="Close"
          >
            <X className={styles.iconMedium} />
          </button>
        </div>

        <div className={styles.contentContainer}>
          <p className={styles.content}>{message}</p>
        </div>

        <div className={styles.actions}>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            icon={XCircle}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={variantStyles.confirmVariant}
            disabled={isLoading}
            loading={isLoading}
            icon={ConfirmIcon}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

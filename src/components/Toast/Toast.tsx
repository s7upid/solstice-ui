import { useEffect, useState, useRef } from "react";
import { CheckCircle, X, ChevronDown, ChevronUp, AlertCircle, AlertTriangle, Info } from "lucide-react";
import styles from "./Toast.module.css";
import { cn } from "../../utils/cn";

export interface ToastItem {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  duration?: number;
}

interface ToastItemComponentProps {
  toast: ToastItem;
  onRemove: (id: string) => void;
  autoDismiss?: boolean;
  dismissDelay?: number;
  threeD?: boolean;
}

function ToastItemComponent({
  toast,
  onRemove,
  autoDismiss = true,
  dismissDelay,
  threeD = false,
}: ToastItemComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messageRef.current) {
      const el = messageRef.current;
      setIsOverflowing(
        el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
      );
    }
  }, [toast.message]);

  useEffect(() => {
    const shouldAutoClose = autoDismiss !== false && !isExpanded;
    if (!shouldAutoClose) return;
    const autoCloseMs =
      dismissDelay ??
      (toast.duration && toast.duration > 0 ? toast.duration : 5000);
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, autoCloseMs);
    return () => clearTimeout(timer);
  }, [autoDismiss, dismissDelay, toast.duration, toast.id, isExpanded, onRemove]);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const ICON_MAP = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  } as const;

  const VARIANT_MAP = {
    success: styles.success,
    error: styles.error,
    warning: styles.warning,
    info: styles.info,
  } as const;

  const IconComponent = ICON_MAP[toast.type] ?? Info;
  const variantClass = VARIANT_MAP[toast.type] ?? "";

  return (
    <div
      className={cn(
        styles.toast,
        isVisible && !isLeaving ? styles.enter : styles.exit,
        isExpanded && styles.expanded,
        variantClass,
        threeD && "solstice-ui-3d"
      )}
    >
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <IconComponent className={styles.icon} />
        </div>
        <div className={styles.body}>
          <h4 className={styles.title}>{toast.title}</h4>
          {toast.message && (
            <p
              ref={messageRef}
              className={cn(styles.message, isExpanded && styles.messageExpanded)}
            >
              {toast.message}
            </p>
          )}
          {(isOverflowing || isExpanded) && toast.message && (
            <button
              type="button"
              onClick={toggleExpand}
              className={styles.expandButton}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className={styles.expandIcon} />
                  <span>Show less</span>
                </>
              ) : (
                <>
                  <ChevronDown className={styles.expandIcon} />
                  <span>Show more</span>
                </>
              )}
            </button>
          )}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleRemove}
            className={styles.close}
            aria-label="Dismiss"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export interface ToastProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
  autoDismiss?: boolean;
  dismissDelay?: number;
  /** When true, adds a 3D-style shadow (bottom and right) to each toast. */
  threeD?: boolean;
}

function Toast({
  toasts,
  onRemove,
  autoDismiss = true,
  dismissDelay,
  threeD = false,
}: ToastProps) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItemComponent
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
          autoDismiss={autoDismiss}
          dismissDelay={dismissDelay}
          threeD={threeD}
        />
      ))}
    </div>
  );
}

export default Toast;

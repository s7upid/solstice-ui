import { type ReactNode, type HTMLAttributes } from "react";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Alert.module.css";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

const ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  threeD = false,
  className,
  ...rest
}: AlertProps) {
  const Icon = ICONS[variant];

  return (
    <div
      className={cn(
        styles.alert,
        styles[variant],
        threeD && "solstice-ui-3d",
        className
      )}
      role="alert"
      {...rest}
    >
      <Icon className={styles.icon} aria-hidden />
      <div className={styles.body}>
        {title && <h4 className={styles.title}>{title}</h4>}
        <div className={styles.content}>{children}</div>
      </div>
      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={styles.close}
          aria-label="Dismiss"
        >
          <X className={styles.closeIcon} />
        </button>
      )}
    </div>
  );
}

export default Alert;

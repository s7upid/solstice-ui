import React, { memo } from "react";
import { cn } from "../../utils/cn";
import styles from "./Badge.module.css";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  pill?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
  info: styles.info,
  neutral: styles.neutral,
};

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className,
  pill = true,
  threeD = false,
}) => {
  return (
    <span
      className={cn(
        styles.base,
        VARIANT_CLASSES[variant],
        pill && styles.pill,
        threeD && "solstice-ui-3d",
        className
      )}
    >
      {children}
    </span>
  );
};

export default memo(Badge);

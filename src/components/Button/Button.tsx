import React, { useMemo, memo } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  children?: React.ReactNode;
}

const VARIANT_CLASSES = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  ghost: styles.ghost,
  success: styles.success,
  outline: styles.outline,
} as const;

const SIZE_CLASSES = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const ICON_SIZE_CLASSES = {
  sm: styles.iconSm,
  md: styles.iconMd,
  lg: styles.iconLg,
} as const;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  threeD = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const buttonClassName = useMemo(
    () => cn(styles.base, VARIANT_CLASSES[variant], SIZE_CLASSES[size], threeD && "solstice-ui-3d", className),
    [variant, size, threeD, className]
  );

  const iconSizeClass = ICON_SIZE_CLASSES[size];

  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className={cn(styles.loadingSpinner, iconSizeClass)} />
      ) : Icon && iconPosition === "left" ? (
        <Icon className={cn(iconSizeClass, styles.iconLeft)} />
      ) : Icon && !children ? (
        <Icon className={iconSizeClass} />
      ) : null}

      {children}

      {Icon && iconPosition === "right" && !loading && (
        <Icon className={cn(iconSizeClass, styles.iconRight)} />
      )}
    </button>
  );
};

export default memo(Button);

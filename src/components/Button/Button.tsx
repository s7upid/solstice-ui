import { type ButtonHTMLAttributes, type ReactNode, type Ref } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
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

function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  threeD = false,
  children,
  className = "",
  disabled,
  ref,
  ...props
}: ButtonProps) {
  const iconSizeClass = ICON_SIZE_CLASSES[size];
  const showLeftIcon = !loading && Icon && (iconPosition === "left" || !children);
  const showRightIcon = !loading && Icon && iconPosition === "right" && children;

  return (
    <button
      ref={ref}
      className={cn(styles.base, VARIANT_CLASSES[variant], SIZE_CLASSES[size], threeD && "solstice-ui-3d", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className={cn(styles.loadingSpinner, iconSizeClass)} />}
      {showLeftIcon && <Icon className={cn(iconSizeClass, children && styles.iconLeft)} />}
      {children}
      {showRightIcon && <Icon className={cn(iconSizeClass, styles.iconRight)} />}
    </button>
  );
}

export default Button;

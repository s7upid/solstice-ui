import {
  useId,
  cloneElement,
  createElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
  type ComponentType,
  type Ref,
  type InputHTMLAttributes,
} from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon | ReactNode;
  iconPosition?: "left" | "right";
  /** Optional slot rendered at the end of the input row (e.g. password visibility toggle). */
  endAdornment?: ReactNode;
  required?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  ref?: Ref<HTMLInputElement>;
}

function Input({
  label,
  error,
  icon,
  iconPosition = "left",
  endAdornment,
  required = false,
  threeD = false,
  className,
  id,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId.replace(/:/g, "")}`;

  const inputClasses = cn(
    styles.field,
    error && styles.fieldError,
    icon &&
      (iconPosition === "left" ? styles.withIconLeft : styles.withIconRight),
    endAdornment && styles.withEndAdornment,
    className
  );

  const iconEl = (() => {
    if (!icon) return null;
    if (isValidElement(icon)) {
      return cloneElement(icon as ReactElement<{ className?: string }>, {
        className: cn(styles.icon, (icon as ReactElement<{ className?: string }>).props.className),
      });
    }
    // Lucide icons and other components (including ForwardRef) may be functions or objects
    const IconComponent = icon as ComponentType<{ className?: string }>;
    if (typeof IconComponent === "function" || (typeof IconComponent === "object" && IconComponent !== null)) {
      return createElement(IconComponent, { className: styles.icon });
    }
    return <span className={styles.icon}>?</span>;
  })();

  return (
    <div className={cn(styles.container, threeD && "solstice-ui-3d")}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.relative}>
        {icon && iconPosition === "left" && (
          <div className={styles.iconLeftContainer}>{iconEl}</div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={inputClasses}
          required={required}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className={styles.iconRightContainer}>{iconEl}</div>
        )}
        {endAdornment && (
          <div className={styles.endAdornmentContainer}>{endAdornment}</div>
        )}
      </div>
      {error && (
        <p className={styles.error} data-testid={`${inputId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;

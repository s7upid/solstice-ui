import React, { forwardRef, useId, ReactNode, cloneElement } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon | ReactNode;
  iconPosition?: "left" | "right";
  required?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      iconPosition = "left",
      required = false,
      threeD = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? `input-${generatedId.replace(/:/g, "")}`;

    const inputClasses = cn(
      styles.field,
      error && styles.fieldError,
      icon &&
        (iconPosition === "left" ? styles.withIconLeft : styles.withIconRight),
      className
    );

    const iconEl = (() => {
      if (!icon) return null;
      if (React.isValidElement(icon)) {
        return cloneElement(icon as React.ReactElement<{ className?: string }>, {
          className: cn(styles.icon, (icon as React.ReactElement<{ className?: string }>).props.className),
        });
      }
      if (typeof icon === "function") {
        const IconComponent = icon as React.ComponentType<{ className?: string }>;
        return <IconComponent className={styles.icon} />;
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
        </div>
        {error && (
          <p className={styles.error} data-testid={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

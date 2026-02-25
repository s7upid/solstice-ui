import React, { forwardRef, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import styles from "./Checkbox.module.css";

export type CheckboxState = false | true | "indeterminate";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "onChange"
  > {
  /** Current state: false (unchecked), true (checked), "indeterminate" (mixed) */
  state?: CheckboxState;
  /** Controlled: called when state changes. Cycles: unchecked → checked → indeterminate → unchecked (or unchecked → checked → unchecked if not tri-state). */
  onStateChange?: (state: CheckboxState) => void;
  /** When true, cycle through all 3 states; when false, only unchecked ↔ checked (default true) */
  triState?: boolean;
  label?: string;
  error?: string;
  /** Optional description below the label */
  description?: string;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

function getNextState(state: CheckboxState, tri: boolean): CheckboxState {
  if (tri) {
    if (state === false) return true;
    if (state === true) return "indeterminate";
    return false;
  }
  if (state === false) return true;
  return false;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      state = false,
      onStateChange,
      triState = true,
      label,
      error,
      description,
      threeD = false,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const setRefs = (el: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
        el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    const isIndeterminate = state === "indeterminate";
    const isChecked = state === true;

    useEffect(() => {
      const el = inputRef.current;
      if (el) el.indeterminate = isIndeterminate;
    }, [isIndeterminate]);

    const inputId =
      id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      onStateChange?.(getNextState(state, triState));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === " ") {
        e.preventDefault();
        onStateChange?.(getNextState(state, triState));
      }
    };

    return (
      <div className={cn(styles.container, threeD && "solstice-ui-3d", className)}>
        <div className={styles.wrapper}>
          <input
            ref={setRefs}
            id={inputId}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-checked={isIndeterminate ? "mixed" : isChecked}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : description
                  ? `${inputId}-desc`
                  : undefined
            }
            className={cn(
              styles.input,
              isIndeterminate && styles.indeterminate,
              error && styles.inputError
            )}
            {...props}
          />
          <span className={styles.box} aria-hidden>
            {isChecked && !isIndeterminate && (
              <span className={styles.check} />
            )}
            {isIndeterminate && <span className={styles.dash} />}
          </span>
        </div>
        {(label || description) && (
          <label
            htmlFor={inputId}
            className={styles.labelBlock}
          >
            {label && <span className={styles.label}>{label}</span>}
            {description && (
              <span id={`${inputId}-desc`} className={styles.description}>
                {description}
              </span>
            )}
          </label>
        )}
        {error && (
          <p id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

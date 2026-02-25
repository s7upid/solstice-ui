import React, { forwardRef } from "react";
import { Calendar, Clock } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./DateTimePicker.module.css";

export type DateTimePickerMode = "date" | "time" | "datetime";

export interface DateTimePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "onChange"
  > {
  /** "date" | "time" | "datetime" */
  mode?: DateTimePickerMode;
  label?: string;
  error?: string;
  required?: boolean;
  /** Value as ISO string (YYYY-MM-DD or HH:mm or YYYY-MM-DDTHH:mm) */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Minimum value (same format as value) */
  min?: string;
  /** Maximum value (same format as value) */
  max?: string;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

const INPUT_TYPES: Record<DateTimePickerMode, string> = {
  date: "date",
  time: "time",
  datetime: "datetime-local",
};

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  (
    {
      mode = "datetime",
      label,
      error,
      required = false,
      value,
      defaultValue,
      onChange,
      min,
      max,
      threeD = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId =
      id || `datetime-${Math.random().toString(36).slice(2, 11)}`;
    const inputType = INPUT_TYPES[mode];
    const Icon = mode === "time" ? Clock : Calendar;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn(styles.container, threeD && "solstice-ui-3d")}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.relative}>
          <Icon
            className={styles.icon}
            aria-hidden
          />
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            min={min}
            max={max}
            required={required}
            className={cn(
              styles.input,
              error && styles.inputError,
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className={styles.error}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;

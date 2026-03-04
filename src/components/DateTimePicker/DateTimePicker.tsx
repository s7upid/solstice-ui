import { useId, type InputHTMLAttributes, type Ref, type ChangeEvent } from "react";
import { Calendar, Clock } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./DateTimePicker.module.css";

export type DateTimePickerMode = "date" | "time" | "datetime";

export interface DateTimePickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
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
  ref?: Ref<HTMLInputElement>;
}

const INPUT_TYPES: Record<DateTimePickerMode, string> = {
  date: "date",
  time: "time",
  datetime: "datetime-local",
};

function DateTimePicker({
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
  ref,
  ...props
}: DateTimePickerProps) {
  const generatedId = useId();
  const inputId = id || `datetime-${generatedId.replace(/:/g, "")}`;
  const inputType = INPUT_TYPES[mode];
  const Icon = mode === "time" ? Clock : Calendar;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

export default DateTimePicker;

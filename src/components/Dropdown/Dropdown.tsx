import { useId, type SelectHTMLAttributes, type ChangeEventHandler, type Ref } from "react";
import styles from "./Dropdown.module.css";
import { cn } from "../../utils/cn";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface DropdownProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  options: SelectOption[];
  value?: string | number;
  onValueChange?: (value: string) => void;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  error?: string;
  helperText?: string;
  placeholderOption?: string;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  ref?: Ref<HTMLSelectElement>;
}

function Dropdown({
  label,
  options,
  value,
  onValueChange,
  error,
  helperText,
  className,
  placeholderOption,
  threeD = false,
  onChange,
  id,
  ref,
  ...rest
}: DropdownProps) {
  const generatedId = useId();
  const selectId = id || `dropdown-${generatedId.replace(/:/g, "")}`;

  return (
    <div className={styles.root}>
      {label && <label htmlFor={selectId} className={styles.label}>{label}</label>}
      <select
        id={selectId}
        ref={ref}
        className={cn(
          styles.select,
          error && styles.selectError,
          threeD && "solstice-ui-3d",
          className || ""
        )}
        value={value}
        onChange={(e) => {
          onChange?.(e);
          onValueChange?.(e.target.value);
        }}
        {...rest}
      >
        {placeholderOption && <option value="">{placeholderOption}</option>}
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
      {helperText && !error && (
        <p className={styles.helper}>{helperText}</p>
      )}
    </div>
  );
}

export default Dropdown;

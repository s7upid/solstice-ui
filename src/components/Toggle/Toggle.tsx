import {
  useState,
  useEffect,
  useId,
  useRef,
  memo,
  type ReactNode,
  type Ref,
  type MutableRefObject,
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ButtonHTMLAttributes,
} from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Toggle.module.css";

/** State for switch/checkbox variants: off, indeterminate (middle), or on */
export type ToggleState = "off" | "indeterminate" | "on";

const STATE_ORDER: ToggleState[] = ["off", "on", "indeterminate"];

function getNextState(current: ToggleState, triState: boolean): ToggleState {
  if (!triState) {
    return current === "off" ? "on" : "off";
  }
  const i = STATE_ORDER.indexOf(current);
  return STATE_ORDER[(i + 1) % STATE_ORDER.length];
}

/** Shared props for all toggles */
interface ToggleBaseProps {
  /** "button" = pressable button; "switch" = track+thumb; "checkbox" = checkbox input */
  variant?: "button" | "switch" | "checkbox";
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
  disabled?: boolean;
}

/** Button-style toggle: pressed/unpressed with optional label and icon */
export interface ToggleButtonModeProps
  extends ToggleBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onToggle"> {
  variant?: "button";
  pressed?: boolean;
  onToggle?: (pressed: boolean) => void;
  defaultPressed?: boolean;
  label?: string;
  labelPressed?: string;
  icon?: LucideIcon;
  iconPressed?: LucideIcon;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  /** Visual style when variant="button" */
  buttonVariant?: "primary" | "secondary" | "outline" | "ghost";
  children?: ReactNode;
}

/** Switch-style toggle: track + thumb, off/on or off/indeterminate/on */
export interface ToggleSwitchModeProps extends ToggleBaseProps {
  variant: "switch";
  state?: ToggleState;
  onStateChange?: (state: ToggleState) => void;
  /** When false, only two states: off ↔ on. Default true for 3 states. */
  triState?: boolean;
  labels?: { off?: string; indeterminate?: string; on?: string };
  "aria-label"?: string;
}

/** Checkbox-style toggle: styled checkbox input, off/on or off/on/indeterminate */
export interface ToggleCheckboxModeProps extends ToggleBaseProps {
  variant: "checkbox";
  state?: ToggleState;
  onStateChange?: (state: ToggleState) => void;
  /** When false, only two states: off ↔ on. Default true for 3 states. */
  triState?: boolean;
  label?: string;
  error?: string;
  /** Optional description below the label */
  description?: string;
  id?: string;
  "aria-label"?: string;
  ref?: Ref<HTMLInputElement>;
}

export type ToggleProps =
  | ToggleButtonModeProps
  | ToggleSwitchModeProps
  | ToggleCheckboxModeProps;

const SIZE_CLASSES = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const BUTTON_VARIANT_CLASSES = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  ghost: styles.ghost,
} as const;

const ICON_SIZE_CLASSES = {
  sm: styles.iconSm,
  md: styles.iconMd,
  lg: styles.iconLg,
} as const;

function Toggle(props: ToggleProps) {
  if (props.variant === "switch") return <ToggleSwitch {...props} />;
  if (props.variant === "checkbox") return <ToggleCheckbox {...props} />;
  return <ToggleButton {...(props as ToggleButtonModeProps)} />;
}

function ToggleSwitch({
  state = "off",
  onStateChange,
  triState = true,
  labels,
  disabled = false,
  threeD = false,
  className,
  "aria-label": ariaLabel = "Toggle state",
}: ToggleSwitchModeProps) {
  const handleClick = () => {
    if (disabled) return;
    onStateChange?.(getNextState(state, triState));
  };

  return (
    <div className={cn(styles.switchWrapper, threeD && "solstice-ui-3d", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={state === "on" ? true : state === "off" ? false : "mixed"}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          styles.track,
          state === "off" && styles.trackOff,
          state === "indeterminate" && styles.trackIndeterminate,
          state === "on" && styles.trackOn,
          disabled && styles.trackDisabled
        )}
      >
        <span
          className={cn(
            styles.thumb,
            state === "off" && styles.thumbOff,
            state === "indeterminate" && styles.thumbIndeterminate,
            state === "on" && styles.thumbOn
          )}
        />
      </button>
      {labels &&
        (labels.off != null ||
          labels.indeterminate != null ||
          labels.on != null) && (
          <div className={styles.switchLabels} aria-hidden>
            {labels.off != null && (
              <span
                className={cn(
                  styles.switchLabel,
                  state === "off" && styles.switchLabelActive
                )}
              >
                {labels.off}
              </span>
            )}
            {labels.indeterminate != null && (
              <span
                className={cn(
                  styles.switchLabel,
                  state === "indeterminate" && styles.switchLabelActive
                )}
              >
                {labels.indeterminate}
              </span>
            )}
            {labels.on != null && (
              <span
                className={cn(
                  styles.switchLabel,
                  state === "on" && styles.switchLabelActive
                )}
              >
                {labels.on}
              </span>
            )}
          </div>
        )}
    </div>
  );
}

function ToggleCheckbox({
  state = "off",
  onStateChange,
  triState = true,
  label,
  error,
  description,
  disabled = false,
  threeD = false,
  className,
  id,
  ref,
  "aria-label": ariaLabel,
}: ToggleCheckboxModeProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setRefs = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = el;
  };

  const isIndeterminate = state === "indeterminate";
  const isChecked = state === "on";

  useEffect(() => {
    const el = inputRef.current;
    if (el) el.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  const generatedId = useId();
  const inputId = id || `checkbox-${generatedId.replace(/:/g, "")}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onStateChange?.(getNextState(state, triState));
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      onStateChange?.(getNextState(state, triState));
    }
  };

  return (
    <div className={cn(styles.cbContainer, threeD && "solstice-ui-3d", className)}>
      <div className={styles.cbWrapper}>
        <input
          ref={setRefs}
          id={inputId}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-checked={isIndeterminate ? "mixed" : isChecked}
          aria-label={ariaLabel}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : description
                ? `${inputId}-desc`
                : undefined
          }
          className={cn(
            styles.cbInput,
            isIndeterminate && styles.cbIndeterminate,
            error && styles.cbInputError
          )}
        />
        <span className={styles.cbBox} aria-hidden>
          {isChecked && !isIndeterminate && <span className={styles.cbCheck} />}
          {isIndeterminate && <span className={styles.cbDash} />}
        </span>
      </div>
      {(label || description) && (
        <label htmlFor={inputId} className={styles.cbLabelBlock}>
          {label && <span className={styles.cbLabel}>{label}</span>}
          {description && (
            <span id={`${inputId}-desc`} className={styles.cbDescription}>
              {description}
            </span>
          )}
        </label>
      )}
      {error && (
        <p id={`${inputId}-error`} className={styles.cbError} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ToggleButton({
  pressed: controlledPressed,
  onToggle,
  defaultPressed = false,
  label,
  labelPressed,
  icon: Icon,
  iconPressed: IconPressed,
  iconPosition = "left",
  size = "md",
  buttonVariant = "primary",
  threeD = false,
  disabled,
  children,
  className,
  ...rest
}: ToggleButtonModeProps) {
  const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
  const isControlled = controlledPressed !== undefined;
  const pressed = isControlled ? controlledPressed : uncontrolledPressed;

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (rest.onClick) rest.onClick(e);
    if (e.defaultPrevented) return;
    const next = !pressed;
    if (!isControlled) setUncontrolledPressed(next);
    onToggle?.(next);
  };

  const displayLabel = pressed && labelPressed != null ? labelPressed : label;
  const DisplayIcon = pressed && IconPressed ? IconPressed : Icon;
  const iconSizeClass = ICON_SIZE_CLASSES[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      disabled={disabled}
      className={cn(
        styles.buttonBase,
        BUTTON_VARIANT_CLASSES[buttonVariant],
        SIZE_CLASSES[size],
        pressed && styles.pressed,
        threeD && "solstice-ui-3d",
        className
      )}
      onClick={handleClick}
      {...rest}
    >
      {DisplayIcon && iconPosition === "left" && (
        <DisplayIcon className={cn(iconSizeClass, styles.iconLeft)} />
      )}
      {(children ?? displayLabel) != null && (
        <span className={styles.buttonLabel}>{children ?? displayLabel}</span>
      )}
      {DisplayIcon && iconPosition === "right" && (
        <DisplayIcon className={cn(iconSizeClass, styles.iconRight)} />
      )}
    </button>
  );
}

export default memo(Toggle);

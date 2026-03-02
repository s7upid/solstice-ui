import React, { useState, memo } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Toggle.module.css";

/** State for switch variant: off, indeterminate (middle), or on */
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
  /** "button" = pressable button with label/icon; "switch" = track+thumb with optional tri-state */
  variant?: "button" | "switch";
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
  disabled?: boolean;
}

/** Button-style toggle: pressed/unpressed with optional label and icon */
export interface ToggleButtonModeProps
  extends ToggleBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onToggle"> {
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
  children?: React.ReactNode;
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

export type ToggleProps = ToggleButtonModeProps | ToggleSwitchModeProps;

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

function isSwitchProps(props: ToggleProps): props is ToggleSwitchModeProps {
  return props.variant === "switch";
}

const Toggle: React.FC<ToggleProps> = (props) => {
  if (isSwitchProps(props)) {
    return <ToggleSwitch {...props} />;
  }
  return <ToggleButton {...(props as ToggleButtonModeProps)} />;
};

const ToggleSwitch: React.FC<ToggleSwitchModeProps> = ({
  state = "off",
  onStateChange,
  triState = true,
  labels,
  disabled = false,
  threeD = false,
  className,
  "aria-label": ariaLabel = "Toggle state",
}) => {
  const handleClick = () => {
    if (disabled) return;
    onStateChange?.(getNextState(state, triState));
  };

  const position =
    state === "off" ? "off" : state === "on" ? "on" : "indeterminate";

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
          position === "off" && styles.trackOff,
          position === "indeterminate" && styles.trackIndeterminate,
          position === "on" && styles.trackOn,
          disabled && styles.trackDisabled
        )}
      >
        <span
          className={cn(
            styles.thumb,
            position === "off" && styles.thumbOff,
            position === "indeterminate" && styles.thumbIndeterminate,
            position === "on" && styles.thumbOn
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
                  position === "off" && styles.switchLabelActive
                )}
              >
                {labels.off}
              </span>
            )}
            {labels.indeterminate != null && (
              <span
                className={cn(
                  styles.switchLabel,
                  position === "indeterminate" && styles.switchLabelActive
                )}
              >
                {labels.indeterminate}
              </span>
            )}
            {labels.on != null && (
              <span
                className={cn(
                  styles.switchLabel,
                  position === "on" && styles.switchLabelActive
                )}
              >
                {labels.on}
              </span>
            )}
          </div>
        )}
    </div>
  );
};

const ToggleButton: React.FC<ToggleButtonModeProps> = ({
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
}) => {
  const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
  const isControlled = controlledPressed !== undefined;
  const pressed = isControlled ? controlledPressed : uncontrolledPressed;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
};

export default memo(Toggle);

import React, { useMemo, memo } from "react";
import { cn } from "../../utils/cn";
import styles from "./LoadingSpinner.module.css";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  showMessage?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  text,
  showMessage = true,
  threeD = false,
}) => {
  const sizeClass = useMemo(
    () =>
      ({
        sm: styles.sizeSm,
        md: styles.sizeMd,
        lg: styles.sizeLg,
      }[size]),
    [size]
  );

  return (
    <div
      className={cn(styles.container, threeD && "solstice-ui-3d", className)}
      role="status"
      aria-label={text || "Loading"}
    >
      <div
        className={cn(styles.spinnerBase, sizeClass)}
        aria-hidden="true"
      />
      {text && showMessage && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default memo(LoadingSpinner);

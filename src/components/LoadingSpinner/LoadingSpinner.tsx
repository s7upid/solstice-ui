import { cn } from "../../utils/cn";
import styles from "./LoadingSpinner.module.css";

const SIZE_CLASSES = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  showMessage?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

function LoadingSpinner({
  size = "md",
  className = "",
  text,
  showMessage = true,
  threeD = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(styles.container, threeD && "solstice-ui-3d", className)}
      role="status"
      aria-label={text || "Loading"}
    >
      <div
        className={cn(styles.spinnerBase, SIZE_CLASSES[size])}
        aria-hidden="true"
      />
      {text && showMessage && <p className={styles.text}>{text}</p>}
    </div>
  );
}

export default LoadingSpinner;

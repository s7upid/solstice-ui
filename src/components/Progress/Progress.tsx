import { cn } from "../../utils/cn";
import styles from "./Progress.module.css";

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

const SIZE_CLASSES = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

function Progress({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  threeD = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const showBar = percentage > 0;

  return (
    <div className={cn(styles.wrapper, threeD && "solstice-ui-3d", className)}>
      <div
        className={cn(styles.track, SIZE_CLASSES[size])}
      >
        <div
          className={cn(styles.bar, styles[variant])}
          style={{
            width: `${percentage}%`,
            minWidth: showBar && percentage < 100 ? "4px" : undefined,
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{Math.round(percentage)}%</span>
      )}
    </div>
  );
}

export default Progress;

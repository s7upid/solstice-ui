import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./EmptyState.module.css";
import Button from "../Button/Button";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon,
  primaryAction,
  secondaryAction,
  threeD = false,
  className,
}) => {
  return (
    <div className={cn(styles.emptyState, threeD && "solstice-ui-3d", className)}>
      {Icon && (
        <div className={styles.iconWrapper} aria-hidden="true">
          <Icon size={36} />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
      <div className={styles.actions}>
        {primaryAction && (
          <Button variant="primary" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="secondary" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

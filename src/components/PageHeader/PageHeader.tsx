import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  subtitle,
  icon,
  actions,
  threeD = false,
  className = "",
}) => {
  return (
    <div className={cn(styles.container, threeD && "solstice-ui-3d", className)}>
      <div className={styles.content}>
        {icon && (
          <div className={styles.icon}>
            {React.createElement(icon, { className: "w-6 h-6" })}
          </div>
        )}
        <div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default PageHeader;

import { type ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

function PageHeader({
  title,
  description,
  subtitle,
  icon: Icon,
  actions,
  threeD = false,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={cn(styles.container, threeD && "solstice-ui-3d", className)}>
      <div className={styles.content}>
        {Icon && (
          <div className={styles.icon}>
            <Icon className={styles.iconSvg} />
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
}

export default PageHeader;

import { useState, memo, type ReactNode } from "react";
import { LucideIcon, Compass } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Card.module.css";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";

type IconSize = "sm" | "md" | "lg";

interface Detail {
  label: string;
  value: string | number;
  icon?: LucideIcon;
}

interface Stat {
  label: string;
  value: string | number;
  icon?: LucideIcon;
}

interface Action {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  icon?: LucideIcon;
}

export interface CardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  avatar?: string;
  /** When set, card uses image layout: text left, image right, optional single action. */
  imageSrc?: string;
  imageAlt?: string;
  /** Single action for image layout (e.g. "Explore"). Renders a button when onAction is set. */
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  stats?: Stat[];
  actions?: Action[];
  details?: Detail[];
  layout?: "default" | "vertical" | "horizontal";
  status?: string;
  statusVariant?: "default" | "success" | "warning" | "error" | "info";
  detailsPerRow?: 1 | 2 | 3 | 4;
  iconSize?: IconSize;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
  children?: ReactNode;
}

const CardHeader = ({
  title,
  description,
  avatar,
  icon: Icon,
  iconSize = "md",
}: Pick<CardProps, "title" | "description" | "avatar" | "icon" | "iconSize">) => {
  const [imageFailed, setImageFailed] = useState(false);
  const iconSizeClass = {
    sm: styles.iconSm,
    md: styles.iconMd,
    lg: styles.iconLg,
  }[iconSize];
  const showAvatar = avatar && !imageFailed;

  return (
    <>
      {showAvatar ? (
        <img
          src={avatar}
          alt=""
          className={styles.avatar}
          onError={() => setImageFailed(true)}
        />
      ) : Icon ? (
        <Icon className={cn(styles.icon, iconSizeClass)} />
      ) : null}
      <div>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </>
  );
};

const CardDetails = ({
  details = [],
  detailsPerRow = 1,
}: Pick<CardProps, "details" | "detailsPerRow">) => {
  if (details.length === 0) return null;
  return (
    <div className={cn(styles.details, styles[`detailsPerRow${detailsPerRow}`])}>
      {details.map((detail, index) => {
        const DetailIcon = detail.icon;
        return (
          <div key={index} className={styles.detailItem}>
            {DetailIcon && <DetailIcon className={styles.detailIcon} />}
            <div>
              <p className={styles.detailLabel}>{detail.label}</p>
              <p className={styles.detailValue}>{detail.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CardStats = ({ stats = [] }: Pick<CardProps, "stats">) => {
  if (stats.length === 0) return null;
  return (
    <div className={styles.stats}>
      {stats.map((stat, index) => {
        const StatIcon = stat.icon;
        return (
          <div key={index} className={styles.statItem}>
            {StatIcon && <StatIcon className={styles.statIcon} />}
            <span>{stat.label}:</span>
            <span>{stat.value}</span>
          </div>
        );
      })}
    </div>
  );
};

const CardActions = ({ actions = [] }: Pick<CardProps, "actions">) => {
  if (actions.length === 0) return null;
  return (
    <div className={styles.actions}>
      <div className={styles.actionRow}>
        {actions.map((action, index) => {
          const ActionIcon = action.icon;
          return (
            <button
              key={index}
              type="button"
              onClick={action.onClick}
              className={styles.actionButton}
            >
              {ActionIcon && <ActionIcon className={styles.actionIcon} />}
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

function Card({
  title,
  description,
  icon,
  avatar,
  imageSrc,
  imageAlt = "",
  actionLabel = "Explore",
  actionIcon: ActionIcon = Compass,
  onAction,
  stats,
  actions,
  details,
  layout = "default",
  status,
  statusVariant = "default",
  detailsPerRow,
  iconSize,
  threeD = false,
  className,
  children,
}: CardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const LAYOUT_CLASSES = {
    default: styles.header,
    vertical: styles.verticalHeader,
    horizontal: styles.horizontalHeader,
  } as const;
  const layoutClass = LAYOUT_CLASSES[layout];
  const isImageLayout = Boolean(imageSrc);

  if (isImageLayout) {
    return (
      <div className={cn(styles.card, styles.cardWithImage, threeD && "solstice-ui-3d", className)}>
        {status && (
          <div className={styles.cardStatusBadge}>
            <Badge variant={statusVariant}>{status}</Badge>
          </div>
        )}
        <div className={styles.imageContent}>
          <div className={styles.imageTextBlock}>
            <h3 className={styles.imageTitle}>{title}</h3>
            {description != null && (
              <p className={styles.imageDescription}>{description}</p>
            )}
            {onAction && (
              <Button
                variant="secondary"
                size="md"
                icon={ActionIcon}
                onClick={onAction}
                className={styles.imageActionButton}
              >
                {actionLabel}
              </Button>
            )}
          </div>
          <div className={styles.imageWrap}>
            {!imageFailed ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                className={styles.imageImg}
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className={styles.imagePlaceholder} aria-hidden>
                No image
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(styles.card, threeD && "solstice-ui-3d", className)}>
      {status && (
        <div className={styles.cardStatusBadge}>
          <Badge variant={statusVariant}>{status}</Badge>
        </div>
      )}

      <div className={layoutClass}>
        <CardHeader
          title={title}
          description={description}
          avatar={avatar}
          icon={icon}
          iconSize={iconSize}
        />
      </div>

      {children}

      <CardDetails details={details} detailsPerRow={detailsPerRow} />
      <CardStats stats={stats} />
      <CardActions actions={actions} />
    </div>
  );
}

export default memo(Card);

import Button from "../Button/Button";
import { Trash2 } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./DangerZone.module.css";

export interface DangerZoneProps {
  title: string;
  description: string;
  buttonLabel: string;
  onConfirm: () => void;
  disabled?: boolean;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

function DangerZone({
  title,
  description,
  buttonLabel,
  onConfirm,
  disabled = false,
  threeD = false,
  className,
}: DangerZoneProps) {
  return (
    <div className={cn(styles.zone, threeD && "solstice-ui-3d", className)}>
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.text}>{description}</p>
        </div>
        <Button
          onClick={onConfirm}
          variant="danger"
          disabled={disabled}
          icon={Trash2}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

export default DangerZone;

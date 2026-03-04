import { type ReactNode, type Key } from "react";
import { cn } from "../../utils/cn";
import styles from "./Grid.module.css";

export interface GridProps<T> {
  items: T[];
  renderCard: (item: T) => ReactNode;
  /** Number of grid columns (1–4). Default 3. */
  columns?: 1 | 2 | 3 | 4;
  /** Key for each item (optional). Defaults to index. */
  keyExtractor?: (item: T, index: number) => Key;
  /** Optional grid container class. */
  gridClassName?: string;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

const GRID_COLS = {
  1: styles.gridCols1,
  2: styles.gridCols2,
  3: styles.gridCols3,
  4: styles.gridCols4,
} as const;

function Grid<T>({
  items,
  renderCard,
  columns = 3,
  keyExtractor,
  gridClassName = "",
  threeD = false,
}: GridProps<T>) {
  const gridColsClass = GRID_COLS[columns];

  return (
    <div
      className={cn(styles.grid, gridColsClass, threeD && "solstice-ui-3d", gridClassName)}
      role="list"
    >
      {items.map((item, index) => (
        <div
          key={keyExtractor ? keyExtractor(item, index) : index}
          role="listitem"
        >
          {renderCard(item)}
        </div>
      ))}
    </div>
  );
}

export default Grid;

import React from "react";
import { cn } from "../../utils/cn";
import styles from "./Grid.module.css";

export interface GridProps<T> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
  /** Number of grid columns (1–4). Default 3. */
  columns?: 1 | 2 | 3 | 4;
  /** Key for each item (optional). Defaults to index. */
  keyExtractor?: (item: T, index: number) => React.Key;
  /** Optional grid container class. */
  gridClassName?: string;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

function Grid<T>({
  items,
  renderCard,
  columns = 3,
  keyExtractor,
  gridClassName = "",
  threeD = false,
}: GridProps<T>) {
  const gridColsClass =
    columns === 1
      ? styles.gridCols1
      : columns === 2
        ? styles.gridCols2
        : columns === 4
          ? styles.gridCols4
          : styles.gridCols3;

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

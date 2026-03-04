import { type ReactNode, type Key } from "react";
import { cn } from "../../utils/cn";
import styles from "./List.module.css";

type BaseListItem = { id?: number | string };

export interface ListProps<T extends BaseListItem> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  listClassName?: string;
  keyExtractor?: (item: T, index: number) => Key;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
}

function List<T extends BaseListItem>({
  items,
  renderItem,
  listClassName = "",
  keyExtractor,
  threeD = false,
}: ListProps<T>) {
  return (
    <div className={cn(styles.list, threeD && "solstice-ui-3d", listClassName)}>
      {items.map((item, index) => (
        <div
          key={
            keyExtractor
              ? keyExtractor(item, index)
              : (item as { id?: number | string })?.id ?? index
          }
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default List;

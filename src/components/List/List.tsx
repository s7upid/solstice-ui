import React from "react";
import { cn } from "../../utils/cn";

type BaseListItem = { id?: number | string };

export interface ListProps<T extends BaseListItem> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  listClassName?: string;
  keyExtractor?: (item: T, index: number) => React.Key;
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
    <div className={cn("w-full space-y-1", threeD && "solstice-ui-3d", listClassName)}>
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

import React, { useState, useCallback, useMemo, createContext, useContext, memo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Accordion.module.css";

type AccordionMode = "single" | "multiple";

interface AccordionContextValue {
  mode: AccordionMode;
  expanded: Set<string>;
  toggle: (id: string) => void;
  register: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");
  return ctx;
}

export interface AccordionProps {
  /** "single" = one item open at a time; "multiple" = allow multiple open. Default "single". */
  type?: AccordionMode;
  /** Fixed height (px) so open/close doesn't change size. Omit for auto height based on content. */
  contentHeight?: number;
  /** Initial expanded item ids (uncontrolled). */
  defaultExpanded?: string[];
  /** Controlled expanded ids. When set, use onExpandedChange to update. */
  expanded?: string[];
  /** Called when expanded set changes (controlled). */
  onExpandedChange?: (expanded: string[]) => void;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  type = "single",
  contentHeight,
  defaultExpanded = [],
  expanded: controlledExpanded,
  onExpandedChange,
  threeD = false,
  className,
  children,
}) => {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded)
  );
  const isControlled = controlledExpanded !== undefined;
  const expandedSet = useMemo(
    () => (isControlled ? new Set(controlledExpanded ?? []) : internalExpanded),
    [isControlled, controlledExpanded, internalExpanded]
  );
  const idsRef = React.useRef<string[]>([]);

  const register = useCallback((id: string) => {
    idsRef.current.push(id);
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(expandedSet);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (type === "single") next.clear();
        next.add(id);
      }
      const nextArr = Array.from(next);
      if (!isControlled) setInternalExpanded(next);
      onExpandedChange?.(nextArr);
    },
    [type, expandedSet, isControlled, onExpandedChange]
  );

  const value: AccordionContextValue = {
    mode: type,
    expanded: expandedSet,
    toggle,
    register,
  };

  return (
    <AccordionContext.Provider value={value}>
      <div
        className={cn(styles.accordion, threeD && "solstice-ui-3d", className)}
        style={
          contentHeight != null
            ? { height: contentHeight, minHeight: contentHeight }
            : undefined
        }
        data-fixed-height={contentHeight != null ? "true" : undefined}
        role="region"
        aria-label="Accordion"
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  /** Unique id for this item (required for expand/collapse and accessibility). */
  id: string;
  /** Header content (clickable). */
  header: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  header,
  disabled = false,
  className,
  children,
}) => {
  const { expanded, toggle, register } = useAccordion();
  const contentId = `${id}-panel`;
  const headerId = `${id}-header`;
  const isExpanded = expanded.has(id);

  React.useEffect(() => {
    register(id);
  }, [id, register]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <div
      className={cn(styles.item, className)}
      data-expanded={isExpanded}
      data-disabled={disabled || undefined}
    >
      <h3 className={styles.heading}>
        <button
          type="button"
          id={headerId}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          aria-disabled={disabled}
          disabled={disabled}
          className={styles.trigger}
          onClick={() => !disabled && toggle(id)}
          onKeyDown={handleKeyDown}
        >
          <span className={styles.triggerText}>{header}</span>
          <ChevronDown
            className={cn(styles.icon, isExpanded && styles.iconExpanded)}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={cn(styles.panel, isExpanded && styles.panelOpen)}
        hidden={!isExpanded}
      >
        <div className={styles.panelInner}>{children}</div>
      </div>
    </div>
  );
};

const AccordionWithItem = Object.assign(memo(Accordion), {
  Item: memo(AccordionItem),
});

export default AccordionWithItem;

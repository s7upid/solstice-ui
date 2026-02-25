import React, { useRef, memo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import Card from "../Card/Card";
import styles from "./StackedCardsDeck.module.css";

export interface QueueCardItem {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
}

export interface StackedCardsDeckProps {
  items: QueueCardItem[];
  containerHeight?: number;
  cardHeight?: number;
  spacing?: number;
  className?: string;
}

const StackedCardsDeck: React.FC<StackedCardsDeckProps> = ({
  items,
  containerHeight = 80,
  cardHeight = 320,
  spacing = 140,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [bottomPadding, setBottomPadding] = useState(0);

  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  // Stop scroll when last card is fully in view: use measured content height, then correct by actual scrollHeight
  useEffect(() => {
    const el = scrollRef.current;
    const stack = stackRef.current;
    if (!el || !stack || !items.length) return;

    const updatePadding = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!el.isConnected) return;
          if (items.length <= 1) {
            setBottomPadding(0);
            return;
          }
          const { paddingTop, paddingBottom } = getComputedStyle(el);
          const containerPaddingY =
            (parseFloat(paddingTop) || 0) + (parseFloat(paddingBottom) || 0);
          const viewportHeight = el.clientHeight;
          const scrollToLast = (items.length - 1) * (cardHeight + spacing);
          const desiredScrollHeight = viewportHeight + scrollToLast;

          const measuredContentHeight = Array.from(stack.children).reduce(
            (sum, child) => {
              const style = getComputedStyle(child);
              const marginBottom = parseFloat(style.marginBottom) || 0;
              return sum + (child as HTMLElement).offsetHeight + marginBottom;
            },
            0
          );
          const desiredStackHeight = desiredScrollHeight - containerPaddingY;
          const rawPadding = Number.isFinite(
            desiredStackHeight - measuredContentHeight
          )
            ? desiredStackHeight - measuredContentHeight
            : 0;
          const maxPadding = Math.max(containerPaddingY, 80);
          const padding = Math.max(0, Math.min(rawPadding, maxPadding));
          setBottomPadding(padding);

          // After React applies padding, trim if scroll height still exceeds desired
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!el.isConnected) return;
              const excess = el.scrollHeight - desiredScrollHeight;
              if (excess > 1) {
                setBottomPadding((p) => Math.max(0, p - excess));
              }
            });
          });
        });
      });
    };

    updatePadding();
    const ro = new ResizeObserver(updatePadding);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length, cardHeight, spacing]);

  if (!items.length) {
    return (
      <div className={cn(styles.wrapper, className)}>
        <div
          ref={scrollRef}
          className={styles.scrollContainer}
          style={{ height: 0 }}
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      <div
        ref={scrollRef}
        className={styles.scrollContainer}
        style={{ height: `${containerHeight}vh` }}
      >
        <div
          ref={stackRef}
          className={styles.stack}
          style={{ paddingBottom: bottomPadding }}
        >
          {items.map((item, index) => {
  const start = index / items.length;
  const end = (index + 1) / items.length;

  // Active card slightly scales up
  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end],
    [0.98, 1, 0.96]
  );

  // Fade depth
  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.85]
  );

  // Progressive rotation (deeper cards rotate more)
  const rotate = useTransform(
    scrollYProgress,
    [start, end],
    [0, -1.5 - index * 0.3]
  );

  // Slight lift for previous cards
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [0, -12]
  );

  // Subtle shadow intensity
  const shadow = useTransform(
    scrollYProgress,
    [start - 0.1, start, end],
    [
      "0 8px 20px rgba(0,0,0,0.12)",
      "0 20px 40px rgba(0,0,0,0.18)",
      "0 8px 20px rgba(0,0,0,0.12)",
    ]
  );

  return (
    <motion.div
      key={index}
      className={styles.cardWrapper}
      style={{
        height: cardHeight,
        marginBottom: spacing,
        scale,
        opacity,
        rotate,
        y,
        boxShadow: shadow,
        zIndex: index + 1,
      }}
    >
      <Card
        title={item.title}
        description={item.description}
        imageSrc={item.imageSrc}
        imageAlt={item.imageAlt ?? ""}
        actionLabel={item.actionLabel}
        actionIcon={item.actionIcon}
        onAction={item.onAction}
        className={styles.card}
      />
    </motion.div>
  );
})}
        </div>
      </div>
    </div>
  );
};

export default memo(StackedCardsDeck);
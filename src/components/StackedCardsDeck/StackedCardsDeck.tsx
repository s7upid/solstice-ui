import React, { useRef, memo } from "react";
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

  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  if (!items.length) return null;

  return (
    <div className={cn(styles.wrapper, className)}>
      <div
        ref={scrollRef}
        className={styles.scrollContainer}
        style={{ height: `${containerHeight}vh` }}
      >
        <div
          className={styles.stack}
          style={{ paddingBottom: spacing }}
        >
          {items.map((item, index) => {
            const start = index / items.length;
            const end = (index + 1) / items.length;

            const scale = useTransform(
              scrollYProgress,
              [start, end],
              [1, 0.96]
            );

            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [1, 0.9]
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
                  zIndex: index + 1
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
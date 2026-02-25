import React, { useState, useCallback, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Carousel.module.css";

export interface CarouselProps {
  /** Slide content (each child is one slide) */
  children: React.ReactNode;
  /** Controlled active index. If undefined, uses internal state. */
  activeIndex?: number;
  /** Called when the active index changes (e.g. user clicks next/prev or a dot) */
  onActiveIndexChange?: (index: number) => void;
  /** Show previous/next arrow buttons (default true) */
  showArrows?: boolean;
  /** Show dot indicators (default true) */
  showDots?: boolean;
  /** Auto-advance to next slide (default false) */
  autoPlay?: boolean;
  /** Auto-play interval in ms (default 5000) */
  interval?: number;
  /** Optional aria label for the carousel region */
  ariaLabel?: string;
  /** When true, adds a 3D-style shadow (bottom and right). */
  threeD?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  activeIndex: controlledIndex,
  onActiveIndexChange,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  interval = 5000,
  ariaLabel = "Carousel",
  threeD = false,
  className,
}) => {
  const slides = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children]
  );

  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled
    ? Math.max(0, Math.min(controlledIndex, slides.length - 1))
    : internalIndex;

  const setIndex = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(i, slides.length - 1));
      if (!isControlled) setInternalIndex(next);
      onActiveIndexChange?.(next);
    },
    [isControlled, onActiveIndexChange, slides.length]
  );

  const goNext = useCallback(() => {
    setIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, slides.length, setIndex]);

  const goPrev = useCallback(() => {
    setIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  }, [activeIndex, slides.length, setIndex]);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const id = setInterval(goNext, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, goNext, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className={cn(styles.carousel, threeD && "solstice-ui-3d", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className={styles.viewport}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              styles.slide,
              i === activeIndex && styles.slideActive
            )}
            role="group"
            aria-roledescription="slide"
            aria-hidden={i !== activeIndex}
          >
            {slide}
          </div>
        ))}
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            className={cn(styles.arrow, styles.arrowLeft)}
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className={styles.arrowIcon} />
          </button>
          <button
            type="button"
            className={cn(styles.arrow, styles.arrowRight)}
            onClick={goNext}
            aria-label="Next slide"
          >
            <ChevronRight className={styles.arrowIcon} />
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Slide ${i + 1}`}
              className={cn(styles.dot, i === activeIndex && styles.dotActive)}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

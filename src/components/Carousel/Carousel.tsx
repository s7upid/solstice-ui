import { Children, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Carousel.module.css";

export interface CarouselProps {
  children: ReactNode;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  showArrows?: boolean;
  /** "experimentation" = arrows on hover; "glide" = pill button; "visible" = always-on arrow */
  arrowVariant?: "experimentation" | "glide" | "visible";
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
  ariaLabel?: string;
  threeD?: boolean;
  /** "single" = one slide; "peek" = prev/next visible, center active */
  layout?: "single" | "peek";
  /** When layout="peek", center slide width as fraction (0–1). Default 0.55 */
  peekSlideWidth?: number;
  className?: string;
}

function Carousel({
  children,
  activeIndex: controlledIndex,
  onActiveIndexChange,
  showArrows = true,
  arrowVariant = "experimentation",
  showDots = true,
  autoPlay = false,
  interval = 5000,
  ariaLabel = "Carousel",
  threeD = false,
  layout = "single",
  peekSlideWidth = 0.55,
  className,
}: CarouselProps) {
  const slides = useMemo(
    () => Children.toArray(children).filter(Boolean),
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

  const isPeek = layout === "peek";

  return (
    <div
      className={cn(
        styles.carousel,
        threeD && "solstice-ui-3d",
        isPeek && styles.carouselPeek,
        className
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className={styles.viewport}
        style={
          isPeek
            ? {
                ["--peek-active" as string]: activeIndex,
                ["--peek-width-pct" as string]: Math.round(peekSlideWidth * 100),
              }
            : undefined
        }
      >
        {isPeek ? (
          <div className={styles.track}>
            {slides.map((slide, i) => (
              <div
                key={i}
                className={cn(
                  styles.slidePeek,
                  i === activeIndex && styles.slidePeekActive
                )}
                role="group"
                aria-roledescription="slide"
              >
                {slide}
              </div>
            ))}
          </div>
        ) : (
          slides.map((slide, i) => (
            <div
              key={i}
              className={cn(styles.slide, i === activeIndex && styles.slideActive)}
              role="group"
              aria-roledescription="slide"
              aria-hidden={i !== activeIndex}
            >
              {slide}
            </div>
          ))
        )}
        {showArrows && slides.length > 1 && (
          <>
            <button
              type="button"
              className={cn(
                styles.arrowZone,
                styles.arrowZoneLeft,
                arrowVariant === "glide" && styles.arrowZonePill,
                arrowVariant === "visible" && styles.arrowZoneVisible
              )}
              onClick={goPrev}
              aria-label="Previous slide"
            >
              {arrowVariant === "glide" ? (
                <span className={styles.arrowPillCircle}>
                  <ChevronLeft className={styles.arrowPillIcon} aria-hidden />
                </span>
              ) : (
                <ChevronLeft className={styles.arrowIcon} aria-hidden />
              )}
            </button>
            <button
              type="button"
              className={cn(
                styles.arrowZone,
                styles.arrowZoneRight,
                arrowVariant === "glide" && styles.arrowZonePill,
                arrowVariant === "visible" && styles.arrowZoneVisible
              )}
              onClick={goNext}
              aria-label="Next slide"
            >
              {arrowVariant === "glide" ? (
                <span className={styles.arrowPillCircle}>
                  <ChevronRight className={styles.arrowPillIcon} aria-hidden />
                </span>
              ) : (
                <ChevronRight className={styles.arrowIcon} aria-hidden />
              )}
            </button>
          </>
        )}
      </div>

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
}

export default Carousel;

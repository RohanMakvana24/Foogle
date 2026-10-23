"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { buildSrcSet, buildAvifSrcSet } from '../../src/lib/imageSrcSet';

// Local gallery fallback (used only when fewer than 4 images are supplied).
// All assets live in /public/images/photos so the site works fully offline.
const DEFAULT_GALLERY_IMAGES = [
  "/images/photos/woodfired-pizza.webp",
  "/images/photos/cold-coffee.webp",
  "/images/photos/sizzling-brownie.webp",
  "/images/photos/white-penne-pasta.webp",
  "/images/photos/cafe-interior.webp",
  "/images/photos/barista-pour.webp",
  "/images/photos/paneer-tabasco-pizza.webp",
  "/images/photos/blueberry-shake.webp",
  "/images/photos/brunch-pancakes.webp",
  "/images/photos/nachos.webp",
  "/images/photos/pav-bhaji.webp",
  "/images/photos/nutella-waffle.webp",
];

export interface ImageCardProps {
  src: string;
  alt?: string;
  onLoad?: () => void;
  onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt = "Foogle Cafe Gallery Moment",
  onLoad,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full h-[145px] sm:h-[240px] md:h-[320px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
      style={{
        backgroundColor: "var(--color-bg-surface)",
        borderColor: "var(--color-card-border)",
      }}
    >
      <picture className="contents">
        <source
          type="image/avif"
          srcSet={buildAvifSrcSet(src)}
          sizes="(max-width: 640px) 80vw, 460px"
        />
        <img
          src={src}
          srcSet={buildSrcSet(src)}
          sizes="(max-width: 640px) 80vw, 460px"
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={onLoad}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </picture>
      {/* Subtle hover gradient & expand badge */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-3 pointer-events-none">
        <span className="text-[11px] font-medium text-white/90 drop-shadow-sm truncate">
          View Detail
        </span>
        <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export interface ThreeDParallaxUnfurlingGalleryProps {
  images?: string[];
  useWindowScroll?: boolean;
  className?: string;
  heightClass?: string;
  onImageClick?: (src: string, index: number) => void;
}

export default function ThreeDParallaxUnfurlingGallery({
  images = DEFAULT_GALLERY_IMAGES,
  useWindowScroll = false,
  className = "",
  heightClass = "h-[240vh] sm:h-[280vh] md:h-[320vh]",
  onImageClick,
}: ThreeDParallaxUnfurlingGalleryProps) {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    const activeList =
      images && images.length >= 4 ? images : DEFAULT_GALLERY_IMAGES;
    const col1Base = activeList.filter((_, i) => i % 4 === 0);
    const col2Base = activeList.filter((_, i) => i % 4 === 1);
    const col3Base = activeList.filter((_, i) => i % 4 === 2);
    const col4Base = activeList.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, [images]);

  // LINKED SCROLL: Supports both in-page window scroll and container scroll
  const { scrollYProgress } = useScroll(
    useWindowScroll
      ? {
          target: containerRef,
          offset: ["start start", "end end"],
        }
      : {
          target: containerRef,
          container: scrollWrapperRef,
          offset: ["start start", "end end"],
        }
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.4,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 640);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 3D Matrix animations (smooth & natural angles)
  const rotateY = useTransform(smoothProgress, [0.05, 1], [-32, -4]);
  const rotateX = useTransform(smoothProgress, [0.05, 1], [18, 2]);
  const rotateZ = useTransform(smoothProgress, [0.05, 1], [10, 1]);
  const translateZ = useTransform(smoothProgress, [0.05, 1], [-550, 0]);

  // Track columns parallax animations
  const yCol1 = useTransform(smoothProgress, [0.05, 1], ["0%", "-30%"]);
  const yCol2 = useTransform(smoothProgress, [0.05, 1], ["-30%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0.05, 1], ["0%", "-30%"]);
  const yCol4 = useTransform(smoothProgress, [0.05, 1], ["-20%", "15%"]);

  // Mobile 4-to-2 column transition transforms:
  // Starts with 4 columns side-by-side, then as user scrolls, cols 3 & 4 fade/shrink to leave 2 big clean columns!
  const col12Width = useTransform(smoothProgress, (p) => {
    if (!isMobile) return "24vw";
    const clamped = Math.min(Math.max((p - 0.15) / (0.70 - 0.15), 0), 1);
    const val = 27 + clamped * (43 - 27);
    return `${val}vw`;
  });

  const col34Width = useTransform(smoothProgress, (p) => {
    if (!isMobile) return "24vw";
    const clamped = Math.min(Math.max((p - 0.15) / (0.70 - 0.15), 0), 1);
    const val = 27 * (1 - clamped);
    return `${val}vw`;
  });

  const col34Opacity = useTransform(smoothProgress, (p) => {
    if (!isMobile) return 1;
    const clamped = Math.min(Math.max((p - 0.18) / (0.65 - 0.18), 0), 1);
    return 1 - clamped;
  });

  const col34Scale = useTransform(smoothProgress, (p) => {
    if (!isMobile) return 1;
    const clamped = Math.min(Math.max((p - 0.18) / (0.65 - 0.18), 0), 1);
    return 1 - clamped * 0.25;
  });

  const content = (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClass} transition-colors duration-200 ${className}`}
      style={{
        backgroundColor: "var(--color-bg-page)",
      }}
    >
      {/* Sticky viewport frame - positioned cleanly below 72px fixed header, seamlessly filling the page */}
      <div className="sticky top-[72px] h-[calc(100vh-72px)] sm:h-[calc(100dvh-72px)] w-full flex justify-center items-center overflow-hidden">
        <div
          className="relative w-full h-full overflow-hidden flex items-center justify-center will-change-transform backface-hidden preserve-3d"
          style={{
            backgroundColor: "var(--color-bg-page)",
          }}
        >
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
            style={{ perspective: "1000px" }}
          >
            {/* Top & Bottom Soft Theme Vignettes (Warm Ivory in light, Deep Charcoal in dark) */}
            <div
              className="absolute inset-x-0 top-0 h-32 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-bg-page) 0%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(0deg, var(--color-bg-page) 0%, transparent 100%)",
              }}
            />

            {/* Left & Right Soft Theme Vignettes */}
            <div
              className="absolute inset-y-0 left-0 w-24 sm:w-36 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-bg-page) 0%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-24 sm:w-36 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(270deg, var(--color-bg-page) 0%, transparent 100%)",
              }}
            />

            {/* Subtle warm amber ambient spotlight in center */}
            <div
              className="absolute inset-0 z-10 pointer-events-none opacity-40 dark:opacity-20"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.12) 0%, transparent 70%)",
              }}
            />

            {/* Parallax Image Grid Matrix */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                rotateZ,
                z: translateZ,
                transformStyle: "preserve-3d",
              }}
              className="flex gap-2 sm:gap-4 md:gap-5 justify-center items-center w-[135vw] sm:w-[125vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
            >
              {/* Column 1 */}
              <motion.div
                style={{
                  y: yCol1,
                  width: col12Width,
                }}
                className="flex flex-col gap-2.5 sm:gap-4 md:gap-5 min-w-0 sm:min-w-[190px] md:min-w-[230px] pointer-events-auto"
              >
                {colMedia.col1.map((src, index) => (
                  <ImageCard
                    key={`col1-${index}`}
                    src={src}
                    onLoad={handleItemLoad}
                    onClick={() => onImageClick?.(src, index)}
                  />
                ))}
              </motion.div>

              {/* Column 2 */}
              <motion.div
                style={{
                  y: yCol2,
                  width: col12Width,
                }}
                className="flex flex-col gap-2.5 sm:gap-4 md:gap-5 min-w-0 sm:min-w-[190px] md:min-w-[230px] pointer-events-auto"
              >
                {colMedia.col2.map((src, index) => (
                  <ImageCard
                    key={`col2-${index}`}
                    src={src}
                    onLoad={handleItemLoad}
                    onClick={() => onImageClick?.(src, index)}
                  />
                ))}
              </motion.div>

              {/* Column 3 — visible on mobile at start (4 columns), unfurls/fades to 2 columns on scroll */}
              <motion.div
                style={{
                  y: yCol3,
                  width: col34Width,
                  opacity: col34Opacity,
                  scale: col34Scale,
                }}
                className="flex flex-col gap-2.5 sm:gap-4 md:gap-5 min-w-0 sm:min-w-[190px] md:min-w-[230px] overflow-hidden pointer-events-auto"
              >
                {colMedia.col3.map((src, index) => (
                  <ImageCard
                    key={`col3-${index}`}
                    src={src}
                    onLoad={handleItemLoad}
                    onClick={() => onImageClick?.(src, index)}
                  />
                ))}
              </motion.div>

              {/* Column 4 — visible on mobile at start (4 columns), unfurls/fades to 2 columns on scroll */}
              <motion.div
                style={{
                  y: yCol4,
                  width: col34Width,
                  opacity: col34Opacity,
                  scale: col34Scale,
                }}
                className="flex flex-col gap-2.5 sm:gap-4 md:gap-5 min-w-0 sm:min-w-[190px] md:min-w-[230px] overflow-hidden pointer-events-auto"
              >
                {colMedia.col4.map((src, index) => (
                  <ImageCard
                    key={`col4-${index}`}
                    src={src}
                    onLoad={handleItemLoad}
                    onClick={() => onImageClick?.(src, index)}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

  if (useWindowScroll) {
    return content;
  }

  return (
    <div
      ref={scrollWrapperRef}
      className="w-full h-screen overflow-y-auto overflow-x-hidden transition-colors duration-200"
      style={{
        backgroundColor: "var(--color-bg-page)",
      }}
    >
      {content}
    </div>
  );
}

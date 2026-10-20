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

const DEFAULT_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop&q=80", // Woodfired Pizza
  "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80",  // Cold Foam Latte
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",  // Sizzling Brownie
  "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&auto=format&fit=crop&q=80",  // Penne Pasta
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",  // Cafe Interior Vibe
  "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80",  // Barista Pour
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",  // Gourmet Pizza
  "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80",  // Berry Frappe
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80",  // Brunch Pancakes
  "https://images.unsplash.com/photo-1550614000-4b95d4ed798a?auto=format&fit=crop&w=600&q=80",   // Cafe Treats
  "https://cdn.21st.dev/assets/mirror/a9/a9c2900d44fe6288b344f447cb12a05f7e64c439479a8ccb977d3b20eb371156.jpg",
  "https://cdn.21st.dev/assets/mirror/29/29cf6ad39eb198c05b8d915fca0becfd3d270d510d32eaec1b886c426c681c67.jpg",
  "https://cdn.21st.dev/assets/mirror/61/6154958e9df110914005256ff2319d43a2c2e0fc8bb54e9f8bce7b91fdce5df1.jpg",
  "https://cdn.21st.dev/assets/mirror/6d/6db92aff3c02cce69e2c672a6dd4e99cbf5c55d68fbf08c460527e6c7c5b64ba.jpg",
  "https://cdn.21st.dev/assets/mirror/42/42ad2d0680dba697d578434e5af5620c7ab1c7c55bc36cec3b55eec8b7a79cbf.jpg",
  "https://cdn.21st.dev/assets/mirror/cd/cd3dc09b1bbed97cfc879e2c5e62fdbc68dc4070b6105e476410d70e31d1e459.jpg",
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
      className="group relative w-full h-[180px] sm:h-[240px] md:h-[320px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
      style={{
        backgroundColor: "var(--color-bg-surface)",
        borderColor: "var(--color-card-border)",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
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
              className="flex gap-3 sm:gap-4 md:gap-5 justify-center items-center w-[125vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
            >
              {/* Column 1 */}
              <motion.div
                style={{ y: yCol1 }}
                className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-[42vw] sm:w-[24vw] min-w-[140px] sm:min-w-[190px] md:min-w-[230px] pointer-events-auto"
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
                style={{ y: yCol2 }}
                className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-[42vw] sm:w-[24vw] min-w-[140px] sm:min-w-[190px] md:min-w-[230px] pointer-events-auto"
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

              {/* Column 3 (Tablet & Desktop only for silky mobile 60fps) */}
              <motion.div
                style={{ y: yCol3 }}
                className="hidden sm:flex flex-col gap-3 sm:gap-4 md:gap-5 w-[24vw] min-w-[190px] md:min-w-[230px] pointer-events-auto"
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

              {/* Column 4 (Tablet & Desktop only for silky mobile 60fps) */}
              <motion.div
                style={{ y: yCol4 }}
                className="hidden sm:flex flex-col gap-3 sm:gap-4 md:gap-5 w-[24vw] min-w-[190px] md:min-w-[230px] pointer-events-auto"
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

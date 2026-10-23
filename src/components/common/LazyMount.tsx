import React, { Suspense, useEffect, useRef, useState } from 'react';

interface LazyMountProps {
  children: React.ReactNode;
  /** Shown while the chunk is loading or before the section scrolls near. */
  placeholder?: React.ReactNode;
  /** Reserves space so the page does not jump while waiting. */
  minHeight?: string | number;
  /** How far before entering the viewport the heavy content starts loading. */
  rootMargin?: string;
  className?: string;
}

/**
 * Defers mounting expensive children (WebGL canvases, maps) until they are close
 * to the viewport. Text content stays in the normal DOM for SEO; only the heavy
 * interactive layer is delayed.
 */
export const LazyMount: React.FC<LazyMountProps> = ({
  children,
  placeholder = null,
  minHeight = '320px',
  rootMargin = '400px 0px',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isNear) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isNear, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={isNear ? undefined : { minHeight }}
    >
      {isNear ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
    </div>
  );
};

export default LazyMount;

"use client";
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Moon } from "@aliimam/icons";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface AnimatedBorderProps {
  radius?: number;
  size?: number;
  duration?: number;
  className?: string;
  gradientClassName?: string;
}

export function AnimatedBorder({
  radius = 12,
  size = 24,
  duration = 4,
  className,
  gradientClassName = "bg-gradient-to-r from-transparent via-amber-500 to-amber-400",
}: AnimatedBorderProps) {
  return (
    <div
      className={cn(
        "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
        "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        className
      )}
      style={{
        WebkitMaskImage:
          "linear-gradient(transparent,transparent),linear-gradient(#000,#000)",
        WebkitMaskClip: "padding-box, border-box",
        WebkitMaskComposite: "xor",
      }}
      aria-hidden="true"
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          gradientClassName
        )}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${radius}px)`,
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration,
          ease: "linear",
        }}
      />
    </div>
  );
}

export interface ButtonBorderProps extends ButtonProps {
  borderRadius?: number;
  borderDuration?: number;
  borderSize?: number;
  glowGradient?: string;
}

export const ButtonBorder = React.forwardRef<HTMLButtonElement, ButtonBorderProps>(
  (
    {
      children,
      className,
      variant = "outline",
      borderRadius = 12,
      borderDuration = 4,
      borderSize = 24,
      glowGradient,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn("relative overflow-hidden cursor-pointer", className)}
        {...props}
      >
        <AnimatedBorder
          radius={borderRadius}
          duration={borderDuration}
          size={borderSize}
          gradientClassName={glowGradient}
        />
        {children}
      </Button>
    );
  }
);
ButtonBorder.displayName = "ButtonBorder";

export function ButtonDemo() {
  return (
    <div className="flex gap-3">
      <Button variant={"outline"} className="relative">
        <div
          className={cn(
            "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
            "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
          )}
        >
          <motion.div
            className={cn(
              "absolute aspect-square bg-gradient-to-r from-transparent via-primary to-primary"
            )}
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            style={{
              width: 20,
              offsetPath: `rect(0 auto auto 0 round ${20}px)`,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "linear",
            }}
          />
        </div>
        <Moon />
      </Button>

      <Button variant={"outline"} className="relative">
        <div
          className={cn(
            "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
            "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
          )}
        >
          <motion.div
            className={cn(
              "absolute aspect-square bg-gradient-to-r from-transparent via-primary to-primary"
            )}
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            style={{
              width: 20,
              offsetPath: `rect(0 auto auto 0 round ${20}px)`,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "linear",
            }}
          />
        </div>
        Animated Border
      </Button>
    </div>
  );
}

export default ButtonDemo;

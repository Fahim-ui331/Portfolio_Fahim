import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Lightweight animated particles background — pure DOM + framer-motion.
 * No canvas dependency, SSR-safe, and respects reduced motion via CSS.
 */
export function ParticlesBG() {
  const dots = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-foreground/40"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)]" />
    </div>
  );
}
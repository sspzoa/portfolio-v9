"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/shared/components/button";

const ease = [0.25, 0.1, 0.25, 1] as const;

const nameLetters = "Seungpyo Suh".split("");

const _particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + Math.random() * 84}%`,
  top: `${8 + Math.random() * 84}%`,
  size: 3 + Math.random() * 5,
  delay: Math.random() * 6,
  duration: 5 + Math.random() * 4,
}));

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [_mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const aurora1X = useTransform(smoothX, [0, 1], [-80, 80]);
  const aurora1Y = useTransform(smoothY, [0, 1], [-60, 60]);
  const aurora2X = useTransform(smoothX, [0, 1], [60, -60]);
  const aurora2Y = useTransform(smoothY, [0, 1], [50, -50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative flex aspect-square w-full max-w-dvh flex-col items-center justify-center gap-spacing-800 overflow-hidden bg-background-standard-primary">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="home-aurora-1 absolute h-[400px] w-[400px] rounded-full blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(109,135,168,0.8) 0%, rgba(91,89,222,0.4) 50%, transparent 70%)",
              top: "10%",
              left: "15%",
              x: aurora1X,
              y: aurora1Y,
            }}
          />
          <motion.div
            className="home-aurora-2 absolute h-[350px] w-[350px] rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(109,135,168,0.7) 0%, rgba(183,86,232,0.35) 50%, transparent 70%)",
              bottom: "5%",
              right: "10%",
              x: aurora2X,
              y: aurora2Y,
            }}
          />
          <div
            className="home-aurora-3 absolute h-[300px] w-[300px] rounded-full blur-[70px]"
            style={{
              background:
                "radial-gradient(circle, rgba(5,127,255,0.45) 0%, rgba(109,135,168,0.3) 60%, transparent 70%)",
              top: "50%",
              left: "50%",
              marginTop: "-150px",
              marginLeft: "-150px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-spacing-800">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex font-semibold text-display">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.04, ease }}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="text-center text-body">
            Mobile & Frontend Engineer
            <br />
            belong to{" "}
            <Link
              className="duration-100 hover:opacity-50"
              href="https://github.com/dimipay"
              target="_blank"
              rel="noreferrer noopener">
              @dimipay
            </Link>
            ,{" "}
            <Link
              className="duration-100 hover:opacity-50"
              href="https://github.com/dimigo-din"
              target="_blank"
              rel="noreferrer noopener">
              @dimigo-din
            </Link>
            <br />
            Korea Digital Media High School 22nd
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
            className="relative">
            <div className="-inset-1 home-glow-ring absolute rounded-radius-400 bg-core-accent/10 blur-xl" />
            <div className="relative overflow-hidden rounded-radius-400">
              <Button onClick={() => router.push("/portfolio")} text="Explore my portfolio" />
              <div
                className="home-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ width: "100%" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

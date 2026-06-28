"use client";

import { SimplexNoise } from "@/lib/simplexNoise";
import { useEffect, useRef } from "react";

type WavePoint = {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
};

type WaveConfig = {
  lineColor: string;
  backgroundColor: string;
  waveSpeedX: number;
  waveSpeedY: number;
  waveAmpX: number;
  waveAmpY: number;
  xGap: number;
  yGap: number;
  friction: number;
  tension: number;
  maxCursorMove: number;
};

type CursorState = {
  x: number;
  y: number;
  lx: number;
  ly: number;
  sx: number;
  sy: number;
  v: number;
  vs: number;
  a: number;
  set: boolean;
};

const DEFAULT_CONFIG: WaveConfig = {
  lineColor: "rgba(253, 253, 253, 0.16)",
  backgroundColor: "#212121",
  waveSpeedX: 0.0125,
  waveSpeedY: 0.005,
  waveAmpX: 32,
  waveAmpY: 16,
  xGap: 10,
  yGap: 32,
  friction: 0.925,
  tension: 0.005,
  maxCursorMove: 100,
};

export function HeroWaves({
  lineColor = DEFAULT_CONFIG.lineColor,
  backgroundColor = DEFAULT_CONFIG.backgroundColor,
  waveSpeedX = DEFAULT_CONFIG.waveSpeedX,
  waveSpeedY = DEFAULT_CONFIG.waveSpeedY,
  waveAmpX = DEFAULT_CONFIG.waveAmpX,
  waveAmpY = DEFAULT_CONFIG.waveAmpY,
  xGap = DEFAULT_CONFIG.xGap,
  yGap = DEFAULT_CONFIG.yGap,
  friction = DEFAULT_CONFIG.friction,
  tension = DEFAULT_CONFIG.tension,
  maxCursorMove = DEFAULT_CONFIG.maxCursorMove,
}: Partial<WaveConfig>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boundsRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const noiseRef = useRef<SimplexNoise | null>(null);
  const pointsRef = useRef<WavePoint[][]>([]);
  const cursorRef = useRef<CursorState>({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });
  const configRef = useRef<WaveConfig>(DEFAULT_CONFIG);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    configRef.current = {
      lineColor,
      backgroundColor,
      waveSpeedX,
      waveSpeedY,
      waveAmpX,
      waveAmpY,
      xGap,
      yGap,
      friction,
      tension,
      maxCursorMove,
    };
  }, [
    lineColor,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    xGap,
    yGap,
    friction,
    tension,
    maxCursorMove,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    noiseRef.current = new SimplexNoise(Math.random());
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getPoint = (point: WavePoint, includeCursor = true) => ({
      x:
        Math.round(10 * (point.x + point.wave.x + (includeCursor ? point.cursor.x : 0))) /
        10,
      y:
        Math.round(10 * (point.y + point.wave.y + (includeCursor ? point.cursor.y : 0))) /
        10,
    });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      boundsRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
      canvas.width = rect.width;
      canvas.height = rect.height;
      buildGrid();
    };

    const buildGrid = () => {
      const { width, height } = boundsRef.current;
      const { xGap: gapX, yGap: gapY } = configRef.current;
      const cols = Math.ceil((width + 200) / gapX);
      const rows = Math.ceil((height + 30) / gapY);
      const offsetX = (width - gapX * cols) / 2;
      const offsetY = (height - gapY * rows) / 2;
      const grid: WavePoint[][] = [];

      for (let col = 0; col <= cols; col++) {
        const column: WavePoint[] = [];
        for (let row = 0; row <= rows; row++) {
          column.push({
            x: offsetX + gapX * col,
            y: offsetY + gapY * row,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }
        grid.push(column);
      }

      pointsRef.current = grid;
    };

    const setPointer = (clientX: number, clientY: number) => {
      const cursor = cursorRef.current;
      const bounds = boundsRef.current;
      cursor.x = clientX - bounds.left;
      cursor.y = clientY - bounds.top;

      if (!cursor.set) {
        cursor.sx = cursor.x;
        cursor.sy = cursor.y;
        cursor.lx = cursor.x;
        cursor.ly = cursor.y;
        cursor.set = true;
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      setPointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      setPointer(touch.clientX, touch.clientY);
    };

    const tick = (time: number) => {
      if (!container || !visibleRef.current) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const rect = container.getBoundingClientRect();
      boundsRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };

      const cursor = cursorRef.current;
      const noise = noiseRef.current;
      const config = configRef.current;
      const grid = pointsRef.current;

      cursor.sx += (cursor.x - cursor.sx) * 0.1;
      cursor.sy += (cursor.y - cursor.sy) * 0.1;

      const dx = cursor.x - cursor.lx;
      const dy = cursor.y - cursor.ly;
      const dist = Math.hypot(dx, dy);
      cursor.v = dist;
      cursor.vs += (dist - cursor.vs) * 0.1;
      cursor.vs = Math.min(100, cursor.vs);
      cursor.lx = cursor.x;
      cursor.ly = cursor.y;
      cursor.a = Math.atan2(dy, dx);

      grid.forEach((column) => {
        column.forEach((point) => {
          const waveAngle =
            12 *
            (noise?.perlin2(
              (point.x + time * config.waveSpeedX) * 0.002,
              (point.y + time * config.waveSpeedY) * 0.0015,
            ) ?? 0);

          point.wave.x = Math.cos(waveAngle) * config.waveAmpX;
          point.wave.y = Math.sin(waveAngle) * config.waveAmpY;

          const cursorDist = Math.hypot(point.x - cursor.sx, point.y - cursor.sy);
          const influence = Math.max(175, cursor.vs);

          if (cursorDist < influence) {
            const push = Math.cos(0.001 * cursorDist) * (1 - cursorDist / influence);
            point.cursor.vx += Math.cos(cursor.a) * push * influence * cursor.vs * 0.00065;
            point.cursor.vy += Math.sin(cursor.a) * push * influence * cursor.vs * 0.00065;
          }

          point.cursor.vx += (0 - point.cursor.x) * config.tension;
          point.cursor.vy += (0 - point.cursor.y) * config.tension;
          point.cursor.vx *= config.friction;
          point.cursor.vy *= config.friction;
          point.cursor.x += 2 * point.cursor.vx;
          point.cursor.y += 2 * point.cursor.vy;
          point.cursor.x = Math.min(
            config.maxCursorMove,
            Math.max(-config.maxCursorMove, point.cursor.x),
          );
          point.cursor.y = Math.min(
            config.maxCursorMove,
            Math.max(-config.maxCursorMove, point.cursor.y),
          );
        });
      });

      const { width, height } = boundsRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = config.lineColor;

      grid.forEach((column) => {
        const first = getPoint(column[0], false);
        ctx.moveTo(first.x, first.y);

        column.forEach((point, index) => {
          const isLast = index === column.length - 1;
          const current = getPoint(point, !isLast);
          const next = getPoint(column[index + 1] ?? column[column.length - 1], !isLast);
          ctx.lineTo(current.x, current.y);
          if (isLast) ctx.moveTo(next.x, next.y);
        });
      });

      ctx.stroke();
      rafRef.current = window.requestAnimationFrame(tick);
    };

    resize();
    rafRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(container);

    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="heroWaves"
      style={{ backgroundColor }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="heroWaves__canvas" />
    </div>
  );
}

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollBridge } from "@/lib/scrollBridge";
import { useCallback, useLayoutEffect, useRef, type ReactNode } from "react";

type ApproachStackProps = {
  children: ReactNode;
  className?: string;
};

const ITEM_DISTANCE = 50;
const ITEM_STACK_DISTANCE = 10;
const STACK_POSITION = 0.3;
const SCALE_END_POSITION = 0.1;
const BASE_SCALE = 0.85;
const ITEM_SCALE = 0.03;
const BLUR_AMOUNT = 3;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function ApproachStack({ children, className = "" }: ApproachStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const baseTopsRef = useRef<number[]>([]);
  const endTopRef = useRef(0);
  const lastTransforms = useRef(
    new Map<number, { translateY: number; scale: number; blur: number }>(),
  );
  const frameRef = useRef<number | null>(null);
  const pendingScrollRef = useRef(false);

  const measureLayout = useCallback(() => {
    const scroller = scrollerRef.current;
    const cards = cardRefs.current;
    if (!scroller || cards.length === 0) return;

    const saved = cards.map((card) => ({
      transform: card.style.transform,
      filter: card.style.filter,
    }));

    cards.forEach((card) => {
      card.style.transform = "none";
      card.style.filter = "none";
    });

    const scrollTop = scrollBridge.getScrollY();
    baseTopsRef.current = cards.map(
      (card) => card.getBoundingClientRect().top + scrollTop,
    );

    const endEl = scroller.querySelector<HTMLElement>(".approachStack__end");
    endTopRef.current = endEl
      ? endEl.getBoundingClientRect().top + scrollTop
      : baseTopsRef.current[baseTopsRef.current.length - 1] +
        window.innerHeight;

    cards.forEach((card, index) => {
      card.style.transform = saved[index].transform;
      card.style.filter = saved[index].filter;
    });
  }, []);

  const updateStack = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean);
    const baseTops = baseTopsRef.current;
    if (cards.length === 0 || baseTops.length !== cards.length) return;

    const scrollTop = scrollBridge.getScrollY();
    const containerHeight = window.innerHeight;
    const stackPx = STACK_POSITION * containerHeight;
    const scaleEndPx = SCALE_END_POSITION * containerHeight;
    const endScroll = Math.max(
      endTopRef.current - containerHeight * 0.5,
      baseTops[0] ?? 0,
    );

    cards.forEach((card, index) => {
      const cardTop = baseTops[index];
      const stackStart = cardTop - stackPx - ITEM_STACK_DISTANCE * index;
      const progress = clamp(
        (scrollTop - stackStart) /
          Math.max(1, cardTop - scaleEndPx - stackStart),
        0,
        1,
      );
      const targetScale = BASE_SCALE + index * ITEM_SCALE;
      const scale = 1 - progress * (1 - targetScale);

      let blur = 0;
      for (let passed = 0; passed < cards.length; passed++) {
        const passedStart =
          baseTops[passed] - stackPx - ITEM_STACK_DISTANCE * passed;
        if (scrollTop >= passedStart && index < passed) {
          blur = Math.max(blur, (passed - index) * BLUR_AMOUNT);
        }
      }

      let translateY = 0;
      if (scrollTop >= stackStart && scrollTop <= endScroll) {
        translateY = scrollTop - cardTop + stackPx + ITEM_STACK_DISTANCE * index;
      } else if (scrollTop > endScroll) {
        translateY = endScroll - cardTop + stackPx + ITEM_STACK_DISTANCE * index;
      }

      const next = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        blur: Math.round(blur * 100) / 100,
      };

      const prev = lastTransforms.current.get(index);
      if (
        !prev ||
        Math.abs(prev.translateY - next.translateY) > 0.5 ||
        Math.abs(prev.scale - next.scale) > 0.002 ||
        Math.abs(prev.blur - next.blur) > 0.1
      ) {
        card.style.transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale})`;
        card.style.filter = next.blur > 0 ? `blur(${next.blur}px)` : "";
        lastTransforms.current.set(index, next);
      }
    });
  }, []);

  const remeasure = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    cardRefs.current = Array.from(
      scroller.querySelectorAll<HTMLElement>(".approachStack__cardWrap"),
    );

    cardRefs.current.forEach((card, index, all) => {
      if (index < all.length - 1) {
        card.style.marginBottom = `${ITEM_DISTANCE}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    measureLayout();
    updateStack();
  }, [measureLayout, updateStack]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scheduleUpdate = () => {
      if (pendingScrollRef.current) return;
      pendingScrollRef.current = true;
      frameRef.current = window.requestAnimationFrame(() => {
        pendingScrollRef.current = false;
        updateStack();
      });
    };

    remeasure();

    const unsubscribe = scrollBridge.subscribe(scheduleUpdate);
    const onRefresh = () => {
      window.requestAnimationFrame(remeasure);
    };

    ScrollTrigger.addEventListener("refresh", onRefresh);
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    const delayedMeasure = window.setTimeout(remeasure, 450);

    return () => {
      window.clearTimeout(delayedMeasure);
      unsubscribe();
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      cardRefs.current = [];
      baseTopsRef.current = [];
      lastTransforms.current.clear();
    };
  }, [remeasure, updateStack]);

  return (
    <div className={`approachStack ${className}`.trim()} ref={scrollerRef}>
      <div className="approachStack__inner">
        {children}
        <div className="approachStack__end" aria-hidden="true" />
      </div>
    </div>
  );
}

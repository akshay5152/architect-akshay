import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollBridge } from "@/lib/scrollBridge";
import type { RefObject } from "react";

type HomeAnimationRefs = {
  loaderRef: RefObject<HTMLDivElement | null>;
  serviceStackRef: RefObject<HTMLDivElement | null>;
  servicesStoryRef: RefObject<HTMLElement | null>;
};

export function initHomeAnimations(refs: HomeAnimationRefs) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory("manual");

  document.documentElement.classList.add("lenis", "lenis-smooth");

  const lenis = new Lenis({
    duration: 0.82,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
  });
  lenis.scrollTo(0, { immediate: true });

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.defaults({ scroller: document.documentElement });

  let rafId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    scrollBridge.emit(lenis.scroll);
    rafId = window.requestAnimationFrame(raf);
  };
  rafId = window.requestAnimationFrame(raf);
  lenis.on("scroll", ScrollTrigger.update);
  scrollBridge.emit(lenis.scroll);

  const isDesktop = () => window.innerWidth > 900;
  const vh = () => window.innerHeight;

  const ctx = gsap.context(() => {
    gsap.set(".header", { y: -80, opacity: 0 });
    gsap.set(".hero__mainTitle .heroWord", { yPercent: 100 });
    gsap.set(".hero__subTitle .heroWord", { yPercent: -100 });
    gsap.set(".hero__subTitle .heroUnderline", {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(".hero__stats .statMask > *", { yPercent: 140 });
    gsap.set(".hero__stats .statLine", {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(".hero__about .lineMask > *", { yPercent: 106 });
    gsap.set(".strategyStripes span", {
      scaleY: 0,
      transformOrigin: "top center",
    });
    gsap.set(".servicesStory__introStage", { opacity: 0 });
    gsap.set(".servicesStory__zoomTitle", {
      scale: 1,
      transformOrigin: "center center",
    });
    gsap.set(".servicesStory__horizontalLine", {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(".servicesStory__stripes span", {
      scaleY: 0,
      transformOrigin: "top center",
    });
    gsap.set(".servicesStory__introWord", { yPercent: 110 });
    gsap.set(".servicesStory__plus", { opacity: 0, rotate: -45 });
    gsap.set(".servicesStory__plus--left", { x: -20 });
    gsap.set(".servicesStory__plus--right", { x: 20 });
    gsap.set(".servicesStory__barFill", {
      scaleY: 0,
      transformOrigin: "top center",
    });
    gsap.set(".servicesStory__barDot", { top: "0%" });
    gsap.set(".serviceStack", { autoAlpha: 0 });
    gsap.set(".servicesStory__cta", { autoAlpha: 0 });
    gsap.set(".servicesStory__ctaPlus", { opacity: 0, rotate: -45 });
    gsap.set(".servicesStory__ctaPlus--left", { x: -24 });
    gsap.set(".servicesStory__ctaPlus--right", { x: 24 });
    gsap.set(".serviceCard__lines .lineMask > *", { yPercent: 108 });
    gsap.set(".serviceCard__numberMask > *", { yPercent: 120 });
    gsap.set(".serviceCard__captionMask > *", { yPercent: 120 });
    gsap.set(".serviceCard__titleUnderline", {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(".servicesStory__cta h2 .lineMask > *", { yPercent: 110 });
    gsap.set(".servicesStory__cta p", { y: 36, opacity: 0 });
    gsap.set(".servicesStory__cta .cta__buttonTrack span:first-child", {
      yPercent: 0,
    });
    gsap.set(".servicesStory__cta .cta__buttonTrack span:last-child", {
      yPercent: 110,
    });

    const intro = gsap.timeline({ delay: 0.45 });
    intro
      .to(refs.loaderRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: "power4.inOut",
      })
      .to(".header", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
      .to(
        ".hero",
        { opacity: 1, y: 0, duration: 0.58, ease: "power3.out" },
        "-=0.48",
      )
      .to(
        ".hero__stats .statLine",
        { scaleX: 1, duration: 0.42, stagger: 0.08 },
        "-=0.32",
      )
      .to(
        ".hero__stats .statMask > *",
        { yPercent: 0, duration: 0.5, stagger: 0.08 },
        "-=0.36",
      )
      .to(
        ".hero__mainTitle .heroWord",
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.055,
          ease: "power4.out",
        },
        "-=0.26",
      )
      .to(
        ".hero__subTitle .heroWord",
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.055,
          ease: "power4.out",
        },
        "-=0.58",
      )
      .to(
        ".hero__subTitle .heroUnderline",
        { scaleX: 1, duration: 0.68, ease: "power3.inOut" },
        "-=0.32",
      )
      .to(
        ".hero__about .lineMask > *",
        { yPercent: 0, duration: 0.46, stagger: 0.038, ease: "power3.out" },
        "-=0.38",
      );

    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.45,
        invalidateOnRefresh: true,
      },
    })
      .to(".hero__titleInner", { yPercent: -20, scale: 0.955, ease: "none" }, 0)
      .to(".hero__stats", { yPercent: -30, opacity: 0.06, ease: "none" }, 0)
      .to(".hero__about", { yPercent: -24, opacity: 0.15, ease: "none" }, 0);

    gsap.timeline({
      scrollTrigger: {
        trigger: ".strategy",
        start: "top 85%",
        end: "top 20%",
        scrub: 0.45,
        invalidateOnRefresh: true,
      },
    }).to(".strategyStripes span", {
      scaleY: 1,
      stagger: 0.04,
      ease: "none",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: ".strategy__content",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    })
      .to(".strategy__headCopy", { y: -110, ease: "none" }, 0)
      .to(".planet", { y: -110, ease: "none" }, 0);

    const servicesStory = refs.servicesStoryRef.current;
    const serviceStack = refs.serviceStackRef.current;
    const serviceCards = gsap.utils.toArray<HTMLElement>(".serviceCard");

    if (servicesStory && serviceStack && serviceCards.length > 0) {
      const cardOffset = isDesktop()
        ? { xPercent: 115, yPercent: 95, rotate: -8, scale: 0.895 }
        : { xPercent: 8, yPercent: 120, rotate: -5, scale: 0.915 };

      gsap.set(serviceCards, {
        position: "absolute",
        inset: 0,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      });
      gsap.set(serviceCards.slice(1), cardOffset);

      const zoomHold = () => (isDesktop() ? 0.85 : 0.65);
      const zoomTransition = () => (isDesktop() ? 1.75 : 1.25);
      const introHold = () => (isDesktop() ? 1 : 0.75);
      const cardHold = () => (isDesktop() ? 1.15 : 0.9);
      const cardTransition = () => (isDesktop() ? 1.25 : 1);
      const ctaHold = () => (isDesktop() ? 0.85 : 0.65);

      const clarityEndScale = () => {
        const title = document.querySelector<HTMLElement>(
          ".servicesStory__zoomTitle",
        );
        if (!title) return isDesktop() ? 2.65 : 1.85;

        const baseWidth = title.offsetWidth || title.getBoundingClientRect().width;
        if (!baseWidth) return isDesktop() ? 2.65 : 1.85;

        const target = window.innerWidth * 0.94;
        return Math.min(isDesktop() ? 3.15 : 2.15, Math.max(1.35, target / baseWidth));
      };

      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: servicesStory,
          start: "top top",
          end: () => {
            const zoomLen = zoomHold() + zoomTransition() + introHold();
            const cardsLen =
              cardHold() +
              (serviceCards.length - 1) * (cardTransition() + cardHold());
            return `+=${vh() * (zoomLen + cardsLen + ctaHold() + 0.55)}`;
          },
          scrub: 0.75,
          pin: ".servicesStory__pin",
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: "labelsDirectional",
            duration: { min: 0.12, max: 0.28 },
            delay: 0.015,
            ease: "power1.inOut",
          },
        },
      });

      storyTimeline
        .addLabel("zoom")
        .to({}, { duration: zoomHold })
        .to(
          ".servicesStory__zoomTitle",
          {
            scale: clarityEndScale,
            yPercent: -8,
            ease: "none",
            duration: zoomTransition,
          },
          "zoom",
        )
        .to(
          ".servicesStory__wash",
          { opacity: 1, ease: "none", duration: 0.28 },
          "zoom+=0.68",
        )
        .to(
          ".servicesStory__zoomStage",
          { opacity: 0, ease: "none", duration: 0.18 },
          "zoom+=0.9",
        )
        .to(
          ".servicesStory__introStage",
          { opacity: 1, ease: "none", duration: 0.18 },
          "zoom+=0.9",
        )
        .addLabel("intro")
        .to(
          ".servicesStory__horizontalLine",
          { scaleX: 1, ease: "none", duration: 0.35 },
          "intro",
        )
        .to(
          ".servicesStory__stripes span",
          { scaleY: 1, stagger: 0.03, ease: "none", duration: 0.5 },
          "intro+=0.06",
        )
        .to(
          ".servicesStory__plus",
          { opacity: 1, x: 0, rotate: 0, ease: "none", duration: 0.35 },
          "intro+=0.18",
        )
        .to(
          ".servicesStory__introWord",
          { yPercent: 0, stagger: 0.028, ease: "none", duration: 0.48 },
          "intro+=0.22",
        )
        .to({}, { duration: introHold })
        .addLabel("cards")
        .to(
          ".servicesStory__introHead",
          { opacity: 0, y: -64, ease: "none", duration: 0.3 },
          "cards",
        )
        .to(
          ".servicesStory__stripes",
          { opacity: 0.25, ease: "none", duration: 0.2 },
          "cards",
        )
        .to(".serviceStack", { autoAlpha: 1, ease: "none", duration: 0.12 }, "cards")
        .to(
          ".serviceCard:nth-child(1) .serviceCard__numberMask > *",
          { yPercent: 0, ease: "none", duration: 0.28 },
          "cards+=0.08",
        )
        .to(
          ".serviceCard:nth-child(1) .serviceCard__lines .lineMask > *",
          { yPercent: 0, stagger: 0.032, ease: "none", duration: 0.42 },
          "cards+=0.12",
        )
        .to(
          ".serviceCard:nth-child(1) .serviceCard__titleUnderline",
          { scaleX: 1, ease: "none", duration: 0.32 },
          "cards+=0.24",
        )
        .to(
          ".serviceCard:nth-child(1) .serviceCard__captionMask > *",
          { yPercent: 0, ease: "none", duration: 0.28 },
          "cards+=0.26",
        )
        .addLabel("service-0")
        .to({}, { duration: cardHold });

      serviceCards.slice(1).forEach((card, index) => {
        const previousCard = serviceCards[index];
        const progress = (index + 1) / (serviceCards.length - 1);

        storyTimeline
          .to(
            previousCard,
            {
              scale: 0.968,
              opacity: 0.58,
              ease: "none",
              duration: cardTransition,
            },
            ">",
          )
          .to(
            ".servicesStory__barFill",
            { scaleY: progress, ease: "none", duration: cardTransition },
            "<",
          )
          .to(
            ".servicesStory__barDot",
            {
              top: `${progress * 100}%`,
              ease: "none",
              duration: cardTransition,
            },
            "<",
          )
          .to(
            card,
            {
              x: 0,
              y: 0,
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
              scale: 1,
              ease: "none",
              duration: cardTransition,
            },
            "<",
          )
          .to(
            `.serviceCard:nth-child(${index + 2}) .serviceCard__numberMask > *`,
            { yPercent: 0, ease: "none", duration: 0.28 },
            "<+=0.08",
          )
          .to(
            `.serviceCard:nth-child(${index + 2}) .serviceCard__lines .lineMask > *`,
            { yPercent: 0, stagger: 0.032, ease: "none", duration: 0.42 },
            "<+=0.12",
          )
          .to(
            `.serviceCard:nth-child(${index + 2}) .serviceCard__titleUnderline`,
            { scaleX: 1, ease: "none", duration: 0.32 },
            "<+=0.24",
          )
          .to(
            `.serviceCard:nth-child(${index + 2}) .serviceCard__captionMask > *`,
            { yPercent: 0, ease: "none", duration: 0.28 },
            "<+=0.26",
          )
          .addLabel(`service-${index + 1}`)
          .to({}, { duration: cardHold });
      });

      storyTimeline
        .addLabel("cta")
        .to(".serviceStack", { autoAlpha: 0, ease: "none", duration: 0.22 }, "cta")
        .to(
          ".servicesStory__bar",
          { opacity: 0, ease: "none", duration: 0.18 },
          "cta",
        )
        .to(
          ".servicesStory__cta",
          { autoAlpha: 1, ease: "none", duration: 0.15 },
          "cta+=0.08",
        )
        .to(
          ".servicesStory__ctaPlus",
          { opacity: 1, x: 0, rotate: 0, ease: "none", duration: 0.3 },
          "cta+=0.12",
        )
        .to(
          ".servicesStory__cta h2 .lineMask > *",
          { yPercent: 0, stagger: 0.06, ease: "none", duration: 0.38 },
          "cta+=0.18",
        )
        .to(
          ".servicesStory__cta p",
          { y: 0, opacity: 1, ease: "none", duration: 0.3 },
          "cta+=0.32",
        )
        .to(
          ".servicesStory__cta .cta__buttonTrack span:first-child",
          { yPercent: -110, ease: "none", duration: 0.24 },
          "cta+=0.48",
        )
        .to(
          ".servicesStory__cta .cta__buttonTrack span:last-child",
          { yPercent: 0, ease: "none", duration: 0.24 },
          "cta+=0.48",
        )
        .to({}, { duration: ctaHold });
    }

  });

  const refresh = () => {
    ScrollTrigger.refresh();
    scrollBridge.emit(lenis.scroll);
  };
  window.addEventListener("load", refresh);
  window.addEventListener("resize", refresh);
  requestAnimationFrame(refresh);
  setTimeout(refresh, 400);

  return () => {
    window.removeEventListener("load", refresh);
    window.removeEventListener("resize", refresh);
    window.cancelAnimationFrame(rafId);
    document.documentElement.classList.remove("lenis", "lenis-smooth");
    ctx.revert();
    lenis.destroy();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}

"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const stats = [
  ["20", "Projects Completed"],
  ["5", "Years of Experience"],
  ["100", "% Turnkey Delivery"],
];

const approach = [
  {
    title: "We Listen First",
    text: "Every great space starts with a conversation — not a sketchbook. We spend time understanding how you live, how you work, and how you want to feel in your space. Your routines, habits, and aspirations become the real brief. The design follows from there.",
    cta: "Our approach",
  },
  {
    title: "Design With Intention",
    text: "Once we understand you, we translate that into a concept — layouts, materials, moods, and 3D visuals that show you exactly what your space will feel like before a single wall goes up. No guesswork. No surprises. Just a clear vision you can see, feel, and refine.",
    cta: "See our designs",
  },
  {
    title: "Build With Precision",
    text: "Design on paper is one thing. Delivering it on site is another. We manage every detail of execution — vendors, materials, timelines, and quality checks. You stay informed without being overwhelmed. We handle the chaos so you don't have to.",
    cta: "How we execute",
  },
  {
    title: "Hand Over A Soul",
    text: "We don't just hand over a finished space — we hand over a feeling. The moment you walk in and think 'this is exactly me' — that's when we know the job is done. Every project ends with a space that's ready to live in, work in, and be proud of.",
    cta: "View completed projects",
  },
];

const services = [
  {
    title: "Architecture",
    slug: "architecture",
    caption: "( every square foot is intentional )",
    image: "/images/servicesOverview/DesignCardFirst.webp",
    text: "A beautiful space that doesn't function is just decoration. We begin with how you live, how you move, and what your space needs to do — then we design around that. From site analysis and floor planning to structural coordination, every decision is rooted in purpose. The result is a foundation that feels as good as it looks.",
  },
  {
    title: "Interior Design",
    slug: "interior",
    caption: "( design you can feel before it's built )",
    image: "/images/servicesOverview/EngineeringCardSecond.webp",
    text: "This is where a space gets its soul. We design full interiors — residential homes, commercial offices, cafe fitouts, and hospitality spaces — from concept boards and material palettes to detailed 3D visualization. You see exactly what your space will feel like before a single wall goes up. No guesswork. No surprises. Just a vision you can walk into.",
  },
  {
    title: "Turnkey Execution",
    slug: "turnkey",
    caption: "( you walk in, we handle everything else )",
    image: "/images/servicesOverview/StrategyCardThird.webp",
    text: "Design is only half the story. We stay with you through every stage of execution — managing vendors, materials, timelines, and on-site decisions from start to finish. You don't chase contractors. We do. You walk into a finished space that's ready to live in, work in, or open to the world. Exactly as designed. Not almost.",
  },
];

function Asset({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return <img className={className} src={src} alt={alt} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaderCount, setLoaderCount] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const approachRailRef = useRef<HTMLDivElement>(null);
  const serviceStackRef = useRef<HTMLDivElement>(null);
  const visibleStats = useMemo(
    () =>
      stats.map(([value, label]) => [
        Math.round((Number(value) * loaderCount) / 100).toString(),
        label,
      ]),
    [loaderCount],
  );

  useLayoutEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    window.history.scrollRestoration = "manual";
    resetScroll();

    const firstFrame = window.requestAnimationFrame(resetScroll);
    const secondFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resetScroll);
    });
    const settleTimer = window.setTimeout(resetScroll, 250);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(settleTimer);
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.clearScrollMemory("manual");

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.scrollTo(0, { immediate: true });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const dotX = gsap.quickTo(cursorDotRef.current, "x", {
      duration: 0.01,
      ease: "none",
    });
    const dotY = gsap.quickTo(cursorDotRef.current, "y", {
      duration: 0.01,
      ease: "none",
    });
    const ringX = gsap.quickTo(cursorRingRef.current, "x", {
      duration: 0.12,
      ease: "power3.out",
    });
    const ringY = gsap.quickTo(cursorRingRef.current, "y", {
      duration: 0.12,
      ease: "power3.out",
    });
    const hero = heroRef.current;
    const heroContour = hero?.querySelector<HTMLElement>(".heroContour");
    const heroTitle = hero?.querySelector<HTMLElement>(".hero__title");
    const heroAbout = hero?.querySelector<HTMLElement>(".hero__about");
    const heroStats = hero?.querySelector<HTMLElement>(".hero__stats");
    const contourX = heroContour
      ? (gsap.quickTo(heroContour, "--contour-x", {
          duration: 0.85,
          ease: "power3.out",
        }) as unknown as (value: string) => void)
      : undefined;
    const contourY = heroContour
      ? (gsap.quickTo(heroContour, "--contour-y", {
          duration: 0.85,
          ease: "power3.out",
        }) as unknown as (value: string) => void)
      : undefined;
    const contourBgX = heroContour
      ? (gsap.quickTo(heroContour, "--contour-bg-x", {
          duration: 0.9,
          ease: "power3.out",
        }) as unknown as (value: string) => void)
      : undefined;
    const contourBgY = heroContour
      ? (gsap.quickTo(heroContour, "--contour-bg-y", {
          duration: 0.9,
          ease: "power3.out",
        }) as unknown as (value: string) => void)
      : undefined;
    const titleX = heroTitle
      ? gsap.quickTo(heroTitle, "x", { duration: 0.7, ease: "power3.out" })
      : undefined;
    const titleY = heroTitle
      ? gsap.quickTo(heroTitle, "y", { duration: 0.7, ease: "power3.out" })
      : undefined;
    const aboutX = heroAbout
      ? gsap.quickTo(heroAbout, "x", { duration: 0.8, ease: "power3.out" })
      : undefined;
    const aboutY = heroAbout
      ? gsap.quickTo(heroAbout, "y", { duration: 0.8, ease: "power3.out" })
      : undefined;
    const statsY = heroStats
      ? gsap.quickTo(heroStats, "y", { duration: 0.8, ease: "power3.out" })
      : undefined;
    const cursorHandler = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);

      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      contourX?.(`${normalizedX * 120}px`);
      contourY?.(`${normalizedY * 86}px`);
      contourBgX?.(`${normalizedX * -180}px`);
      contourBgY?.(`${normalizedY * -140}px`);
      titleX?.(normalizedX * 18);
      titleY?.(normalizedY * 12);
      aboutX?.(normalizedX * -10);
      aboutY?.(normalizedY * -8);
      statsY?.(normalizedY * -10);
    };
    window.addEventListener("mousemove", cursorHandler, { passive: true });

    const jumpTargets = hero?.querySelectorAll<HTMLElement>(
      ".hero__title h1 span, .hero__title h1 strong, .hero__title h2",
    );
    const jumpHandler = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      gsap.to(target, {
        keyframes: [
          { y: -18, rotate: -1.4, duration: 0.16, ease: "power2.out" },
          { y: 0, rotate: 0, duration: 0.54, ease: "elastic.out(1, 0.46)" },
        ],
        overwrite: "auto",
      });
    };

    jumpTargets?.forEach((target) => {
      target.addEventListener("pointerenter", jumpHandler);
      target.addEventListener("click", jumpHandler);
    });

    const countTimer = window.setInterval(() => {
      setLoaderCount((current) => Math.min(current + 4, 100));
    }, 34);

    const ctx = gsap.context(() => {
      gsap.set(".header", { y: -80, opacity: 0 });
      gsap.set(".hero__stats p", { y: 24, opacity: 0 });
      gsap.set(".hero__title h1 > *, .hero__title h2", {
        yPercent: 110,
        rotateX: 16,
        opacity: 0,
      });
      gsap.set(".hero__about > *", { y: 30, opacity: 0 });
      gsap.set(".footerSprinkle", { yPercent: -130, opacity: 0 });
      gsap.set(".footer__wordmark", { yPercent: 18, opacity: 0 });

      const intro = gsap.timeline({ delay: 1.15 });
      intro
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.15,
          ease: "power4.inOut",
        })
        .to(".header", { y: 0, opacity: 1, duration: 0.75 }, "-=0.45")
        .to(
          ".hero",
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.55",
        )
        .to(
          ".hero__stats p",
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
          "-=0.35",
        )
        .to(
          ".hero__title h1 > *, .hero__title h2",
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .to(
          ".hero__about > *",
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.09 },
          "-=0.35",
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 80,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        });
      });

      const approachRail = approachRailRef.current;
      const approachCards = gsap.utils.toArray<HTMLElement>(".approachCard");
      if (approachRail && approachCards.length > 0) {
        const approachScrollDistance = window.innerWidth > 900 ? 0.72 : 0.9;

        gsap.set(approachCards, {
          position: "absolute",
          inset: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
        });
        gsap.set(approachCards.slice(1), {
          yPercent: 116,
          scale: 0.985,
        });

        const approachTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".strategy",
            start: "top top",
            end: () => `+=${window.innerHeight * approachScrollDistance * (approachCards.length - 1)}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (approachCards.length - 1),
              duration: 0.22,
              delay: 0.04,
              ease: "power1.inOut",
            },
          },
        });

        approachCards.slice(1).forEach((card, index) => {
          const previousCard = approachCards[index];
          approachTimeline
            .to(
              previousCard,
              {
                yPercent: -10,
                scale: 0.97,
                opacity: 0.82,
                ease: "none",
                duration: 1,
              },
              index,
            )
            .to(
              card,
              {
                yPercent: 0,
                scale: 1,
                ease: "none",
                duration: 1,
              },
              index,
            );
        });
      }

      const clarity = document.querySelector(".clarityTransition");
      if (clarity) {
        const clarityScale = window.innerWidth > 900 ? 22 : 9;
        const clarityEnd = window.innerWidth > 900 ? "+=320%" : "+=170%";

        const clarityTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: clarity,
            start: "top top",
            end: clarityEnd,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        clarityTimeline
          .to(".clarityTransition__title", {
            scale: clarityScale,
            yPercent: -3,
            ease: "none",
            duration: 0.92,
          })
          .to(
            ".clarityTransition__wash",
            {
              opacity: 1,
              ease: "none",
              duration: 0.08,
            },
            0.92,
          );
      }

      const servicesIntro = document.querySelector(".services__intro");
      if (servicesIntro) {
        const servicesIntroHold = window.innerWidth > 900 ? "+=110%" : "+=85%";

        ScrollTrigger.create({
          trigger: servicesIntro,
          start: "top top",
          end: servicesIntroHold,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      const serviceStack = serviceStackRef.current;
      const serviceCards = gsap.utils.toArray<HTMLElement>(".serviceCard");

      if (serviceStack && serviceCards.length > 0 && window.innerWidth > 900) {
        const serviceHoldDuration = 0.72;
        const serviceTransitionDuration = 1;

        gsap.set(serviceCards, {
          position: "absolute",
          inset: 0,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        });
        gsap.set(serviceCards.slice(1), {
          xPercent: 92,
          yPercent: 78,
          rotate: -6,
          scale: 0.92,
        });

        const serviceTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: serviceStack,
            start: "top top",
            end: () => `+=${window.innerHeight * serviceCards.length * 1.35}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: "labelsDirectional",
              duration: 0.24,
              delay: 0.04,
              ease: "power1.inOut",
            },
          },
        });

        serviceTimeline.addLabel("service-0").to({}, { duration: serviceHoldDuration });

        serviceCards.slice(1).forEach((card, index) => {
          serviceTimeline
            .to(card, {
              x: 0,
              y: 0,
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
              scale: 1,
              ease: "none",
              duration: serviceTransitionDuration,
            })
            .addLabel(`service-${index + 1}`)
            .to({}, { duration: serviceHoldDuration });
        });
      }

      const cta = document.querySelector(".cta");
      if (cta) {
        ScrollTrigger.create({
          trigger: cta,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.85}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: ".footer",
          start: "top 75%",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(
          ".footerSprinkle",
          {
            y: () => -window.innerHeight * 0.28,
            opacity: 0,
            scale: 0.94,
            rotate: "random(-24, 18)",
          },
          {
            y: () => window.innerHeight * 1.12,
            opacity: 1,
            scale: 1,
            rotate: "random(-20, 26)",
            stagger: 0.36,
            ease: "none",
            duration: 1.8,
          },
        )
        .to(".footerSprinkle", {
          y: () => window.innerHeight * 1.45,
          opacity: 0,
          scale: 0.96,
          rotate: "random(-18, 24)",
          stagger: 0.12,
          ease: "none",
          duration: 0.34,
        });

      gsap.to(".footer__wordmark", {
        yPercent: 0,
        opacity: 0.92,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 75%",
          end: "top 30%",
          scrub: 1,
        },
      });
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearInterval(countTimer);
      window.removeEventListener("mousemove", cursorHandler);
      jumpTargets?.forEach((target) => {
        target.removeEventListener("pointerenter", jumpHandler);
        target.removeEventListener("click", jumpHandler);
      });
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const links = menuRef.current?.querySelectorAll("nav a");
    if (!links) return;

    if (menuOpen) {
      gsap.fromTo(
        links,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.18,
        },
      );
    } else {
      gsap.set(links, { yPercent: 0, opacity: 1 });
    }
  }, [menuOpen]);

  return (
    <div>
      <div
        ref={cursorDotRef}
        className="cursorDot"
      />
      <div
        ref={cursorRingRef}
        className="cursorRing"
      />

      <div className="loader" aria-hidden="true" ref={loaderRef}>
        <div className="loader__grid" />
        <div className="loader__count">{loaderCount}%</div>
      </div>

      <header className="header container">
        <a className="brand" href="#">
          <Asset src="/images/brand/Logo.svg" alt="Logo" />
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="/projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="menuButton"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          Menu
        </button>
      </header>

      <aside
        className={`menuOverlay ${menuOpen ? "menuOverlay--open" : ""}`}
        ref={menuRef}
      >
        <button
          className="menuOverlay__close"
          type="button"
          onClick={() => setMenuOpen(false)}
        >
          Close
        </button>
        <Asset
          className="menuOverlay__logo"
          src="/images/brand/LogoDark.svg"
          alt="Logo"
        />
        <nav>
          {["About", "Projects", "Contact"].map((item, index) => {
            const hoverLabel =
              item === "About"
                ? "Our Soul"
                : item === "Projects"
                  ? "Spaces"
                  : "Let's Talk";

            return (
              <a
                href={item === "Projects" ? "/projects" : `#${item.toLowerCase()}`}
                key={item}
                onClick={() => setMenuOpen(false)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                <em>
                  {Array.from({ length: 8 }).map((_, labelIndex) => (
                    <i key={labelIndex}>{hoverLabel} ↗</i>
                  ))}
                </em>
              </a>
            );
          })}
        </nav>
        <div className="menuOverlay__bottom">
          <p>We design spaces with soul, where every corner tells a story.</p>
          <div>
            <a href="mailto:Bricknsoul@gmail.com">Bricknsoul@gmail.com</a>
            <a href="https://www.instagram.com/brick_n_soul/">instagram</a>
          </div>
        </div>
      </aside>

      <main>
        <section className="hero container" ref={heroRef}>
          <div className="heroContour" aria-hidden="true" />
          <div className="hero__stats">
            {visibleStats.map(([value, label]) => (
              <p key={label}>
                <span>{value}</span>
                {label.startsWith("%") ? label : `+ ${label}`}
              </p>
            ))}
          </div>

          <div className="hero__title">
            <h1>
              <span>We</span> <span>Design</span>{" "}
              <strong>Spaces</strong>
            </h1>
            <h2>
              With <em>Soul</em>
            </h2>
          </div>

          <div className="hero__about" id="about">
            <p className="eyebrow">About</p>
            <p>
              At Brick and Soul, we believe every space holds a story waiting
              to be told. We don&apos;t just design rooms. We design the feeling
              of coming home. With over a decade of experience in architecture
              and interior design, we specialize in creating soulful spaces
              tailored to client needs.
              <br />
              <br />
              Like that one tea kadai you always go back to — not for the tea,
              but for how it makes you feel. That&apos;s the soul we design into
              every space.
            </p>
            <a className="arrowLink" href="#approach">
              Learn more <span>↗</span>
            </a>
          </div>
          <a
            className="awwwardsBadge"
            href="https://www.instagram.com/brick_n_soul/"
            target="_blank"
            rel="noreferrer"
          >
            <strong>B.</strong>
            <span>Soul</span>
          </a>
        </section>

        <section className="strategy" id="approach">
          <div className="waveLayer" aria-hidden="true" />
          <div className="container strategy__head" data-reveal>
            <div>
              <p className="eyebrow">Process</p>
              <h2>
                How We Approach
                <br />
                Every Project?
              </h2>
            </div>
            <div className="planet">
              <Asset src="/images/other/Planet.svg" alt="Planet" />
              <span>brick and soul ✦ brick and soul ✦</span>
            </div>
          </div>

          <div className="approachRail" ref={approachRailRef}>
            {approach.map((item, index) => (
              <article
                className={`approachCard ${index % 2 ? "approachCard--green" : ""}`}
                key={item.title}
              >
                <p className="approachCard__number">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#projects">{item.cta} ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="clarityTransition" aria-label="Space plus soul">
          <div className="clarityTransition__wash" aria-hidden="true" />
          <div className="clarityTransition__inner">
            <span aria-hidden="true">+</span>
            <h2 className="clarityTransition__title">
              Space <em>+</em> Soul
            </h2>
            <span aria-hidden="true">+</span>
          </div>
        </section>

        <section className="services" id="projects">
          <div className="ticker" aria-hidden="true">
            <span>space meets soul • space meets soul •</span>
            <span>space meets soul • space meets soul •</span>
          </div>
          <div className="container services__intro" data-reveal>
            <span>✦</span>
            <h2>
              What You Get
              <br />
              When Space
              <br />
              Meets <em>Soul</em>
            </h2>
            <span>✦</span>
          </div>

          <div className="serviceStack" ref={serviceStackRef}>
            {services.map((service, index) => (
              <article
                className={`serviceCard serviceCard--${service.slug}`}
                key={service.title}
              >
                <div className="serviceCard__copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{service.text}</p>
                  <a href="#contact">{service.title} Learn more ↗</a>
                </div>
                <div className="serviceCard__visual">
                  <Asset src={service.image} alt={service.title} />
                  <h3>{service.title}</h3>
                  <p>{service.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta container" id="contact" data-reveal>
          <h2>
            Every Space has a story
            <br />
            let us find yours
          </h2>
          <p>
            From architecture and interior design to 3D visualization and
            turnkey execution, we shape spaces that feel personal.
          </p>
          <a href="mailto:Bricknsoul@gmail.com">Lets Talk.</a>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <a href="mailto:Bricknsoul@gmail.com">Bricknsoul@gmail.com</a>
            <p>Architecture, interiors, and turnkey spaces</p>
          </div>
          <nav>
            <a href="#">Overview</a>
            <a href="#contact">Contact</a>
            <a href="/projects">Projects</a>
            <a href="#about">About</a>
          </nav>
          <nav>
            <a href="https://www.instagram.com/brick_n_soul/">instagram</a>
          </nav>
          <p>©2026 All Rights Reserved</p>
        </div>
        <div className="footerSprinkles" aria-hidden="true">
          <span className="footerSprinkle footerSprinkle--one">KX</span>
          <span className="footerSprinkle footerSprinkle--two">Air Pods</span>
          <span className="footerSprinkle footerSprinkle--three">Moment</span>
          <span className="footerSprinkle footerSprinkle--four">Design</span>
          <span className="footerSprinkle footerSprinkle--five">Craft</span>
        </div>
        <div className="footer__wordmark" aria-hidden="true">
          BRICK&SOUL
        </div>
      </footer>
    </div>
  );
}

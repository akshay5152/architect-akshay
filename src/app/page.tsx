"use client";

import { ApproachStack } from "@/components/ApproachStack";
import { HeroWaves } from "@/components/HeroWaves";
import { SiteFooter } from "@/components/SiteFooter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHomeAnimations } from "@/lib/homeAnimations";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const aboutLines = [
  "I'm a web developer focused on building modern, fast, and",
  "reliable websites. I care not only about how a site looks, but",
  "also about how it performs, scales, and feels for real users. From",
  "clean code and responsive layouts to performance optimization and",
  "SEO, I make sure every project is built with attention to detail",
  "and long-term quality in mind.",
];

const stats = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  {
    value: 98.3,
    suffix: "/100",
    label: "Average Performance Score",
    decimal: true,
  },
];

const approach = [
  {
    title: "Performance First",
    text: "I focus on building websites that load fast and feel smooth from the first interaction. Performance is considered at every stage, from structure and assets to code quality and optimization, ensuring reliable results on real devices and networks.",
    cta: "Learn more",
  },
  {
    title: "Clean & Scalable Code",
    text: "I write clean, well-structured, and maintainable code with a strong focus on clarity and long-term scalability. This approach makes projects easier to understand, update, and extend over time, while reducing complexity and keeping the codebase reliable as it grows.",
    cta: "My workflow",
  },
  {
    title: "Modern UI & UX",
    text: "I design and build interfaces with clarity, usability, and consistency in mind. Layouts, interactions, and responsive behavior are carefully crafted to provide an intuitive experience that works seamlessly across all devices and screen sizes.",
    cta: "View approach",
  },
  {
    title: "SEO & Best Practices",
    text: "Websites are built using modern best practices and strong technical SEO foundations from the very beginning of the project. This includes clean structure, accessibility, semantic markup, and optimization techniques that support visibility, performance, and long-term growth.",
    cta: "See details",
  },
  {
    title: "Reliable Delivery",
    text: "From the initial idea to the final launch, I focus on clear communication, thoughtful planning, and reliable delivery at every stage of the process. Each project is carefully tested and refined to ensure stability, quality, and confidence when the product goes live.",
    cta: "How I work",
  },
];

const introLines = [
  ["What", "You", "Get"],
  ["When", "Clarity"],
  ["Meets"],
];

const services = [
  {
    title: "Design",
    slug: "design",
    caption: "( it's intention )",
    image: "/images/servicesOverview/DesignCardFirst.webp",
    lines: [
      "I work closely with brands to craft thoughtful, scalable",
      "design systems built for long-term growth and consistency,",
      "translating ideas into structured and cohesive visual",
      "language from art direction and strong visual foundations to",
      "responsive interfaces and polished digital experiences that",
      "feel intuitive, refined, and built to evolve over time.",
    ],
  },
  {
    title: "Engineering",
    slug: "engineering",
    caption: "( every L is data )",
    image: "/images/servicesOverview/EngineeringCardSecond.webp",
    lines: [
      "Web systems built to move fast, test ideas, and measure real",
      "results. Full-stack development across front-end, back-end,",
      "and databases, with experience in custom architectures and",
      "production-ready builds. From clean interfaces to reliable",
      "server logic, the focus is on performance, maintainability,",
      "and systems that scale without unnecessary complexity.",
    ],
  },
  {
    title: "Strategy",
    slug: "strategy",
    caption: "( choosing the right problem )",
    image: "/images/servicesOverview/StrategyCardThird.webp",
    lines: [
      "Strategic thinking built on precision, efficiency, and",
      "technical expertise. Every project considers goals,",
      "competitive context, SEO, and conversion from the start,",
      "forming a clear foundation for design and development. The",
      "process stays focused and deliberate, removing unnecessary",
      "discussions and early bottlenecks to keep projects moving",
      "fast and predictable.",
    ],
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
  const heroTitleInnerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const serviceStackRef = useRef<HTMLDivElement>(null);
  const servicesStoryRef = useRef<HTMLElement>(null);

  const visibleStats = useMemo(() => {
    const progress = Math.min(1, loaderCount / 100);
    return stats.map((stat) => {
      const current = stat.decimal
        ? (1 + (stat.value - 1) * progress).toFixed(1)
        : String(Math.max(1, Math.round(stat.value * progress)));
      return [current, stat.suffix, stat.label] as const;
    });
  }, [loaderCount]);

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
    const heroTitle = heroTitleInnerRef.current;
    const heroAbout = hero?.querySelector<HTMLElement>(".hero__about");
    const heroStats = hero?.querySelector<HTMLElement>(".hero__stats");

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
      titleX?.(normalizedX * 26);
      titleY?.(normalizedY * 16);
      aboutX?.(normalizedX * -14);
      aboutY?.(normalizedY * -12);
      statsY?.(normalizedY * -14);
    };
    window.addEventListener("mousemove", cursorHandler, { passive: true });

    const jumpTargets = hero?.querySelectorAll<HTMLElement>(".heroWord");
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
      setLoaderCount((current) => Math.min(current + 5, 100));
    }, 28);

    const destroyAnimations = initHomeAnimations({
      loaderRef,
      serviceStackRef,
      servicesStoryRef,
    });

    return () => {
      window.clearInterval(countTimer);
      window.removeEventListener("mousemove", cursorHandler);
      jumpTargets?.forEach((target) => {
        target.removeEventListener("pointerenter", jumpHandler);
        target.removeEventListener("click", jumpHandler);
      });
      destroyAnimations();
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
      <div ref={cursorDotRef} className="cursorDot" />
      <div ref={cursorRingRef} className="cursorRing" />

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
          {[
            { label: "About", hover: "My Journey" },
            { label: "Projects", hover: "Recent Work" },
            { label: "Contact", hover: "Let's Talk" },
          ].map((item, index) => (
            <a
              href={
                item.label === "Projects"
                  ? "/projects"
                  : `#${item.label.toLowerCase()}`
              }
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <em>
                {Array.from({ length: 8 }).map((_, labelIndex) => (
                  <i key={labelIndex}>
                    {item.hover} ↗
                  </i>
                ))}
              </em>
            </a>
          ))}
        </nav>
        <div className="menuOverlay__bottom">
          <p>
            My work is driven by clarity, performance, and attention to detail.
          </p>
          <div>
            <a href="mailto:chkstepan11@gmail.com">chkstepan11@gmail.com</a>
            <a href="https://www.instagram.com/chkstepan.dev/">instagram</a>
          </div>
        </div>
      </aside>

      <main>
        <section className="hero container" ref={heroRef}>
          <HeroWaves />

          <div className="hero__content">
            <div className="hero__stats">
              {visibleStats.map(([value, suffix, label]) => (
                <p key={label}>
                  <span className="statLine" aria-hidden="true" />
                  <span className="statMask">
                    <span>{value}</span>
                    {suffix} {label}
                  </span>
                </p>
              ))}
            </div>

            <div className="hero__title">
              <div className="hero__titleInner" ref={heroTitleInnerRef}>
                <h1 className="hero__mainTitle">
                  <div className="lineMask">
                    <span className="heroWord">I</span>
                  </div>{" "}
                  <div className="lineMask">
                    <span className="heroWord">Build</span>
                  </div>{" "}
                  <div className="lineMask">
                    <span className="heroWord">
                      Mo<span className="heroWord--accent">d</span>ern
                    </span>
                  </div>{" "}
                  <div className="lineMask">
                    <span className="heroWord heroWord--highlight">
                      Websites
                    </span>
                  </div>
                </h1>
                <h1 className="hero__subTitle">
                  <div className="lineMask">
                    <span className="heroWord">That</span>
                  </div>{" "}
                  <div className="lineMask">
                    <span className="heroWord heroWord--accent heroWord--underlined">
                      Work
                      <span className="heroUnderline" aria-hidden="true" />
                    </span>
                  </div>
                </h1>
              </div>
            </div>

            <div className="hero__about" id="about">
              <div className="lineMask">
                <p className="eyebrow">About</p>
              </div>
              <div className="hero__textBlock">
                <div className="hero__aboutLines">
                  {aboutLines.map((line) => (
                    <div className="lineMask" key={line}>
                      <p>{line}</p>
                    </div>
                  ))}
                </div>
                <div className="lineMask">
                  <a className="arrowLink" href="#strategy">
                    Learn more <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a
            className="awwwardsBadge"
            href="https://www.awwwards.com/sites/chkstepan"
            target="_blank"
            rel="noreferrer"
          >
            <strong>W.</strong>
            <span>Honors</span>
          </a>
        </section>

        <section className="strategy" id="strategy">
          <div className="strategyStripes" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="container strategy__content">
            <div className="strategy__head">
              <div className="strategy__headCopy">
                <p className="eyebrow">Strategy</p>
                <h2>
                  How I Approach
                  <br />
                  Every Project?
                </h2>
              </div>
              <div className="planet">
                <Asset src="/images/other/Planet.svg" alt="Planet" />
                <span>chkstepan ✦ chkstepan ✦</span>
              </div>
            </div>

            <ApproachStack>
              {approach.map((item, index) => (
                <div className="approachStack__cardWrap" key={item.title}>
                  <article
                    className={`approachCard ${index % 2 ? "approachCard--green" : ""}`}
                  >
                    <h3 className="approachCard__title">{item.title}</h3>
                    <p className="approachCard__description">{item.text}</p>
                    <div className="approachCard__link">
                      <a href="#projects">
                        <span className="approachCard__linkText">{item.cta}</span>
                        <span className="approachCard__linkArrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </div>
                    <span className="approachCard__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </article>
                </div>
              ))}
            </ApproachStack>
          </div>
        </section>

        <section className="servicesStory" id="projects" ref={servicesStoryRef}>
          <div className="servicesStory__pin">
            <div className="servicesStory__zoomStage">
              <div className="servicesStory__wash" aria-hidden="true" />
              <h2 className="servicesStory__zoomTitle">
                Clarity <em>+</em> Performance
              </h2>
            </div>

            <div className="servicesStory__introStage">
              <div className="servicesStory__horizontalLine" aria-hidden="true" />
              <div className="servicesStory__stripes" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>

              <div className="container servicesStory__introHead">
                <span className="servicesStory__plus servicesStory__plus--left">
                  +
                </span>
                <div className="servicesStory__introLines">
                  {introLines.map((words, lineIndex) => (
                    <div className="servicesStory__introLine" key={lineIndex}>
                      {words.map((word) => (
                        <div className="lineMask" key={word}>
                          <span className="servicesStory__introWord">{word}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="servicesStory__introLine servicesStory__introLine--cursor">
                    <span className="servicesStory__cursor" aria-hidden="true">
                      |
                    </span>
                  </div>
                </div>
                <span className="servicesStory__plus servicesStory__plus--right">
                  +
                </span>
              </div>

              <div className="servicesStory__bar" aria-hidden="true">
                <div className="servicesStory__barTrack">
                  <div className="servicesStory__barFill" />
                  <div className="servicesStory__barDot" />
                </div>
              </div>

              <div className="serviceStack" ref={serviceStackRef}>
                {services.map((service, index) => (
                  <article
                    className={`serviceCard serviceCard--${service.slug}`}
                    key={service.title}
                  >
                    <div className="serviceCard__overlay" aria-hidden="true" />
                    <div className="serviceCard__flex">
                      <div className="serviceCard__left">
                        <div className="serviceCard__head">
                          <div className="lineMask serviceCard__numberMask">
                            <span className="serviceCard__number">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <span className="serviceCard__separator" aria-hidden="true" />
                          <div className="serviceCard__lines">
                            {service.lines.map((line) => (
                              <div className="lineMask" key={line}>
                                <span>{line}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="serviceCard__actions">
                          <a className="serviceCard__titleLink" href="#contact">
                            <p>{service.title}</p>
                            <span className="serviceCard__titleUnderline" />
                          </a>
                          <a className="serviceCard__more" href="#contact">
                            <span>Learn more</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        </div>
                      </div>
                      <div className="serviceCard__image">
                        <span className="serviceCard__imageLine" aria-hidden="true" />
                        <Asset src={service.image} alt={service.title} />
                        <div className="lineMask serviceCard__captionMask">
                          <p>{service.caption}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="servicesStory__cta" id="contact">
                <span className="servicesStory__ctaPlus servicesStory__ctaPlus--left">
                  +
                </span>
                <span className="servicesStory__ctaPlus servicesStory__ctaPlus--right">
                  +
                </span>
                <h2>
                  <div className="lineMask">
                    <span>Ready to build something</span>
                  </div>
                  <div className="lineMask">
                    <span>that actually works?</span>
                  </div>
                </h2>
                <p>
                  Clear design, solid engineering, and focused strategy —
                  working together as one system.
                </p>
                <a className="cta__button" href="mailto:chkstepan11@gmail.com">
                  <span className="cta__buttonTrack">
                    <span>Let&apos;s talk</span>
                    <span>Let&apos;s talk</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

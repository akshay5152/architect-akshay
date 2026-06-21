"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";

const stats = [
  ["40", "Projects Completed"],
  ["5", "Years of Experience"],
  ["98", "/100 Average Performance Score"],
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

const services = [
  {
    title: "Design",
    caption: "( it's intention )",
    image: "/images/servicesOverview/DesignCardFirst.webp",
    text: "I work closely with brands to craft thoughtful, scalable design systems built for long-term growth and consistency, translating ideas into structured and cohesive visual language from art direction and strong visual foundations to responsive interfaces and polished digital experiences that feel intuitive, refined, and built to evolve over time.",
  },
  {
    title: "Engineering",
    caption: "( every L is data )",
    image: "/images/servicesOverview/EngineeringCardSecond.webp",
    text: "Web systems built to move fast, test ideas, and measure real results. Full-stack development across front-end, back-end, and databases, with experience in custom architectures and production-ready builds. From clean interfaces to reliable server logic, the focus is on performance, maintainability, and systems that scale without unnecessary complexity.",
  },
  {
    title: "Strategy",
    caption: "( choosing the right problem )",
    image: "/images/servicesOverview/StrategyCardThird.webp",
    text: "Strategic thinking built on precision, efficiency, and technical expertise. Every project considers goals, competitive context, SEO, and conversion from the start, forming a clear foundation for design and development. The process stays focused and deliberate, removing unnecessary discussions and early bottlenecks to keep projects moving fast and predictable.",
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

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
    const cursorHandler = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };
    window.addEventListener("mousemove", cursorHandler, { passive: true });

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
      if (approachRail && approachCards.length > 0 && window.innerWidth > 900) {
        gsap.set(approachCards, {
          position: "absolute",
          inset: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
        });
        gsap.set(approachCards.slice(1), { yPercent: 108 });

        const approachTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".strategy",
            start: "top top",
            end: () => `+=${window.innerHeight * 0.46 * (approachCards.length - 1)}`,
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
                yPercent: -18,
                scale: 0.985,
                opacity: 0.68,
                ease: "none",
                duration: 1,
              },
              index,
            )
            .to(
              card,
              {
                yPercent: 0,
                ease: "none",
                duration: 1,
              },
              index,
            );
        });
      }

      const clarity = document.querySelector(".clarityTransition");
      if (clarity) {
        gsap.fromTo(
          ".clarityTransition__title",
          { scale: 1, yPercent: 0 },
          {
            scale: 4.6,
            yPercent: -2,
            ease: "none",
            scrollTrigger: {
              trigger: clarity,
              start: "top top",
              end: "+=150%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const serviceStack = serviceStackRef.current;
      const serviceCards = gsap.utils.toArray<HTMLElement>(".serviceCard");

      if (serviceStack && serviceCards.length > 0) {
        gsap.set(serviceCards, {
          position: "absolute",
          inset: 0,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        });
        gsap.set(serviceCards.slice(1), {
          x: "100vw",
          y: "100vh",
          rotate: -4,
          scale: 0.94,
        });

        const serviceTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: serviceStack,
            start: "top top",
            end: () => `+=${window.innerHeight * (serviceCards.length - 1)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        serviceCards.slice(1).forEach((card) => {
          serviceTimeline.to(card, {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            ease: "none",
            duration: 1,
          });
        });
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearInterval(countTimer);
      window.removeEventListener("mousemove", cursorHandler);
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
                ? "My Journey"
                : item === "Projects"
                  ? "Recent Work"
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
          <p>My work is driven by clarity, performance, and attention to detail.</p>
          <div>
            <a href="mailto:chkstepan11@gmail.com">chkstepan11@gmail.com</a>
            <a href="https://www.instagram.com/chkstepan.dev">instagram</a>
            <a href="https://www.linkedin.com/company/chkstepan">linkedin</a>
            <a href="https://dribbble.com/chkstepan">dribbble</a>
          </div>
        </div>
      </aside>

      <main>
        <section className="hero container">
          <div className="heroContour" aria-hidden="true" />
          <div className="hero__stats">
            {visibleStats.map(([value, label]) => (
              <p key={label}>
                <span>{value}</span>
                {label.startsWith("/") ? label : `+ ${label}`}
              </p>
            ))}
          </div>

          <div className="hero__title">
            <h1>
              <span>I</span> <span>Build</span>{" "}
              <span>
                Mo<em>d</em>ern
              </span>{" "}
              <strong>Websites</strong>
            </h1>
            <h2>
              That <em>Work</em>
            </h2>
          </div>

          <div className="hero__about" id="about">
            <p className="eyebrow">About</p>
            <p>
              I&apos;m a web developer focused on building modern, fast, and
              reliable websites. I care not only about how a site looks, but
              also about how it performs, scales, and feels for real users.
              From clean code and responsive layouts to performance
              optimization and SEO, I make sure every project is built with
              attention to detail and long-term quality in mind.
            </p>
            <a className="arrowLink" href="#approach">
              Learn more <span>↗</span>
            </a>
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

        <section className="strategy" id="approach">
          <div className="waveLayer" aria-hidden="true" />
          <div className="container strategy__head" data-reveal>
            <div>
              <p className="eyebrow">Strategy</p>
              <h2>
                How I Approach
                <br />
                Every Project?
              </h2>
            </div>
            <div className="planet">
              <Asset src="/images/other/Planet.svg" alt="Planet" />
              <span>chkstepan ✦ chkstepan ✦ chkstepan ✦</span>
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

        <section className="clarityTransition" aria-label="Clarity plus performance">
          <div className="clarityTransition__inner">
            <span aria-hidden="true">+</span>
            <h2 className="clarityTransition__title">
              Clarity <em>+</em> Performance
            </h2>
            <span aria-hidden="true">+</span>
          </div>
        </section>

        <section className="services" id="projects">
          <div className="ticker" aria-hidden="true">
            <span>clarity meets execution • clarity meets execution •</span>
            <span>clarity meets execution • clarity meets execution •</span>
          </div>
          <div className="container services__intro" data-reveal>
            <span>✦</span>
            <h2>
              What You Get
              <br />
              When Clarity
              <br />
              Meets <em>Execution</em>
            </h2>
            <span>✦</span>
          </div>

          <div className="serviceStack" ref={serviceStackRef}>
            {services.map((service, index) => (
              <article
                className={`serviceCard serviceCard--${service.title.toLowerCase()}`}
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
            Ready to build something
            <br />
            that actually works?
          </h2>
          <p>
            Clear design, solid engineering, and focused strategy — working
            together as one system.
          </p>
          <a href="mailto:chkstepan11@gmail.com">Let&apos;s talk</a>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <a href="mailto:chkstepan11@gmail.com">chkstepan11@gmail.com</a>
            <p>Europe, Romania - Local time</p>
          </div>
          <nav>
            <a href="#">Overview</a>
            <a href="#contact">Contact</a>
            <a href="/projects">Projects</a>
            <a href="#about">About</a>
          </nav>
          <nav>
            <a href="https://www.instagram.com/chkstepan.dev">instagram</a>
            <a href="https://www.linkedin.com/company/chkstepan">linkedin</a>
            <a href="https://dribbble.com/chkstepan">dribbble</a>
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
          CHKSTEPAN
        </div>
      </footer>
    </div>
  );
}

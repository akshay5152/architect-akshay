"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const visibleStats = useMemo(
    () =>
      stats.map(([value, label]) => [
        Math.round((Number(value) * loaderCount) / 100).toString(),
        label,
      ]),
    [loaderCount],
  );

  useEffect(() => {
    const countTimer = window.setInterval(() => {
      setLoaderCount((current) => Math.min(current + 4, 100));
    }, 34);
    const cursorHandler = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", cursorHandler);
    return () => {
      window.clearInterval(countTimer);
      window.removeEventListener("mousemove", cursorHandler);
    };
  }, []);

  return (
    <div>
      <div
        className="cursorDot"
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
      />
      <div
        className="cursorRing"
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
      />

      <div className="loader" aria-hidden="true">
        <div className="loader__grid" />
        <div className="loader__count">{loaderCount}%</div>
      </div>

      <header className="header container">
        <a className="brand" href="#">
          <Asset src="/images/brand/Logo.svg" alt="Logo" />
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
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

      <aside className={`menuOverlay ${menuOpen ? "menuOverlay--open" : ""}`}>
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
          {["About", "Projects", "Contact"].map((item, index) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              onClick={() => setMenuOpen(false)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
              <em>
                {item === "About"
                  ? "My Journey"
                  : item === "Projects"
                    ? "Recent Work"
                    : "Let's Talk"}
              </em>
            </a>
          ))}
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
              <span>I</span>
              <span>Build</span>
              <span>
                Mo<em>d</em>ern
              </span>
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
        </section>

        <section className="strategy" id="approach">
          <div className="waveLayer" aria-hidden="true" />
          <div className="container strategy__head">
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

          <div className="approachRail">
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

        <section className="services" id="projects">
          <div className="ticker" aria-hidden="true">
            <span>clarity meets execution • clarity meets execution •</span>
            <span>clarity meets execution • clarity meets execution •</span>
          </div>
          <div className="container services__intro">
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

          <div className="serviceStack container">
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

        <section className="cta container" id="contact">
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
          <Asset src="/images/brand/Logo.svg" alt="Logo" />
          <div>
            <a href="mailto:chkstepan11@gmail.com">chkstepan11@gmail.com</a>
            <p>Europe, Romania - Local time</p>
          </div>
          <nav>
            <a href="#">Overview</a>
            <a href="#contact">Contact</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
          </nav>
          <nav>
            <a href="https://www.instagram.com/chkstepan.dev">instagram</a>
            <a href="https://www.linkedin.com/company/chkstepan">linkedin</a>
            <a href="https://dribbble.com/chkstepan">dribbble</a>
          </nav>
          <p>©2026 All Rights Reserved</p>
        </div>
        <Asset
          className="footer__wordmark"
          src="/images/other/FooterText.svg"
          alt="chkstepan"
        />
      </footer>
    </div>
  );
}

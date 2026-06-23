"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { title: "Overview", label: "Start Fresh", href: "/" },
  { title: "About", label: "Our Soul", href: "/#about" },
  { title: "Contact", label: "Let's Talk", href: "/#contact" },
];

const projects = [
  {
    name: "Architecture & Planning",
    year: "01",
    type: "Space that works before it looks good",
    tone: "projectCard--sand",
  },
  {
    name: "Interior Design",
    year: "02",
    type: "Where every corner tells a story",
    tone: "projectCard--green",
  },
  {
    name: "Turnkey Execution",
    year: "03",
    type: "One call. Complete delivery.",
    tone: "projectCard--dark",
  },
  {
    name: "Design With Intention",
    year: "04",
    type: "A vision you can see, feel, and refine",
    tone: "projectCard--pink",
  },
  {
    name: "Hand Over A Soul",
    year: "05",
    type: "A finished space with feeling",
    tone: "projectCard--blue",
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

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
    const clearActiveProject = () => setActiveProject(null);

    window.addEventListener("mousemove", cursorHandler, { passive: true });
    window.addEventListener("scroll", clearActiveProject, { passive: true });
    const ctx = gsap.context(() => {
      gsap.from("[data-project-reveal]", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });
    });

    return () => {
      window.removeEventListener("mousemove", cursorHandler);
      window.removeEventListener("scroll", clearActiveProject);
      ctx.revert();
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
    }
  }, [menuOpen]);

  return (
    <div className="projectPage">
      <div ref={cursorDotRef} className="cursorDot" />
      <div ref={cursorRingRef} className="cursorRing" />

      <header className="header container projectHeader projectHeader--dark">
        <a className="brand" href="/">
          <Asset src="/images/brand/Logo.svg" alt="Logo" />
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="/#about">About</a>
          <a href="/projects">Projects</a>
          <a href="/#contact">Contact</a>
        </nav>
        <button
          className="menuButton projectMenuButton"
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
          {menuItems.map((item) => (
            <a href={item.href} key={item.title} onClick={() => setMenuOpen(false)}>
              <span />
              <strong>{item.title}</strong>
              <em>
                {Array.from({ length: 8 }).map((_, labelIndex) => (
                  <i key={labelIndex}>{item.label} ↗</i>
                ))}
              </em>
            </a>
          ))}
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
        <section className="projectsHero">
          <div className="projectGrid" aria-hidden="true" />
          <div className="container projectsHero__inner">
            <div className="projectsHero__meta" data-project-reveal>
              <span>Soulful Spaces</span>
              <span>Real Homes</span>
            </div>
            <h1 data-project-reveal>
              <span>
                Sp<em>a</em>ces With Soul
              </span>
              <strong>Every Corner Tells A Story</strong>
            </h1>
            <div className="projectsHero__preview" data-project-reveal>
              <span />
              <p>Architecture and interiors preview</p>
            </div>
            <p className="projectsHero__count" data-project-reveal>
              Selected services ( 05 )
            </p>
          </div>
        </section>

        <section
          className="projectShowcase"
          onMouseLeave={() => setActiveProject(null)}
        >
          <div className="projectShowcase__inner">
            {projects.map((project, index) => (
              <a
                className="projectRow"
                href="/projects"
                key={project.name}
                onBlur={() => setActiveProject(null)}
                onFocus={() => setActiveProject(index)}
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <span>{project.name}</span>
                <em>{project.year}</em>
              </a>
            ))}
            {activeProject !== null ? (
              <div
                className={`projectHoverPreview ${projects[activeProject].tone}`}
                aria-hidden="true"
              >
                <span>{projects[activeProject].name}</span>
              </div>
            ) : null}
          </div>
        </section>

        <section className="projectCta">
          <div className="projectCta__track" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index}>{["Space", "Meets", "Soul", "Story", "✱"][index % 5]}</span>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer projectFooter">
        <div className="container footer__inner">
          <div>
            <a href="mailto:Bricknsoul@gmail.com">Bricknsoul@gmail.com</a>
            <p>Architecture, interiors, and turnkey spaces</p>
          </div>
          <nav>
            <a href="/">Overview</a>
            <a href="/#contact">Contact</a>
            <a href="/projects">Projects</a>
            <a href="/#about">About</a>
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

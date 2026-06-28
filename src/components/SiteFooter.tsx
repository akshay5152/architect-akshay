"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { scrollBridge } from "@/lib/scrollBridge";

const EXPLOSION_IMAGES = Array.from(
  { length: 9 },
  (_, index) => `/images/footerExplosion/ProjectImage${index + 1}.webp`,
);

class ExplosionParticle {
  element: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation = 0;
  rotationSpeed: number;

  constructor(element: HTMLImageElement, width: number, height: number) {
    this.element = element;
    this.x = (Math.random() - 0.5) * width * 0.6;
    this.y = height * 0.5;
    this.vx = (Math.random() - 0.5) * 25;
    this.vy = -20 - Math.random() * 18;
    this.rotationSpeed = (Math.random() - 0.5) * 12;
    this.element.style.opacity = "1";
  }

  update() {
    this.vy += 0.3;
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.rotationSpeed *= 0.98;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.element.style.transform = `translate(calc(-50% + ${this.x}px), calc(-50% + ${this.y}px)) rotate(${this.rotation}deg)`;
  }
}

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  underline?: boolean;
  external?: boolean;
};

function FooterLink({
  href,
  children,
  underline = false,
  external = false,
}: FooterLinkProps) {
  return (
    <div className="lineMask">
      <a
        className={`footer__link${underline ? " footer__link--underline" : ""}`}
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        <span
          className={`footer__linkText${underline ? " footer__linkText--underline" : ""}`}
        >
          {children}
        </span>
      </a>
    </div>
  );
}

type SiteFooterProps = {
  light?: boolean;
  accentColor?: string;
};

export function SiteFooter({ light = false, accentColor }: SiteFooterProps) {
  const [time, setTime] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const explosionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const colonRef = useRef<HTMLSpanElement>(null);
  const animatingRef = useRef(false);
  const hasExplodedRef = useRef(false);
  const particlesRef = useRef<ExplosionParticle[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("ro-RO", {
          timeZone: "Europe/Bucharest",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!colonRef.current) return;

    const tween = gsap.to(colonRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!lineRef.current) return;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.88,
        ease: "power2.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 92%",
          once: true,
          scroller: document.documentElement,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    const overlay = overlayRef.current;
    if (!inner || !overlay) return;

    const updateOverlay = () => {
      const rect = inner.getBoundingClientRect();
      const range = (window.innerHeight + inner.offsetHeight) * 0.6;
      const progress = Math.min(
        Math.max((window.innerHeight - rect.top) / range, 0),
        1,
      );
      overlay.style.opacity = String(1 - progress);
    };

    updateOverlay();
    const unsubscribe = scrollBridge.subscribe(updateOverlay);
    return () => {
      unsubscribe();
    };
  }, []);

  const resetParticles = useCallback(() => {
    const container = explosionRef.current;
    if (!container) return;

    container.querySelectorAll<HTMLImageElement>(".footer__explosionParticle").forEach(
      (element) => {
        element.style.opacity = "0";
        element.style.transform = "translate(-50%, -50%)";
      },
    );
    particlesRef.current = [];
  }, []);

  const initParticles = useCallback(() => {
    const container = explosionRef.current;
    if (!container) return;

    particlesRef.current = Array.from(
      container.querySelectorAll<HTMLImageElement>(".footer__explosionParticle"),
    ).map(
      (element) =>
        new ExplosionParticle(
          element,
          container.offsetWidth,
          container.offsetHeight,
        ),
    );
  }, []);

  const runExplosion = useCallback(() => {
    if (animatingRef.current || hasExplodedRef.current) return;

    const container = explosionRef.current;
    if (!container) return;

    animatingRef.current = true;
    hasExplodedRef.current = true;

    container
      .querySelectorAll<HTMLImageElement>(".footer__explosionParticle")
      .forEach((element) => {
        element.style.transform = "translate(-50%, -50%)";
      });

    initParticles();

    let finished = false;
    const tick = () => {
      if (finished) return;

      particlesRef.current.forEach((particle) => particle.update());

      if (
        container &&
        particlesRef.current.length > 0 &&
        particlesRef.current.every(
          (particle) => particle.y > container.offsetHeight * 0.52,
        )
      ) {
        finished = true;
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
        particlesRef.current.forEach((particle) => {
          particle.element.style.opacity = "0";
        });
        window.setTimeout(() => {
          animatingRef.current = false;
        }, 500);
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    tick();
  }, [initParticles]);

  const checkExplosion = useCallback(() => {
    const footer = footerRef.current;
    if (!footer || animatingRef.current) return;

    const rect = footer.getBoundingClientRect();
    const visibleHeight =
      Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const ratio = visibleHeight / Math.max(rect.height, 1);

    if (ratio < 0.12) {
      hasExplodedRef.current = false;
      resetParticles();
      return;
    }

    if (!hasExplodedRef.current && ratio >= 0.42) {
      runExplosion();
    }
  }, [resetParticles, runExplosion]);

  useEffect(() => {
    EXPLOSION_IMAGES.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });

    resetParticles();

    const unsubscribe = scrollBridge.subscribe(checkExplosion);
    const delayedCheck = window.setTimeout(checkExplosion, 120);
    window.addEventListener("resize", resetParticles);

    return () => {
      unsubscribe();
      window.clearTimeout(delayedCheck);
      window.removeEventListener("resize", resetParticles);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [checkExplosion, resetParticles]);

  const [hours, minutes] = time.split(":");

  return (
    <footer
      ref={footerRef}
      className={`footer${light ? " footer--light" : ""}`}
    >
      <div ref={innerRef} className="footer__inner">
        <div className="footer__sticky">
          <div ref={overlayRef} className="footer__overlay" aria-hidden="true" />

          <div
            ref={explosionRef}
            className="footer__explosion"
            aria-hidden="true"
          >
            {EXPLOSION_IMAGES.map((src) => (
              <img
                key={src}
                className="footer__explosionParticle"
                src={src}
                alt=""
              />
            ))}
          </div>

          <div className="footer__background">
            <div className="container">
              <div className="footer__content">
                <div className="footer__links">
                  <img
                    className="footer__logo"
                    src={
                      light
                        ? "/images/brand/LogoDark.svg"
                        : "/images/brand/Logo.svg"
                    }
                    alt="Logo"
                    width={60}
                    height={60}
                  />

                  <div className="footer__col footer__col--left">
                    <FooterLink
                      href="mailto:chkstepan11@gmail.com"
                      underline
                      external
                    >
                      chkstepan11@gmail.com
                    </FooterLink>
                    <p className="footer__bottomText">
                      Europe, Romania - {hours}
                      <span ref={colonRef}>:</span>
                      {minutes}
                    </p>
                  </div>

                  <div className="footer__col footer__col--left">
                    <FooterLink href="/">Overview</FooterLink>
                    <FooterLink href="/contact">Contact</FooterLink>
                    <FooterLink href="/projects" underline>
                      Projects
                    </FooterLink>
                    <FooterLink href="/about">About</FooterLink>
                  </div>

                  <div className="footer__col footer__col--right">
                    <FooterLink
                      href="https://www.instagram.com/chkstepan.dev"
                      underline
                      external
                    >
                      instagram
                    </FooterLink>
                    <FooterLink
                      href="https://www.linkedin.com/company/chkstepan"
                      external
                    >
                      linkedin
                    </FooterLink>
                    <FooterLink
                      href="https://dribbble.com/chkstepan"
                      external
                    >
                      dribbble
                    </FooterLink>
                  </div>

                  <div className="footer__col footer__col--right">
                    <FooterLink href="/privacy" underline>
                      Privacy Policy
                    </FooterLink>
                    <p className="footer__bottomText">
                      ©{new Date().getFullYear()} All Rights Reserved
                    </p>
                  </div>
                </div>

                <div
                  ref={lineRef}
                  className="footer__horizontalLine"
                  style={
                    accentColor ? { backgroundColor: accentColor } : undefined
                  }
                />

                <img
                  className="footer__boldText"
                  src={
                    light
                      ? "/images/other/FooterTextDark.svg"
                      : "/images/other/FooterText.svg"
                  }
                  alt="chkstepan"
                  width={280}
                  height={280}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// src/components/reactbits/ScrollExpand.jsx
// Scroll-expand hero image — page-scroll mode (useWindowScroll)
// Inspired by React Bits. Uses GSAP for smooth scaling.
import { useEffect, useRef } from 'react';
import './ScrollExpand.css';

export default function ScrollExpand({
  src,
  alt = '',
  title,
  scrollHint = 'Scroll',
  children,
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;

    const container = containerRef.current;
    const img = imgRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const hint = hintRef.current;

    if (!container || !img) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.9;
      const progress = Math.min(scrollY / maxScroll, 1);

      // Scale image from 0.7 → 1.0
      const scale = 0.7 + progress * 0.3;
      img.style.transform = `scale(${scale})`;

      // Fade overlay 0.6 → 0.2
      overlay.style.opacity = 0.6 - progress * 0.4;

      // Show content when image is mostly expanded
      if (content) {
        content.style.opacity = progress > 0.8 ? (progress - 0.8) / 0.2 : 0;
        content.style.transform = `translateY(${(1 - progress) * 20}px)`;
      }

      // Fade scroll hint
      if (hint) {
        hint.style.opacity = Math.max(0, 1 - progress * 3);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReduced]);

  return (
    <div className="scroll-expand" ref={containerRef} aria-label={alt}>
      <div className="scroll-expand__sticky">
        <div className="scroll-expand__img-wrap">
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="scroll-expand__img"
            style={{ transform: prefersReduced ? 'scale(1)' : 'scale(0.7)' }}
          />
          <div className="scroll-expand__overlay" ref={overlayRef} />
          <div className="scroll-expand__hero-text">
            <h1 className="scroll-expand__title">{title}</h1>
            {scrollHint && (
              <div className="scroll-expand__hint" ref={hintRef} aria-hidden="true">
                <span>{scrollHint}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          <div
            className="scroll-expand__content"
            ref={contentRef}
            style={{ opacity: prefersReduced ? 1 : 0 }}
          >
            {children}
          </div>
        </div>
      </div>
      {/* Spacer to allow scrolling */}
      <div className="scroll-expand__spacer" aria-hidden="true" />
    </div>
  );
}

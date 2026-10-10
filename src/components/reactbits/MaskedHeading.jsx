// src/components/reactbits/MaskedHeading.jsx
// Text-mask heading where a photo shows through the letters
// Uses CSS background-clip: text with an IntersectionObserver for the reveal
import { useRef, useEffect, useState } from 'react';
import './MaskedHeading.css';

export default function MaskedHeading({
  children,
  imageSrc,
  imageAlt = '',
  reveal = 'rise',
  ariaLabel,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced]);

  return (
    <div
      ref={ref}
      className={`masked-heading masked-heading--${reveal} ${visible ? 'masked-heading--visible' : ''}`}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
    >
      <span
        className="masked-heading__text"
        style={
          imageSrc
            ? {
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }
            : {}
        }
        aria-hidden={!!ariaLabel}
      >
        {children}
      </span>
    </div>
  );
}

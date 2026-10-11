// src/components/LogoMark.jsx
export default function LogoMark({ size = 36, onDark = false, className = '', ...props }) {
  const dark = Boolean(onDark);
  const primaryColor = dark ? '#FFFFFF' : '#2C5A43';
  const bandColor = dark ? '#C9A06B' : '#2C5A43';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Stem */}
      <path
        d="M32 24V15"
        stroke={primaryColor}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Right leaf */}
      <path
        d="M32 16C32 7 38 3 47 3C47 12 41 17 32 16Z"
        fill={primaryColor}
      />
      {/* Left leaf */}
      <path
        d="M32 21C32 14 27 11 19 11C19 18 24 22 32 21Z"
        fill="#B9D1B0"
        stroke={primaryColor}
        strokeWidth="1.3"
      />
      {/* Band */}
      <path
        d="M27 28V24H37V28Z"
        fill={bandColor}
      />
      {/* Body */}
      <path
        d="M27 28H37V52H27Z"
        fill="#C9A06B"
      />
      {/* Highlight */}
      <path
        d="M31 28H33V52H31Z"
        fill="#FFFFFF"
        opacity="0.22"
      />
      {/* Wood tip */}
      <path
        d="M27 52L32 63L37 52Z"
        fill="#E3C9A0"
      />
      {/* Graphite tip */}
      <path
        d="M30.1 59.2L32 63L33.9 59.2Z"
        fill="#1F2B25"
      />
    </svg>
  );
}

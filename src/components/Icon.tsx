import type { IconName } from '../data';

const paths: Record<IconName, JSX.Element> = {
  sound: <path d="M4 12v0M8 8v8M12 4v16M16 8v8M20 12v0" />,
  sleep: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  temp: (
    <g>
      <path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z" />
      <path d="M12 9v7" />
    </g>
  ),
  leaf: (
    <g>
      <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z" />
      <path d="M5 19 13 11" />
    </g>
  ),
  battery: (
    <g>
      <rect x="7" y="4" width="10" height="17" rx="2" />
      <path d="M10 2h4M12.5 9l-2 4h3l-2 4" />
    </g>
  ),
  app: (
    <g>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </g>
  ),
  design: <path d="M3 12c0-3 3-5 9-5s9 2 9 5-3 5-9 5-9-2-9-5Z" />,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />,
  power: (
    <g>
      <path d="M12 3v8" />
      <path d="M6.5 6.5a8 8 0 1 0 11 0" />
    </g>
  )
};

export default function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

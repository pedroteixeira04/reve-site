/**
 * Ilustração vetorial da venda Revê.
 * Para usar as fotografias reais, coloca-as em /public/images e substitui
 * este componente por <img src="/images/hero.jpg" alt="..." />.
 */
export default function MaskArt({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 320" role="img" aria-label="Venda de olhos Revê">
      <defs>
        <linearGradient id="fabric" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4745" />
          <stop offset="1" stopColor="#1c1b1a" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="80%" r="60%">
          <stop offset="0" stopColor="#c9a97a" stopOpacity=".35" />
          <stop offset="1" stopColor="#c9a97a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="strap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a2928" />
          <stop offset=".5" stopColor="#3b3836" />
          <stop offset="1" stopColor="#2a2928" />
        </linearGradient>
      </defs>
      <ellipse cx="300" cy="270" rx="270" ry="40" fill="url(#glow)" />
      <ellipse cx="300" cy="278" rx="220" ry="16" fill="#000" opacity=".5" />
      <path d="M40 150 C40 110 90 90 150 90 L450 90 C510 90 560 110 560 150 L560 175 C560 195 520 205 450 205 L150 205 C80 205 40 195 40 175Z" fill="url(#strap)" />
      <path d="M95 118 C95 80 170 62 300 62 C430 62 505 80 505 118 L505 205 C505 250 440 270 380 270 C340 270 325 242 300 242 C275 242 260 270 220 270 C160 270 95 250 95 205Z" fill="url(#fabric)" />
      <path d="M130 120 C140 96 200 84 300 84 C400 84 460 96 470 120" fill="none" stroke="#6a6663" strokeWidth="2" opacity=".6" />
      <path d="M135 205 C135 235 175 248 215 248 C255 248 270 226 300 226 C330 226 345 248 385 248 C425 248 465 235 465 205" fill="none" stroke="#0e0d0c" strokeWidth="6" opacity=".7" />
      <text x="300" y="165" textAnchor="middle" fontFamily="Jost, sans-serif" fontWeight="200" fontSize="34" letterSpacing="10" fill="#bdb6ad" opacity=".85">revê</text>
    </svg>
  );
}

export default function AutomationIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background glow */}
      <ellipse cx="250" cy="200" rx="200" ry="180" className="fill-orange/5" />

      {/* Central hub */}
      <circle cx="250" cy="200" r="40" className="fill-orange/20 stroke-orange" strokeWidth="2" />
      <circle cx="250" cy="200" r="20" className="fill-orange" />
      <circle cx="250" cy="200" r="6" className="fill-white" />

      {/* Orbiting dots */}
      <circle cx="250" cy="130" r="6" className="fill-orange/60" />
      <circle cx="320" cy="170" r="5" className="fill-orange/40" />
      <circle cx="310" cy="260" r="7" className="fill-orange/70" />
      <circle cx="190" cy="260" r="5" className="fill-orange/50" />
      <circle cx="180" cy="150" r="4" className="fill-orange/30" />

      {/* Connection lines - main flow */}
      <path d="M250 160 L250 130" className="stroke-orange/40" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M280 180 L320 170" className="stroke-orange/30" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M275 230 L310 260" className="stroke-orange/40" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M225 230 L190 260" className="stroke-orange/30" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M220 175 L180 150" className="stroke-orange/20" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Check nodes */}
      <circle cx="130" cy="260" r="16" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="1.5" />
      <path d="M125 260 L129 264 L136 256" className="stroke-emerald-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      <circle cx="370" cy="170" r="16" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="1.5" />
      <path d="M365 170 L369 174 L376 166" className="stroke-emerald-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      <circle cx="180" cy="100" r="16" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="1.5" />
      <path d="M175 100 L179 104 L186 96" className="stroke-emerald-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Arrow paths between nodes */}
      <path d="M146 255 C160 245, 170 240, 183 257" className="stroke-emerald-400/40" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <path d="M354 175 C340 165, 200 135, 196 108" className="stroke-emerald-400/40" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <path d="M240 130 C230 115, 220 110, 196 105" className="stroke-orange/30" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Arrow head marker */}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" className="fill-emerald-400/40" />
        </marker>
      </defs>

      {/* Bottom text bars */}
      <rect x="140" y="310" width="100" height="4" rx="2" className="fill-orange/40" />
      <rect x="260" y="310" width="80" height="4" rx="2" className="fill-orange/20" />
      <rect x="140" y="322" width="60" height="4" rx="2" className="fill-orange/30" />
      <rect x="215" y="322" width="130" height="4" rx="2" className="fill-orange/15" />

      {/* Sparkle dots */}
      <circle cx="85" cy="180" r="3" className="fill-orange/40" />
      <circle cx="420" cy="230" r="3" className="fill-orange/30" />
      <circle cx="340" cy="90" r="2.5" className="fill-orange/25" />
      <circle cx="150" cy="330" r="2" className="fill-orange/35" />
    </svg>
  );
}

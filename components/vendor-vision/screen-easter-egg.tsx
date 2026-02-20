"use client"

export function ScreenEasterEgg() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 bg-background">
      <svg
        viewBox="0 0 500 450"
        className="w-full max-w-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Back wheel */}
        <circle cx="150" cy="340" r="60" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted-foreground" />
        <circle cx="150" cy="340" r="4" fill="currentColor" className="text-muted-foreground" />
        {/* Back spokes */}
        {[0, 45, 90, 135].map((a) => (
          <line
            key={`bs-${a}`}
            x1={150 + Math.cos((a * Math.PI) / 180) * 58}
            y1={340 + Math.sin((a * Math.PI) / 180) * 58}
            x2={150 + Math.cos(((a + 180) * Math.PI) / 180) * 58}
            y2={340 + Math.sin(((a + 180) * Math.PI) / 180) * 58}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground/50"
          />
        ))}

        {/* Front wheel */}
        <circle cx="350" cy="340" r="60" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted-foreground" />
        <circle cx="350" cy="340" r="4" fill="currentColor" className="text-muted-foreground" />
        {/* Front spokes */}
        {[0, 45, 90, 135].map((a) => (
          <line
            key={`fs-${a}`}
            x1={350 + Math.cos((a * Math.PI) / 180) * 58}
            y1={340 + Math.sin((a * Math.PI) / 180) * 58}
            x2={350 + Math.cos(((a + 180) * Math.PI) / 180) * 58}
            y2={340 + Math.sin(((a + 180) * Math.PI) / 180) * 58}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground/50"
          />
        ))}

        {/* Frame */}
        {/* Seat tube */}
        <line x1="210" y1="240" x2="185" y2="340" stroke="currentColor" strokeWidth="5" className="text-primary" strokeLinecap="round" />
        {/* Down tube */}
        <line x1="210" y1="240" x2="270" y2="340" stroke="currentColor" strokeWidth="5" className="text-primary" strokeLinecap="round" />
        {/* Chain stay */}
        <line x1="185" y1="340" x2="150" y2="340" stroke="currentColor" strokeWidth="5" className="text-primary" strokeLinecap="round" />
        {/* Seat stay */}
        <line x1="210" y1="240" x2="150" y2="340" stroke="currentColor" strokeWidth="4" className="text-primary" strokeLinecap="round" />
        {/* Top tube */}
        <line x1="210" y1="240" x2="300" y2="255" stroke="currentColor" strokeWidth="5" className="text-primary" strokeLinecap="round" />
        {/* Head tube */}
        <line x1="300" y1="255" x2="310" y2="300" stroke="currentColor" strokeWidth="6" className="text-primary" strokeLinecap="round" />
        {/* Fork */}
        <line x1="310" y1="300" x2="350" y2="340" stroke="currentColor" strokeWidth="4" className="text-primary" strokeLinecap="round" />
        {/* Handlebar */}
        <line x1="290" y1="245" x2="320" y2="240" stroke="currentColor" strokeWidth="5" className="text-primary" strokeLinecap="round" />
        {/* Seat */}
        <ellipse cx="210" cy="235" rx="22" ry="6" fill="currentColor" className="text-foreground/70" />
        {/* Crank */}
        <circle cx="270" cy="340" r="8" fill="currentColor" className="text-primary" />
        <line x1="270" y1="330" x2="270" y2="350" stroke="currentColor" strokeWidth="4" className="text-primary" strokeLinecap="round" />
        {/* Pedals */}
        <rect x="260" y="325" width="20" height="5" rx="2" fill="currentColor" className="text-foreground/60" />
        <rect x="260" y="350" width="20" height="5" rx="2" fill="currentColor" className="text-foreground/60" />

        {/* Pelican body */}
        <ellipse cx="215" cy="185" rx="45" ry="35" fill="currentColor" className="text-amber-100 dark:text-amber-200" />
        {/* Pelican belly */}
        <ellipse cx="218" cy="200" rx="35" ry="22" fill="currentColor" className="text-white dark:text-amber-50" />

        {/* Pelican neck */}
        <path
          d="M 240 170 Q 270 130 265 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
          className="text-amber-100 dark:text-amber-200"
        />

        {/* Pelican head */}
        <ellipse cx="268" cy="80" rx="22" ry="18" fill="currentColor" className="text-amber-100 dark:text-amber-200" />

        {/* Eye */}
        <circle cx="278" cy="74" r="5" fill="currentColor" className="text-foreground" />
        <circle cx="279.5" cy="73" r="2" fill="currentColor" className="text-background" />

        {/* Beak top */}
        <path
          d="M 288 80 L 340 75 L 330 85 Z"
          fill="currentColor"
          className="text-orange-400"
        />
        {/* Beak bottom / pouch */}
        <path
          d="M 288 85 Q 325 120 340 85 L 330 85 Q 320 105 290 88 Z"
          fill="currentColor"
          className="text-orange-300"
        />

        {/* Pelican wing */}
        <path
          d="M 200 175 Q 175 165 170 185 Q 168 200 190 200 Q 210 200 220 190"
          fill="currentColor"
          className="text-amber-200 dark:text-amber-300"
        />

        {/* Legs to pedals */}
        {/* Left leg */}
        <line x1="205" y1="215" x2="230" y2="260" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-orange-400" />
        <line x1="230" y1="260" x2="270" y2="330" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-orange-400" />
        {/* Right leg */}
        <line x1="215" y1="218" x2="245" y2="275" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-orange-400" />
        <line x1="245" y1="275" x2="270" y2="352" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-orange-400" />

        {/* Feet on pedals */}
        <ellipse cx="270" cy="327" rx="10" ry="4" fill="currentColor" className="text-orange-500" />
        <ellipse cx="270" cy="355" rx="10" ry="4" fill="currentColor" className="text-orange-500" />

        {/* Wing "gripping" handlebar */}
        <path
          d="M 240 178 Q 270 195 305 242"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-amber-200 dark:text-amber-300"
        />
        <circle cx="305" cy="242" r="5" fill="currentColor" className="text-amber-200 dark:text-amber-300" />

        {/* Tail feathers */}
        <path
          d="M 172 178 L 145 155 M 170 183 L 140 168 M 170 188 L 142 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-amber-300 dark:text-amber-400"
        />

        {/* Ground line */}
        <line x1="60" y1="400" x2="440" y2="400" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" className="text-border" />
      </svg>
      <p className="text-sm text-muted-foreground">Nothing to see here. Just a pelican on a bike.</p>
    </div>
  )
}

import { animate, motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'

export const EASE = [0.16, 1, 0.3, 1] as const

/* ---------- small hooks ---------- */

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

export const useReducedMotionPref = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

/** Smooth-scroll to a section, through Lenis when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis
  if (lenis) lenis.scrollTo(el, { offset: -72 })
  else el.scrollIntoView()
}

/* ---------- reveal on scroll ---------- */

export function Reveal({ children, delay = 0, className = '', y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -70px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- scramble / decode text ---------- */

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&$@'

export function Scramble({ text, play = true, delay = 0, speed = 34, className = '' }: { text: string; play?: boolean; delay?: number; speed?: number; className?: string }) {
  const [out, setOut] = useState(text)
  const reduce = useReducedMotionPref()
  useEffect(() => {
    if (!play || reduce) {
      setOut(text)
      return
    }
    let frame = 0
    let timer: ReturnType<typeof setInterval> | undefined
    setOut(text.replace(/\S/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
    const start = setTimeout(() => {
      timer = setInterval(() => {
        frame++
        const settled = Math.floor(frame / 2.2)
        setOut(
          text
            .split('')
            .map((ch, i) => (ch === ' ' || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(''),
        )
        if (settled >= text.length) clearInterval(timer)
      }, speed)
    }, delay)
    return () => {
      clearTimeout(start)
      if (timer) clearInterval(timer)
    }
  }, [text, play, delay, speed, reduce])
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}

/** Scramble that starts when the element scrolls into view. */
export function ScrambleInView({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  return (
    <span ref={ref}>
      <Scramble text={text} play={inView} className={className} />
    </span>
  )
}

/* ---------- section heading ---------- */

export function SectionHead({ index, eyebrow, lines, lead }: { index: string; eyebrow: string; lines: ReactNode[]; lead?: string }) {
  return (
    <div className="mb-12 max-w-3xl md:mb-16">
      <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-neon">
        <span className="text-dim">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-neon to-transparent" />
        <ScrambleInView text={eyebrow} />
      </p>
      <h2 className="font-display text-[1.7rem] font-bold uppercase leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
        {lines.map((l, i) => (
          // the clipping wrapper is what gets observed: the sliding line itself starts fully hidden
          <motion.span key={i} className="block overflow-hidden pb-[0.12em]" initial="hide" whileInView="show" viewport={{ once: true, margin: '0px 0px -60px 0px' }}>
            <motion.span className="block" variants={{ hide: { y: '110%' }, show: { y: 0 } }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}>
              {l}
            </motion.span>
          </motion.span>
        ))}
      </h2>
      {lead && (
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ---------- interactive surfaces ---------- */

/** Card with a soft spotlight that follows the pointer. Accent colour through `acc` ("r, g, b"). */
export function Card({ children, className = '', acc }: { children: ReactNode; className?: string; acc?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div className={`card ${className}`} style={acc ? ({ '--acc': acc } as CSSProperties) : undefined} onMouseMove={onMove}>
      {children}
    </div>
  )
}

/** 3D tilt that follows the pointer. Children can read --gx / --gy for glare and foil layers. */
export function Tilt({ children, className = '', max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const fine = useFinePointer()
  const reduce = useReducedMotionPref()
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const active = fine && !reduce

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!active) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * max)
    rx.set(-(py - 0.5) * 2 * max)
    e.currentTarget.style.setProperty('--gx', `${px * 100}%`)
    e.currentTarget.style.setProperty('--gy', `${py * 100}%`)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <div className={`tilt [perspective:1200px] ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

/** Pulls its child toward the pointer, then springs back. */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const fine = useFinePointer()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div className={`inline-block ${className}`} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  )
}

/* ---------- bits ---------- */

export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = String(to)
      return
    }
    const controls = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => (el.textContent = String(Math.round(v))) })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  )
}

export function Chip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'acc' }) {
  const tones = {
    default: 'border-line bg-white/[0.03] text-muted',
    acc: 'border-[rgba(var(--acc),.35)] bg-[rgba(var(--acc),.1)] text-[rgb(var(--acc))]',
  }
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs ${tones[tone]}`}>{children}</span>
}

export type IconName =
  | 'arrow' | 'arrowUpRight' | 'download' | 'github' | 'whatsapp' | 'phone' | 'external' | 'menu' | 'close' | 'pin' | 'shield' | 'check'
  | 'terminal' | 'network' | 'code' | 'layers' | 'globe' | 'flag' | 'search' | 'chip' | 'briefcase' | 'cap' | 'clock' | 'eye' | 'sun' | 'moon'

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  download: <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" />,
  external: <path d="M14 5h5v5M19 5l-8 8M11 7H6a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-5" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.800 7 11 7 11z" /><circle cx="12" cy="10" r="2.500" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.500-3 8.500-7 10-4-1.500-7-5.500-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  check: <path d="M5 12.500l4.500 4.500L19 7.500" />,
  phone: <path d="M6.500 4h3l1.500 4-2 1.500a11 11 0 005.500 5.500l1.500-2 4 1.500v3a2 2 0 01-2 2A16 16 0 014.500 6a2 2 0 012-2z" />,
  github: <path d="M9 19c-4.500 1.400-4.500-2.300-6.300-2.800M15 21.500v-3.200c0-.900.100-1.300-.500-1.900 2.800-.300 5.500-1.300 5.500-6a4.600 4.600 0 00-1.300-3.200 4.200 4.200 0 00-.100-3.200s-1.100-.300-3.500 1.300a12 12 0 00-6.200 0C6.500 3.700 5.400 4 5.400 4a4.200 4.200 0 00-.100 3.200A4.600 4.600 0 004 10.400c0 4.700 2.700 5.700 5.500 6-.600.600-.600 1.200-.500 1.900v3.200" />,
  whatsapp: <><path d="M4 20l1.300-4.200A8 8 0 1112 20a8 8 0 01-3.800-1L4 20z" /><path d="M9.200 8.500c-.300 1 .300 2.500 1.600 3.800s2.900 2 3.900 1.700l.800-1-1.700-1-.800.600c-.700-.300-1.600-1.200-1.900-1.900l.600-.800-1-1.700-1.500.300z" /></>,
  terminal: <><rect x="3" y="4.500" width="18" height="15" rx="2.500" /><path d="M7 10l3 2.500L7 15M12.500 15H17" /></>,
  network: <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v5m0 0l-6 5m6-5l6 5" /></>,
  code: <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />,
  layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.200 3 14.800 0 18M12 3c-3 3.200-3 14.800 0 18" /></>,
  flag: <path d="M5 21V4m0 1c5-3 8 3 14 0v9c-6 3-9-3-14 0" />,
  search: <><circle cx="11" cy="11" r="6.500" /><path d="M16 16l4.500 4.500" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9.500 9.500h5v5h-5zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 13h18" /></>,
  cap: <path d="M2 9l10-5 10 5-10 5L2 9zm4 2.500V16c2 2 10 2 12 0v-4.500M22 9v6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />,
}

export function Icon({ name, className = 'h-4 w-4' }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export function BrandIcon({ path, className = 'h-6 w-6' }: { path: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

export const btn = 'inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-semibold transition duration-200'
export const btnPrimary = `${btn} bg-fg text-ink hover:bg-white hover:shadow-[0_0_36px_rgba(94,240,255,.45)]`
export const btnGhost = `${btn} border border-white/15 bg-white/[0.04] text-fg backdrop-blur hover:border-neon/60 hover:bg-white/[0.08]`

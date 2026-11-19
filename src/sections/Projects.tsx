import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { labs, projects, type Project } from '../data'
import { Card, Chip, Icon, Reveal, SectionHead, btnGhost, btnPrimary, useMediaQuery, useReducedMotionPref } from '../ui'

/* ---------- animated illustration for the Video Stretch extension ---------- */

const MODES = ['Original', 'Stretch', 'Crop'] as const
// a 16:9 video inside a 21:9 monitor fills 76.2% of the width
const FILL = 1 / 0.762

function StretchDemo() {
  const reduce = useReducedMotionPref()
  const [m, setM] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setM((v) => (v + 1) % MODES.length), 2300)
    return () => clearInterval(t)
  }, [reduce])
  const scale = m === 0 ? { scaleX: 1, scaleY: 1 } : m === 1 ? { scaleX: FILL, scaleY: 1 } : { scaleX: FILL, scaleY: FILL }

  return (
    <div className="relative w-full" role="img" aria-label="Animation of a 16 by 9 video on an ultrawide monitor switching between original, stretch and crop modes">
      <div className="absolute -inset-8 rounded-full bg-[rgba(var(--acc),.2)] blur-3xl" aria-hidden="true" />
      <div className="relative rounded-2xl border border-white/15 bg-[#0c0c0f] p-2.5 shadow-2xl">
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-black">
          <motion.div className="absolute inset-y-0 left-1/2 w-[76.2%] -translate-x-1/2" animate={scale} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
            <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#2b1a5e" />
                  <stop offset=".55" stopColor="#c0428f" />
                  <stop offset="1" stopColor="#ff9a6b" />
                </linearGradient>
              </defs>
              <rect width="160" height="90" fill="url(#sky)" />
              <circle cx="80" cy="50" r="16" fill="#ffe3a3" />
              <path d="M0 90 L0 66 L28 44 L52 64 L74 50 L104 70 L128 48 L160 68 L160 90 Z" fill="#1a1033" />
              <path d="M0 90 L0 78 L40 62 L80 80 L120 64 L160 80 L160 90 Z" fill="#0d0820" />
            </svg>
          </motion.div>
          <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2.5 py-1 font-mono text-[11px] text-[#fff] backdrop-blur">{MODES[m]}</span>
        </div>
      </div>
      <div className="mx-auto h-5 w-24 bg-gradient-to-b from-white/15 to-transparent [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)]" aria-hidden="true" />
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4" aria-hidden="true">
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
          <kbd className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1.5 text-fg shadow-[0_2px_0_rgba(255,255,255,.15)]">Alt</kbd>+
          <kbd className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1.5 text-fg shadow-[0_2px_0_rgba(255,255,255,.15)]">S</kbd>
        </span>
        <span className="flex gap-1.5">
          {MODES.map((x, i) => (
            <span key={x} className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${i === m ? 'border-[rgba(var(--acc),.6)] bg-[rgba(var(--acc),.15)] text-fg' : 'border-line text-dim'}`}>
              {x}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

/* ---------- project pieces ---------- */

function BrowserShot({ p, tilt }: { p: Project; tilt: boolean }) {
  if (p.visual === 'stretch') return <StretchDemo />
  return (
    <div className="relative">
      <div className="absolute -inset-10 rounded-full bg-[rgba(var(--acc),.22)] blur-3xl" aria-hidden="true" />
      <div className={`relative overflow-hidden rounded-2xl border border-white/12 bg-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,.9)] ${tilt ? '[transform:perspective(1600px)_rotateY(-10deg)_rotateX(4deg)]' : ''}`}>
        <div className="flex items-center gap-2 border-b border-white/10 bg-panel px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="mx-auto min-w-0 truncate rounded-md bg-ink px-4 py-1 font-mono text-[11px] text-dim">{p.url}</span>
        </div>
        <img src={p.shot} width={1600} height={1000} alt={p.shotAlt} className="block aspect-[16/10] w-full object-cover object-left-top" loading="lazy" />
      </div>
      {p.shot2 && tilt && (
        <div className="absolute -bottom-10 -left-10 w-[44%] overflow-hidden rounded-xl border border-white/20 shadow-[0_30px_70px_-20px_rgba(0,0,0,.95)] [transform:perspective(1600px)_rotateY(-10deg)_rotateX(4deg)_rotate(-3deg)]" aria-hidden="true">
          <img src={p.shot2} width={1600} height={1000} alt="" className="block aspect-[16/10] w-full object-cover object-left-top" loading="lazy" />
        </div>
      )}
    </div>
  )
}

function ProjectBody({ p, compact }: { p: Project; compact?: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone="acc">{p.badge}</Chip>
        <span className={`rounded-full border px-3 py-1 font-mono text-[11px] ${p.status === 'Live' ? 'border-mint/30 bg-mint/10 text-mint' : 'border-line text-dim'}`}>{p.status}</span>
      </div>
      <h3 className={`mt-5 font-display font-black uppercase leading-[1.05] tracking-tight ${compact ? 'text-3xl xl:text-[2.6rem]' : 'text-2xl'}`}>{p.title}</h3>
      <p className="mt-2 text-sm font-medium text-[rgb(var(--acc))] sm:text-base">{p.kind}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{p.text}</p>

      {p.points && (
        <ul className={`mt-4 space-y-2 ${compact ? '[@media(max-height:800px)]:hidden' : ''}`}>
          {p.points.map((x) => (
            <li key={x} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[rgba(var(--acc),.12)] text-[rgb(var(--acc))]">
                <Icon name="check" className="h-3 w-3" />
              </span>
              {x}
            </li>
          ))}
        </ul>
      )}

      {p.stats && (
        <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="bg-ink/85 p-3">
              <dd className="font-display text-lg font-bold">{s.value}</dd>
              <dt className="mt-1 text-[11px] leading-tight text-dim">{s.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      {p.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.map((l, i) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={i === 0 ? btnPrimary : btnGhost}>
              {l.icon === 'github' && <Icon name="github" />} {l.label} {l.icon === 'external' && <Icon name="external" />}
            </a>
          ))}
        </div>
      )}
      {p.note && <p className={`mt-3 text-xs leading-relaxed text-dim ${compact ? '[@media(max-height:720px)]:hidden' : ''}`}>{p.note}</p>}
    </div>
  )
}

/* ---------- desktop: pinned gallery that moves sideways as you scroll ---------- */

function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const n = projects.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(n - 1) * 100}vw`])
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))))))

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const y = top + (i / (n - 1)) * (el.offsetHeight - window.innerHeight)
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y })
  }

  return (
    <div ref={ref} className="relative" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-clip">
        <motion.div className="flex h-full w-max" style={{ x }}>
          {projects.map((p, i) => (
            <article key={p.id} className="relative h-full w-screen shrink-0" style={{ '--acc': p.acc } as CSSProperties} aria-label={p.title}>
              <span className="pointer-events-none absolute left-[4vw] top-[9vh] select-none font-display text-[26vh] font-black leading-none text-outline-dim" aria-hidden="true">
                0{i + 1}
              </span>
              <div className="relative mx-auto grid h-full max-w-7xl grid-cols-[.9fr_1.1fr] items-center gap-16 px-5 pb-28 pt-24 xl:gap-24">
                <ProjectBody p={p} compact />
                <div className="pl-6">
                  <BrowserShot p={p} tilt />
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* gallery controls */}
        <div className="absolute inset-x-0 bottom-6">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-5">
            <p className="font-display text-sm font-bold tabular-nums">
              <span className="text-holo">0{active + 1}</span> <span className="text-dim">/ 0{n}</span>
            </p>
            <div className="relative h-px flex-1 bg-line">
              <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-neon via-iris to-pink" style={{ scaleX: scrollYProgress }} />
            </div>
            <div className="flex gap-1">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show project ${i + 1}: ${p.title}`}
                  aria-current={i === active}
                  className={`min-h-11 rounded-full px-3.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${i === active ? 'bg-white/10 text-fg' : 'text-dim hover:text-fg'}`}
                >
                  {p.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- mobile / reduced motion: plain stack ---------- */

function StackedGallery() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 md:grid-cols-2">
      {projects.map((p, i) => (
        <Reveal key={p.id} delay={(i % 2) * 0.08}>
          <Card acc={p.acc} className="h-full">
            <div className="relative border-b border-line p-5">
              <BrowserShot p={p} tilt={false} />
            </div>
            <div className="relative p-6">
              <span className="absolute right-5 top-4 font-display text-4xl font-black text-outline-dim" aria-hidden="true">
                0{i + 1}
              </span>
              <ProjectBody p={p} />
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  )
}

const labAcc = ['94, 240, 255', '157, 123, 255', '255, 122, 217', '125, 255, 178']

export default function Projects() {
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 620px)')
  const reduce = useReducedMotionPref()

  return (
    <section id="projects" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead
          index="05"
          eyebrow="Projects"
          lines={['Things I have', <span className="text-holo">built and broken.</span>]}
          lead="Software I built, and security assessments I ran in isolated labs. The status of each one is stated as it is."
        />
      </div>

      {wide && !reduce ? <HorizontalGallery /> : <StackedGallery />}

      {/* security labs */}
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-24 md:pb-32">
        <Reveal>
          <h3 className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-neon">
            <span className="h-px w-10 bg-gradient-to-r from-neon to-transparent" /> Security labs
          </h3>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {labs.map((l, i) => (
            <Reveal key={l.id} delay={(i % 2) * 0.08}>
              <Card acc={labAcc[i % labAcc.length]} className="h-full">
                <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 min-w-0 truncate font-mono text-xs text-dim">
                    {l.id} · {l.slug}
                  </span>
                  <span className="ml-auto shrink-0">
                    <Chip tone="acc">{l.tag}</Chip>
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="font-display text-lg font-bold leading-snug tracking-tight">{l.title}</h4>
                  <p className="mt-1.5 text-xs text-dim">{l.course}</p>
                  <dl className="mt-5 space-y-2.5 font-mono text-[13px] leading-relaxed">
                    {l.facts.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[4.6rem_1fr] gap-3">
                        <dt className="text-[rgb(var(--acc))]">{k}</dt>
                        <dd className="text-muted">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {l.tools.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

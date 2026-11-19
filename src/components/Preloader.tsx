import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const LINES = [
  { at: 4, text: 'booting hakimi.sec' },
  { at: 22, text: 'loading profile' },
  { at: 46, text: 'loading skills and certificates' },
  { at: 70, text: 'loading projects' },
  { at: 96, text: 'access granted' },
]
const DURATION = 1500

/** Short boot sequence shown once on load, then slides away. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      onDone()
      return
    }
    const t0 = performance.now()
    let raf = 0
    let out: ReturnType<typeof setTimeout>
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / DURATION)
      const eased = 1 - Math.pow(1 - k, 2.2)
      setPct(Math.round(eased * 100))
      if (k < 1) raf = requestAnimationFrame(tick)
      else out = setTimeout(() => setLeaving(true), 260)
    }
    raf = requestAnimationFrame(tick)
    // safety net: never keep the page covered, even if the tab was throttled
    const safety = setTimeout(() => setLeaving(true), DURATION + 2500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(out)
      clearTimeout(safety)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (leaving) onDone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaving])

  if (gone) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 sm:p-10"
      initial={false}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && setGone(true)}
    >
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-dim">
        <span>hakimi.sec</span>
        <span>portfolio / 2026</span>
      </div>

      <div className="relative mx-auto w-full max-w-xl space-y-2 font-mono text-sm sm:text-base">
        {LINES.map((l) => (
          <p key={l.text} className={`transition-opacity duration-200 ${pct >= l.at ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-neon">&gt;</span> <span className={l.at === 96 ? 'text-mint' : 'text-muted'}>{l.text}</span>
            {l.at !== 96 && l.at !== 4 && <span className="text-dim"> ...... ok</span>}
          </p>
        ))}
      </div>

      <div className="relative">
        <div className="flex items-end justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-dim">loading</span>
          <span className="font-display text-6xl font-black tabular-nums leading-none sm:text-8xl">
            {String(pct).padStart(3, '0')}
            <span className="text-holo">%</span>
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-line">
          <div className="h-px bg-gradient-to-r from-neon via-iris to-pink" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </motion.div>
  )
}

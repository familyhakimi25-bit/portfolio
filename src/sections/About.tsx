import { motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { aboutText, biodata, stats } from '../data'
import { CountUp, Reveal, SectionHead, useReducedMotionPref } from '../ui'

function Word({ children, progress, range, hi }: { children: string; progress: MotionValue<number>; range: [number, number]; hi: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className={`mr-[0.28em] inline-block ${hi ? 'text-holo' : ''}`}>
      {children}
    </motion.span>
  )
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotionPref()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.5'] })
  const plain = text.replace(/_/g, '')
  // split into words, remembering which ones sit inside _highlight_ markers
  const words: { w: string; hi: boolean }[] = []
  let hi = false
  for (const raw of text.split(' ')) {
    const starts = raw.startsWith('_')
    const ends = raw.endsWith('_')
    if (starts) hi = true
    words.push({ w: raw.replace(/_/g, ''), hi })
    if (ends) hi = false
  }
  return (
    <p ref={ref} className="font-display text-[1.45rem] font-medium leading-[1.4] tracking-tight sm:text-3xl lg:text-[2.35rem] lg:leading-[1.32]">
      <span className="sr-only">{plain}</span>
      {words.map((x, i) =>
        reduce ? (
          <span key={i} aria-hidden="true" className={`mr-[0.28em] inline-block ${x.hi ? 'text-holo' : ''}`}>
            {x.w}
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            <Word progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]} hi={x.hi}>
              {x.w}
            </Word>
          </span>
        ),
      )}
    </p>
  )
}

/** Biodata rendered as a JSON file in a terminal window, printed line by line. */
function BiodataTerminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const line = (i: number) => ({
    initial: { opacity: 0, x: -10 },
    animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
    transition: { duration: 0.35, delay: 0.25 + i * 0.09 },
  })
  return (
    <div ref={ref} className="holo-border shadow-[0_30px_90px_-40px_rgba(157,123,255,.6)]" style={{ borderRadius: 20 }}>
      <div className="holo-inner overflow-hidden bg-panel" style={{ borderRadius: 19 }}>
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-dim">hakimi@portfolio: ~/about</span>
        </div>
        <div className="p-5 font-mono text-[12.5px] leading-7 sm:text-sm sm:leading-7">
          <motion.p {...line(0)}>
            <span className="text-mint">$</span> <span className="text-fg">cat biodata.json</span>
          </motion.p>
          <motion.p {...line(1)} className="text-dim">
            {'{'}
          </motion.p>
          <dl>
            {biodata.map(([k, v], i) => (
              <motion.div key={k} {...line(i + 2)} className="flex gap-2 pl-4">
                <dt className="shrink-0 text-neon">
                  "{k}"<span className="text-dim">:</span>
                </dt>
                <dd className="text-amber">
                  "{v}"{i < biodata.length - 1 && <span className="text-dim">,</span>}
                </dd>
              </motion.div>
            ))}
          </dl>
          <motion.p {...line(biodata.length + 2)} className="text-dim">
            {'}'}
          </motion.p>
          <motion.p {...line(biodata.length + 3)}>
            <span className="text-mint">$</span> <span className="caret text-neon">▍</span>
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <SectionHead index="01" eyebrow="About me" lines={['Networking roots,', <span className="text-holo">security focus.</span>]} />
      <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
        <ScrollWords text={aboutText} />
        <Reveal delay={0.1}>
          <BiodataTerminal />
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-y-10 border-t border-line pt-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className={`pr-6 ${i > 0 ? 'lg:border-l lg:border-line lg:pl-8' : ''}`}>
              <p className="font-display text-6xl font-black leading-none tracking-tight sm:text-7xl">
                <span className="text-holo">
                  <CountUp to={s.value} />
                </span>
              </p>
              <p className="mt-4 text-sm font-medium text-fg">{s.label}</p>
              <p className="mt-1 text-xs text-dim">{s.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

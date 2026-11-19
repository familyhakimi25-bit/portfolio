import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { journey } from '../data'
import { Card, EASE, Icon, SectionHead, type IconName } from '../ui'

const typeStyle: Record<string, { icon: IconName; acc: string }> = {
  Internship: { icon: 'briefcase', acc: '125, 255, 178' },
  Education: { icon: 'cap', acc: '157, 123, 255' },
  'Part-time': { icon: 'clock', acc: '94, 240, 255' },
}

export default function Journey() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="experience" className="relative border-y border-line bg-panel/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead index="04" eyebrow="Experience and education" lines={['Where I have', <span className="text-holo">worked and studied.</span>]} />

        <ol ref={ref} className="relative">
          {/* rail */}
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-line lg:left-1/2" aria-hidden="true" />
          <motion.div
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-neon via-iris to-pink shadow-[0_0_14px_1px_rgba(94,240,255,.6)] lg:left-1/2"
            style={{ scaleY: line }}
            aria-hidden="true"
          />

          {journey.map((t, i) => {
            const left = i % 2 === 0
            const st = typeStyle[t.type]
            return (
              <li key={t.title + t.where} className="relative list-none pb-10 pl-11 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:pb-14 lg:pl-0">
                {/* node */}
                <span
                  className={`absolute left-0 top-6 z-10 grid h-6 w-6 place-items-center rounded-full border-2 bg-ink lg:left-1/2 lg:-translate-x-1/2 ${t.now ? 'border-mint' : 'border-neon/70'}`}
                  aria-hidden="true"
                >
                  <span className={`h-2 w-2 rounded-full ${t.now ? 'live-dot bg-mint' : 'bg-neon'}`} />
                </span>

                {/* date on the opposite side (desktop) */}
                <motion.p
                  initial={{ opacity: 0, x: left ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className={`hidden self-center font-display text-2xl font-black uppercase tracking-tight text-fg/85 lg:block xl:text-3xl ${left ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1 lg:row-start-1 lg:text-right'}`}
                  aria-hidden="true"
                >
                  {t.when}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className={left ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2 lg:row-start-1'}
                >
                  <Card acc={st.acc} className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(var(--acc),.35)] bg-[rgba(var(--acc),.1)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--acc))]">
                        <Icon name={st.icon} className="h-3.5 w-3.5" /> {t.type}
                      </span>
                      {t.now && <span className="rounded-full bg-mint/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-mint">now</span>}
                      <span className="ml-auto font-mono text-xs text-dim lg:sr-only">{t.when}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight">{t.title}</h3>
                    <p className="mt-1 text-sm text-neon">{t.where}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{t.text}</p>
                  </Card>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import IdCard from '../components/IdCard'
import ParticleField from '../components/ParticleField'
import { profile, typed } from '../data'
import { EASE, Icon, Magnetic, Scramble, btnGhost, btnPrimary, useReducedMotionPref } from '../ui'

/** Types and deletes a list of phrases, one after another. */
function Typed({ words, play }: { words: string[]; play: boolean }) {
  const reduce = useReducedMotionPref()
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [del, setDel] = useState(false)
  const word = words[i]

  useEffect(() => {
    if (!play || reduce) return
    const atEnd = !del && n === word.length
    const atStart = del && n === 0
    const delay = atEnd ? 1700 : atStart ? 350 : del ? 32 : 70
    const t = setTimeout(() => {
      if (atEnd) setDel(true)
      else if (atStart) {
        setDel(false)
        setI((v) => (v + 1) % words.length)
      } else setN((v) => v + (del ? -1 : 1))
    }, delay)
    return () => clearTimeout(t)
  }, [n, del, play, reduce, word, words.length])

  return (
    <span aria-label={words.join(' ')}>
      <span aria-hidden="true" className="text-fg">
        {reduce ? words[0] : word.slice(0, n)}
      </span>
      <span aria-hidden="true" className="caret ml-0.5 text-neon">
        ▍
      </span>
    </span>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const show = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.8, ease: EASE, delay },
  })

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pb-24 lg:pt-32">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-bg absolute inset-0" />
        <div className="blob blob-a left-[-12%] top-[-8%] h-[460px] w-[460px] bg-neon/15" />
        <div className="blob blob-b right-[-10%] top-[18%] h-[420px] w-[420px] bg-iris/20" />
        <div className="blob blob-a bottom-[-20%] left-[35%] h-[360px] w-[420px] bg-pink/10" />
        <ParticleField className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.2fr_.8fr] lg:gap-10">
        <div>
          <motion.p {...show(0.05)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-4 text-xs text-muted backdrop-blur sm:text-sm">
            <span className="live-dot h-2 w-2 rounded-full bg-mint" />
            Currently: IT Intern at Ipenet Solutions, Penang
          </motion.p>

          <h1 aria-label={profile.name} className="font-display font-black uppercase leading-[0.98] tracking-tight">
            <motion.span {...show(0.1)} className="block text-outline text-[clamp(2.55rem,7.2vw,5.6rem)]" aria-hidden="true">
              <Scramble text="MUHAMAD" play={ready} delay={150} />
            </motion.span>
            <motion.span {...show(0.18)} className="block text-holo text-[clamp(2.55rem,7.2vw,5.6rem)]" aria-hidden="true">
              <Scramble text="HAKIMI" play={ready} delay={420} />
            </motion.span>
            <motion.span {...show(0.3)} className="mt-3 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.42em] text-muted sm:text-sm" aria-hidden="true">
              <span className="h-px w-10 bg-gradient-to-r from-neon to-transparent" />
              BIN AWANG
            </motion.span>
          </h1>

          <motion.p {...show(0.42)} className="mt-7 font-mono text-sm text-neon sm:text-base">
            &gt; I work in <Typed words={typed} play={ready} />
          </motion.p>

          <motion.p {...show(0.5)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Final-year Cyber Security undergraduate at Universiti Poly-Tech Malaysia with a networking diploma. I test systems, read the logs, and build
            the tools myself.
          </motion.p>

          <motion.div {...show(0.6)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Magnetic className="max-sm:!block">
              <a href="#contact" className={`${btnPrimary} max-sm:w-full`}>
                Contact me <Icon name="arrow" />
              </a>
            </Magnetic>
            <a href={profile.resume} download className={btnGhost}>
              <Icon name="download" /> Download resume
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={btnGhost}>
              <Icon name="github" /> GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateZ: 4, scale: 0.92 }}
          animate={ready ? { opacity: 1, y: 0, rotateZ: 0, scale: 1 } : { opacity: 0, y: 50, rotateZ: 4, scale: 0.92 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        >
          <IdCard />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        {...show(1)}
        className="absolute bottom-5 left-1/2 hidden min-h-11 -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-dim hover:text-fg lg:flex"
      >
        Scroll
        <span className="scroll-hint block h-8 w-px bg-gradient-to-b from-neon to-transparent" />
      </motion.a>
    </section>
  )
}

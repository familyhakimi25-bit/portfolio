import Lenis from 'lenis'
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import CommandPalette from './components/CommandPalette'
import Cursor from './components/Cursor'
import NeonWaves from './components/NeonWaves'
import Preloader from './components/Preloader'
import ThemeToggle from './components/ThemeToggle'
import VelocityMarquee from './components/VelocityMarquee'
import { marquee, profile } from './data'
import About from './sections/About'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Journey from './sections/Journey'
import Projects from './sections/Projects'
import { Certificates, Skills } from './sections/Skills'
import { EASE, Icon, btnPrimary } from './ui'

const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

type LenisWindow = Window & { __lenis?: Lenis }

function Header({ onPalette, menu, setMenu }: { onPalette: () => void; menu: boolean; setMenu: (v: boolean) => void }) {
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 240)
  })

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-neon via-iris to-pink" style={{ scaleX: bar }} aria-hidden="true" />

      <motion.header className="fixed inset-x-0 top-3 z-50 px-3" animate={{ y: hidden && !menu ? -90 : 0 }} transition={{ duration: 0.45, ease: EASE }}>
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/10 bg-ink/65 pl-4 pr-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,.8)] backdrop-blur-xl">
          <a href="#top" className="flex min-h-11 items-center gap-2.5 font-display text-sm font-bold" onClick={() => setMenu(false)}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-neon via-iris to-pink text-sm font-black text-ink">H</span>
            <span>
              hakimi<span className="text-neon">.</span>sec
            </span>
          </a>

          <nav className="hidden items-center lg:flex" aria-label="Main">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative flex min-h-11 items-center rounded-full px-3.5 text-sm transition-colors ${active === n.id ? 'text-fg' : 'text-muted hover:text-fg'}`}
              >
                {active === n.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-x-0 inset-y-1.5 rounded-full bg-white/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={onPalette}
              aria-label="Open command palette"
              className="hidden min-h-11 items-center gap-2 rounded-full border border-white/10 px-3.5 font-mono text-[11px] text-muted transition-colors hover:border-neon/50 hover:text-fg lg:flex"
            >
              <Icon name="search" className="h-3.5 w-3.5" /> Ctrl K
            </button>
            <a href={profile.resume} download className={`${btnPrimary} !min-h-11 !px-5 max-lg:hidden`}>
              <Icon name="download" /> Resume
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-fg lg:hidden"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <Icon name={menu ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.nav
            aria-label="Mobile"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenu(false)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: EASE }}
                className="flex min-h-16 items-center justify-between border-b border-line font-display text-2xl font-black uppercase tracking-tight"
              >
                {n.label}
                <span className="font-mono text-xs font-normal text-dim">0{i + 1}</span>
              </motion.a>
            ))}
            <a href={profile.resume} download className={`${btnPrimary} mt-9 w-full`}>
              <Icon name="download" /> Download resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [palette, setPalette] = useState(false)
  const [menu, setMenu] = useState(false)

  // smooth scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 }, lerp: 0.11 })
    ;(window as LenisWindow).__lenis = lenis
    return () => {
      lenis.destroy()
      delete (window as LenisWindow).__lenis
    }
  }, [])

  // freeze the page behind overlays
  useEffect(() => {
    const lock = palette || menu
    document.body.style.overflow = lock ? 'hidden' : ''
    const lenis = (window as LenisWindow).__lenis
    if (lock) lenis?.stop()
    else lenis?.start()
  }, [palette, menu])

  // Ctrl/Cmd + K or "/" opens the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? '')
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((v) => !v)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        setPalette(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <NeonWaves />
      <div className="grain" aria-hidden="true" />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-3 focus:text-ink">
        Skip to content
      </a>
      <Header onPalette={() => setPalette(true)} menu={menu} setMenu={setMenu} />
      <CommandPalette isOpen={palette} onClose={() => setPalette(false)} nav={nav} />

      <main className="relative z-[1]">
        <Hero ready={ready} />
        <VelocityMarquee items={marquee} />
        <About />
        <Skills />
        <Certificates />
        <Journey />
        <Projects />
        <Contact />
      </main>
    </MotionConfig>
  )
}

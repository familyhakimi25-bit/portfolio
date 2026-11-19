import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeToggle'

// The portfolio's own neon trio (index.css: --color-neon / iris / pink), so the
// ribbons match the HAKIMI gradient and the scroll bar.
const DARK = ['94,240,255', '157,123,255', '255,122,217']
// light theme: the darker accents from index.css, so ribbons still show on a pale page
const LIGHT = ['14,116,144', '109,40,217', '190,24,93']

/**
 * Neon Waves — layered glowing sine ribbons, ported from AttackMapper's
 * `_runWaves` (fyp-new/static/js/main.js). Fixed behind every section, so it
 * shows on the whole page. Half-res + 30 fps on phones, paused when the tab is
 * hidden, and a single still frame for "reduce motion" users.
 */
export default function NeonWaves() {
  const ref = useRef<HTMLCanvasElement>(null)
  const theme = useTheme()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const mq = (q: string) => window.matchMedia(q).matches
    const reduce = mq('(prefers-reduced-motion: reduce)')
    const lite = mq('(max-width: 820px)') || mq('(pointer: coarse)')
    const COLORS = theme === 'light' ? LIGHT : DARK
    const glow = theme === 'light' ? 6 : 14
    let w = 0, h = 0, raf = 0, t = 0, last = 0

    const resize = () => {
      const s = lite ? 0.5 : Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.max(1, Math.round(w * s))
      canvas.height = Math.max(1, Math.round(h * s))
      ctx.setTransform(s, 0, 0, s, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let L = 0; L < 5; L++) {
        const yBase = h * (0.3 + 0.11 * L)
        const amp = 26 + L * 14
        const col = `rgb(${COLORS[L % 3]})`
        ctx.beginPath()
        for (let x = 0; x <= w + 8; x += 8) {
          const y =
            yBase +
            Math.sin(x * 0.006 + t * (1 + L * 0.25) + L * 1.7) * amp +
            Math.sin(x * 0.0023 - t * 0.7 + L) * amp * 0.6
          if (x) ctx.lineTo(x, y)
          else ctx.moveTo(x, y)
        }
        ctx.globalAlpha = 0.42 - L * 0.06
        ctx.strokeStyle = col
        ctx.lineWidth = 1.6
        ctx.shadowBlur = glow
        ctx.shadowColor = col
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (lite && now - last < 33) return // ~30 fps on phones
      t += lite ? 0.024 : 0.012
      last = now
      draw()
    }
    const sync = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop)
    }
    const onResize = () => {
      resize()
      draw()
    }

    resize()
    draw()
    sync()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', sync)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [theme])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />
}

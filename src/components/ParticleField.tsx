import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeToggle'

type P = { x: number; y: number; vx: number; vy: number; r: number; c: number }
const DARK = ['94,240,255', '157,123,255', '255,122,217']
const LIGHT = ['14,116,144', '109,40,217', '190,24,93']

/** Drifting node network that links up near the pointer. Canvas 2D, paused when off screen. */
export default function ParticleField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const theme = useTheme()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const COLORS = theme === 'light' ? LIGHT : DARK
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, running = false, visible = true
    let pts: P[] = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.max(28, Math.min(96, Math.round((w * h) / 15000)))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.5 + 0.6,
        c: Math.floor(Math.random() * COLORS.length),
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const LINK = 132, MLINK = 190
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        else if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        else if (p.y > h + 20) p.y = -20

        const mdx = p.x - mouse.x, mdy = p.y - mouse.y
        const md = Math.hypot(mdx, mdy)
        if (md < MLINK) {
          // gentle push away, plus a bright link to the pointer
          const f = (1 - md / MLINK) * 0.6
          p.x += (mdx / (md || 1)) * f
          p.y += (mdy / (md || 1)) * f
          ctx.strokeStyle = `rgba(${COLORS[p.c]},${(1 - md / MLINK) * 0.55})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            const a = (1 - Math.sqrt(d2) / LINK) * 0.22
            ctx.strokeStyle = `rgba(${COLORS[p.c]},${a})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(${COLORS[p.c]},0.85)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      draw()
      if (running) raf = requestAnimationFrame(loop)
    }
    const sync = () => {
      const should = visible && !document.hidden && !reduce
      if (should && !running) {
        running = true
        raf = requestAnimationFrame(loop)
      } else if (!should && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    draw()
    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    io.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    sync()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [theme])

  return <canvas ref={ref} aria-hidden="true" className={`h-full w-full ${className}`} />
}

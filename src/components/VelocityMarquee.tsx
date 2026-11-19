import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { useRef } from 'react'
import { useReducedMotionPref } from '../ui'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/** Giant text band that drifts on its own and speeds up / reverses with the scroll. */
export default function VelocityMarquee({ items, baseVelocity = -1.6 }: { items: string[]; baseVelocity?: number }) {
  const reduce = useReducedMotionPref()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(smooth, [-2500, 2500], [10, -10])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * baseVelocity * (Math.min(delta, 60) / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={t} className="flex items-center">
          <span className={`whitespace-nowrap px-6 font-display text-4xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl ${i % 2 ? 'text-outline' : 'text-fg'}`}>{t}</span>
          <span className="text-holo font-display text-3xl sm:text-5xl">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative overflow-hidden border-y border-line bg-panel/60 py-6 sm:py-8" aria-label={items.join(', ')}>
      <motion.div className="flex w-max" style={{ x, skewX: reduce ? 0 : skewX }} aria-hidden="true">
        {row('a')}
        {row('b')}
      </motion.div>
    </div>
  )
}

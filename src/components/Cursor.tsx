import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer, useReducedMotionPref } from '../ui'

/** A glowing ring that trails the real cursor and grows over anything clickable. Desktop only. */
export default function Cursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotionPref()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })
  const [hot, setHot] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!fine || reduce) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setShown(true)
      const t = e.target as Element | null
      setHot(!!t?.closest?.('a, button, [data-hot]'))
    }
    const leave = () => setShown(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 h-10 w-10 rounded-full border border-neon/70"
      style={{ x: sx, y: sy }}
      animate={{ scale: hot ? 1.9 : 1, opacity: shown ? 1 : 0, backgroundColor: hot ? 'rgba(94,240,255,0.18)' : 'rgba(94,240,255,0)' }}
      transition={{ duration: 0.25 }}
    />
  )
}

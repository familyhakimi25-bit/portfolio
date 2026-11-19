import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Icon } from '../ui'

export type Theme = 'dark' | 'light'

/** Current theme, read from <html data-theme>. */
export function getTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

/** Re-renders when the theme changes (used by the canvases). */
export function useTheme(): Theme {
  const [theme, set] = useState<Theme>(getTheme)
  useEffect(() => {
    const on = () => set(getTheme())
    window.addEventListener('themechange', on)
    return () => window.removeEventListener('themechange', on)
  }, [])
  return theme
}

function apply(next: Theme) {
  const root = document.documentElement
  root.classList.add('theme-anim')
  if (next === 'light') root.setAttribute('data-theme', 'light')
  else root.removeAttribute('data-theme')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f5f7fb' : '#06080c')
  try {
    localStorage.setItem('theme', next)
  } catch {
    /* private mode: theme just won't be remembered */
  }
  window.dispatchEvent(new Event('themechange'))
  window.setTimeout(() => root.classList.remove('theme-anim'), 400)
}

/** Sun / moon button that flips between the dark and light theme. */
export default function ThemeToggle() {
  const theme = useTheme()
  const light = theme === 'light'
  return (
    <button
      type="button"
      onClick={() => apply(light ? 'dark' : 'light')}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Dark mode' : 'Light mode'}
      className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-white/10 text-muted transition-colors hover:border-neon/50 hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          <Icon name={light ? 'moon' : 'sun'} className="h-[18px] w-[18px]" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

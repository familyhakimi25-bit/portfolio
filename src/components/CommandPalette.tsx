import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { profile, projects } from '../data'
import { Icon, scrollToId, type IconName } from '../ui'

type Cmd = { label: string; hint: string; icon: IconName; run: () => void }

const open = (href: string) => window.open(href, '_blank', 'noopener,noreferrer')

/** Ctrl/Cmd + K command palette: jump to a section or run a quick action from the keyboard. */
export default function CommandPalette({ isOpen, onClose, nav }: { isOpen: boolean; onClose: () => void; nav: { id: string; label: string }[] }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  const cmds = useMemo<Cmd[]>(
    () => [
      ...nav.map((n) => ({ label: `Go to ${n.label}`, hint: 'section', icon: 'arrow' as IconName, run: () => scrollToId(n.id) })),
      {
        label: 'Download resume',
        hint: 'pdf',
        icon: 'download',
        run: () => {
          const a = document.createElement('a')
          a.href = profile.resume
          a.download = ''
          a.click()
        },
      },
      { label: 'Message on WhatsApp', hint: 'contact', icon: 'whatsapp', run: () => open(profile.whatsapp) },
      { label: 'Open GitHub profile', hint: 'link', icon: 'github', run: () => open(profile.github) },
      { label: 'Open AttackMapper live demo', hint: 'link', icon: 'external', run: () => open(projects[0].links[0].href) },
    ],
    [nav],
  )
  const shown = cmds.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase()))

  useEffect(() => {
    if (!isOpen) return
    setQ('')
    setSel(0)
    const prev = document.activeElement as HTMLElement | null
    const t = setTimeout(() => input.current?.focus(), 30)
    return () => {
      clearTimeout(t)
      prev?.focus?.()
    }
  }, [isOpen])

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-i="${sel}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  const run = (c?: Cmd) => {
    if (!c) return
    onClose()
    setTimeout(c.run, 60)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => (shown.length ? (s + 1) % shown.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => (shown.length ? (s - 1 + shown.length) % shown.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(shown[sel])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-panel shadow-[0_30px_120px_-20px_rgba(94,240,255,.35)]"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKey}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-neon">&gt;</span>
              <input
                ref={input}
                autoFocus
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setSel(0)
                }}
                placeholder="Type a command or search"
                aria-label="Search commands"
                className="h-14 w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-dim"
              />
              <kbd className="rounded-md border border-line px-2 py-1 font-mono text-[10px] text-dim">ESC</kbd>
            </div>
            <ul ref={list} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
              {shown.length === 0 && <li className="px-3 py-6 text-center font-mono text-sm text-dim">No matching command</li>}
              {shown.map((c, i) => (
                <li key={c.label} role="option" aria-selected={i === sel}>
                  <button
                    type="button"
                    data-i={i}
                    onMouseEnter={() => setSel(i)}
                    onClick={() => run(c)}
                    className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition-colors ${i === sel ? 'bg-neon/10 text-fg' : 'text-muted'}`}
                  >
                    <span className={`grid h-8 w-8 place-items-center rounded-lg border ${i === sel ? 'border-neon/40 text-neon' : 'border-line text-dim'}`}>
                      <Icon name={c.icon} />
                    </span>
                    <span className="flex-1">{c.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-dim">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-dim">
              <span>↑↓ move</span>
              <span>↵ run</span>
              <span className="ml-auto">hakimi.sec</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

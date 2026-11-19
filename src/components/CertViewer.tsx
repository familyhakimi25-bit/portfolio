import type Lenis from 'lenis'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { EASE, Icon } from '../ui'

export type CertDoc = { title: string; issuer: string; file: string }

/** Full-screen lightbox showing a certificate preview, with a link to the original PDF. */
export default function CertViewer({ doc, onClose }: { doc: CertDoc | null; onClose: () => void }) {
  // Esc closes; freeze the page (and Lenis) while open.
  useEffect(() => {
    if (!doc) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [doc, onClose])

  return createPortal(
    <AnimatePresence>
      {doc && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${doc.title}`}
        >
          <motion.div
            className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-panel shadow-[0_40px_120px_-30px_rgba(94,240,255,.35)]"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold tracking-tight">{doc.title}</p>
                <p className="truncate text-xs text-muted">{doc.issuer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`/certs/${doc.file}.pdf`}
                  target="_blank"
                  rel="noopener"
                  className="flex min-h-11 items-center gap-2 rounded-full border border-white/12 px-4 text-sm text-fg transition-colors hover:border-neon/50"
                >
                  <Icon name="external" /> <span className="max-sm:hidden">Open PDF</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-fg transition-colors hover:border-neon/50"
                  autoFocus
                >
                  <Icon name="close" className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="min-h-0 overflow-auto bg-[#fff]">
              <img src={`/certs/${doc.file}.webp`} alt={`${doc.title} certificate`} className="block h-auto w-full" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

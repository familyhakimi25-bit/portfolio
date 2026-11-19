import { motion } from 'motion/react'
import { profile } from '../data'
import { EASE, Icon, Magnetic, Reveal, ScrambleInView, scrollToId, type IconName } from '../ui'

const rows: { label: string; value: string; href: string; icon: IconName; download?: boolean; external?: boolean }[] = [
  { label: 'WhatsApp', value: profile.phoneDisplay, href: profile.whatsapp, icon: 'whatsapp', external: true },
  { label: 'Call', value: profile.phoneDisplay, href: `tel:${profile.phoneTel}`, icon: 'phone' },
  { label: 'GitHub', value: 'familyhakimi25-bit', href: profile.github, icon: 'github', external: true },
  { label: 'Resume', value: 'Download PDF', href: profile.resume, icon: 'download', download: true },
]

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line pt-24 md:pt-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="blob blob-a left-[8%] top-[10%] h-[420px] w-[520px] bg-iris/15" />
        <div className="blob blob-b right-[5%] top-[30%] h-[380px] w-[460px] bg-neon/12" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-neon">
          <span className="text-dim">06</span>
          <span className="h-px w-10 bg-gradient-to-r from-neon to-transparent" />
          <ScrambleInView text="Contact" />
        </p>

        <h2 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(3.4rem,13.5vw,11.5rem)]" aria-label="Let's talk.">
          {["Let's", 'talk.'].map((w, i) => (
            <motion.span
              key={w}
              className="block overflow-hidden pb-[0.1em]"
              aria-hidden="true"
              initial="hide"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            >
              <motion.span
                className={`block ${i === 0 ? 'text-outline' : 'text-holo'}`}
                variants={{ hide: { y: '110%' }, show: { y: 0 } }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
              >
                {w}
              </motion.span>
            </motion.span>
          ))}
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              Hiring for a security, network or IT role? Message me on WhatsApp, or look through my code first.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Icon name="pin" /> {profile.location}
            </p>
            <Magnetic strength={0.4} className="mt-10">
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group relative grid h-40 w-40 place-items-center rounded-full bg-fg text-center text-ink transition-shadow duration-300 hover:shadow-[0_0_70px_rgba(94,240,255,.55)]"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-neon via-iris to-pink opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                <span className="relative flex flex-col items-center gap-2 font-display text-xs font-bold uppercase leading-tight tracking-wide">
                  <Icon name="whatsapp" className="h-7 w-7" />
                  Say hi on
                  <br />
                  WhatsApp
                </span>
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-b border-line">
              {rows.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    {...(r.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    {...(r.download ? { download: true } : {})}
                    className="group relative flex min-h-20 items-center justify-between gap-4 overflow-hidden border-t border-line px-1 py-5 transition-colors duration-300 hover:border-neon sm:px-4"
                  >
                    <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-gradient-to-r from-neon/10 via-iris/10 to-transparent transition-transform duration-300 group-hover:scale-y-100" aria-hidden="true" />
                    <span className="relative flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-neon group-hover:text-neon">
                        <Icon name={r.icon} className="h-5 w-5" />
                      </span>
                      <span className="font-display text-base font-bold uppercase tracking-tight sm:text-2xl">{r.label}</span>
                    </span>
                    <span className="relative flex items-center gap-3 whitespace-nowrap font-mono text-xs text-muted sm:text-sm">
                      {r.value}
                      <Icon name="arrowUpRight" className="h-5 w-5 text-fg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neon" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <footer className="relative mt-24">
        <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <p className="translate-y-[18%] text-center whitespace-nowrap font-display text-[16.5vw] font-black uppercase leading-[0.8] tracking-tight text-outline-dim">Hakimi</p>
        </div>
        <div className="relative border-t border-line bg-ink/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-dim sm:flex-row">
            <p>© 2026 {profile.name}</p>
            <p className="font-mono">Built with React, Tailwind CSS and Motion</p>
            <button type="button" onClick={() => scrollToId('top')} className="inline-flex min-h-11 items-center gap-2 font-mono uppercase tracking-wider text-muted hover:text-fg">
              Back to top <Icon name="arrow" className="h-4 w-4 -rotate-90" />
            </button>
          </div>
        </div>
      </footer>
    </section>
  )
}

import { useCallback, useState, type CSSProperties } from 'react'
import CertViewer, { type CertDoc } from '../components/CertViewer'
import { siCisco, tech, brandColor } from '../tech'
import { certs, ctf, kiar, rakyatDigital, skills } from '../data'
import { BrandIcon, Card, Icon, Reveal, SectionHead, Tilt } from '../ui'

export function Skills() {
  const [security, tools, networking, programming, frameworks, languages] = skills
  const SkillCard = ({ s, className = '', deco }: { s: (typeof skills)[number]; className?: string; deco?: boolean }) => (
    <Card acc={s.acc} className={`h-full p-6 md:p-7 ${className}`}>
      {deco && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-70" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border border-neon/20" />
          <div className="absolute inset-[18%] rounded-full border border-neon/15" />
          <div className="absolute inset-[36%] rounded-full border border-neon/15" />
          <div className="radar absolute inset-0 rounded-full" />
        </div>
      )}
      <div className="relative">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(var(--acc),.35)] bg-[rgba(var(--acc),.1)] text-[rgb(var(--acc))]">
          <Icon name={s.icon} className="h-6 w-6" />
        </span>
        <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">{s.group}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {s.items.map((it) => (
            <li key={it} className="rounded-lg border border-line bg-ink/70 px-3 py-1.5 text-sm text-fg transition-colors hover:border-[rgba(var(--acc),.5)]">
              {it}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )

  return (
    <section id="skills" className="relative border-y border-line bg-panel/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead
          index="02"
          eyebrow="Skills"
          lines={['What I bring', <span className="text-holo">to a team.</span>]}
          lead="Only things I have actually used in my projects, labs and internship."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="md:col-span-2">
            <SkillCard s={security} deco />
          </Reveal>
          <Reveal delay={0.08}>
            <SkillCard s={tools} />
          </Reveal>
          <Reveal>
            <SkillCard s={networking} />
          </Reveal>
          <Reveal delay={0.08}>
            <SkillCard s={programming} />
          </Reveal>
          <Reveal delay={0.16}>
            <SkillCard s={frameworks} />
          </Reveal>

          {/* logo wall */}
          <Reveal className="md:col-span-2">
            <Card className="h-full p-6 md:p-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-neon">Tech I work with</h3>
              <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {tech.map((t) => (
                  <li
                    key={t.name}
                    className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-line bg-ink/60 px-2 py-4 text-muted transition duration-300 hover:-translate-y-1 hover:border-[var(--brand)] hover:text-[var(--brand)] hover:shadow-[0_10px_30px_-12px_var(--brand)]"
                    style={{ '--brand': brandColor(t.icon.hex) } as CSSProperties}
                  >
                    <BrandIcon path={t.icon.path} className="h-7 w-7" />
                    <span className="text-center font-mono text-[11px] leading-tight text-muted">{t.name}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <SkillCard s={languages} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Certificates() {
  const [doc, setDoc] = useState<CertDoc | null>(null)
  const close = useCallback(() => setDoc(null), [])
  return (
    <section id="certificates" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <CertViewer doc={doc} onClose={close} />
      <SectionHead
        index="03"
        eyebrow="Certificates"
        lines={['Courses', <span className="text-holo">completed.</span>]}
        lead="Cisco Networking Academy, including the full three-part CCNA course series, plus 12 Rakyat Digital courses."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.08}>
            <Tilt max={7} className="h-full">
              <Card className="guilloche h-full p-6">
                <div className="flex h-full min-h-[190px] flex-col">
                  <div className="flex items-start justify-between">
                    <span className="flex items-center gap-2.5 text-[#1BA0D7]">
                      <BrandIcon path={siCisco.path} className="h-9 w-9" />
                    </span>
                    <span className="font-display text-3xl font-black text-outline-dim">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-bold leading-snug tracking-tight">{c.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">Cisco Networking Academy</p>
                  {c.file && (
                    <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neon">
                      <Icon name="eye" className="h-3.5 w-3.5" /> View certificate
                    </span>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mint">
                      <Icon name="check" className="h-3.5 w-3.5" /> Completed
                    </span>
                    <span className="font-mono text-xs text-dim">{c.date}</span>
                  </div>
                </div>
                <div className="foil" aria-hidden="true" />
                <div className="glare" aria-hidden="true" />
                {c.file && (
                  <button
                    type="button"
                    onClick={() => setDoc({ title: c.name, issuer: 'Cisco Networking Academy', file: c.file! })}
                    className="absolute inset-0 z-10 cursor-pointer rounded-[inherit]"
                    aria-label={`View certificate: ${c.name}`}
                  />
                )}
              </Card>
            </Tilt>
          </Reveal>
        ))}
        {ctf.show && (
        <Reveal delay={0.16}>
          <Tilt max={7} className="h-full">
            <Card acc="255, 122, 217" className="guilloche h-full p-6">
              <div className="flex h-full min-h-[190px] flex-col">
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-pink/40 bg-pink/10 text-pink">
                    <Icon name="flag" className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-black text-outline-dim">CTF</span>
                </div>
                <h3 className="mt-5 font-display text-base font-bold leading-snug tracking-tight">{ctf.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{ctf.text}</p>
                {ctf.file && (
                  <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-pink/30 bg-pink/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-pink">
                    <Icon name="eye" className="h-3.5 w-3.5" /> View certificate
                  </span>
                )}
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-pink">{ctf.role}</span>
                  <span className="font-mono text-xs text-dim">{ctf.when}</span>
                </div>
              </div>
              <div className="foil" aria-hidden="true" />
              <div className="glare" aria-hidden="true" />
              {ctf.file && (
                <button
                  type="button"
                  onClick={() => setDoc({ title: ctf.title, issuer: 'Certificate of participation', file: ctf.file! })}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[inherit]"
                  aria-label={`View certificate: ${ctf.title}`}
                />
              )}
            </Card>
          </Tilt>
        </Reveal>
        )}
      </div>

      {/* Rakyat Digital (12 courses, one grouped panel) + KIAR */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Card acc="125, 255, 178" className="guilloche h-full p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-mint/40 bg-mint/10 text-mint">
                  <Icon name="globe" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight">{rakyatDigital.title}</h3>
                  <p className="text-sm text-muted">{rakyatDigital.issuer}</p>
                </div>
              </div>
              <div className="sm:text-right">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-mint">{rakyatDigital.courses.length} courses completed</span>
                <span className="block font-mono text-[11px] text-dim">Tap a course to view its certificate</span>
                <span className="font-mono text-xs text-dim">{rakyatDigital.date}</span>
              </div>
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {rakyatDigital.courses.map((c) => (
                <li key={c.name}>
                  <button
                    type="button"
                    disabled={!c.file}
                    onClick={() => c.file && setDoc({ title: c.name, issuer: 'Rakyat Digital · Ministry of Digital, Malaysia', file: c.file })}
                    className={`group relative z-10 flex min-h-11 w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:border-mint/60 hover:text-fg ${c.key ? 'border-mint/35 bg-mint/[0.06] text-fg' : 'border-line bg-ink/60 text-muted'}`}
                  >
                    <Icon name="check" className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${c.key ? 'text-mint' : 'text-dim'}`} />
                    <span className="flex-1">{c.name}</span>
                    {c.file && <Icon name="eye" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dim transition-colors group-hover:text-mint" />}
                  </button>
                </li>
              ))}
            </ul>
            <div className="foil" aria-hidden="true" />
            <div className="glare" aria-hidden="true" />
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Tilt max={7} className="h-full">
            <Card acc="157, 123, 255" className="guilloche h-full p-6">
              <div className="flex h-full min-h-[190px] flex-col">
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-iris/40 bg-iris/10 text-iris">
                    <Icon name="shield" className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-black text-outline-dim">KIAR</span>
                </div>
                <h3 className="mt-5 font-display text-base font-bold leading-snug tracking-tight">{kiar.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{kiar.issuer}</p>
                {kiar.file && (
                  <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-iris/30 bg-iris/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-iris">
                    <Icon name="eye" className="h-3.5 w-3.5" /> View certificate
                  </span>
                )}
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-iris">{kiar.kind}</span>
                  <span className="font-mono text-xs text-dim">{kiar.date}</span>
                </div>
              </div>
              <div className="foil" aria-hidden="true" />
              <div className="glare" aria-hidden="true" />
              {kiar.file && (
                <button
                  type="button"
                  onClick={() => setDoc({ title: kiar.title, issuer: kiar.issuer, file: kiar.file! })}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[inherit]"
                  aria-label={`View certificate: ${kiar.title}`}
                />
              )}
            </Card>
          </Tilt>
        </Reveal>
      </div>
    </section>
  )
}

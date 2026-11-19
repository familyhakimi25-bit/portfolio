import { badge, photo, profile } from '../data'
import { Icon, Tilt } from '../ui'

/** Holographic access badge: the portrait and key facts on a card that tilts in 3D with the pointer. */
export default function IdCard() {
  return (
    <div className="relative mx-auto w-full max-w-[390px]">
      <div className="float-y relative">
        <Tilt max={11}>
          <div className="holo-border shadow-[0_40px_120px_-30px_rgba(94,240,255,.35)]">
            <div className="holo-inner relative overflow-hidden bg-panel">
              {/* header strip */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber/90 to-amber/40 text-ink">
                    <Icon name="chip" className="h-5 w-5" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Access badge</p>
                    <p className="font-display text-xs font-bold">hakimi.sec</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mint">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" /> active
                </span>
              </div>

              {/* portrait */}
              <div className="relative h-[clamp(210px,34vh,330px)] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(94,240,255,.34),rgba(157,123,255,.2)_45%,transparent_72%)]" />
                <div className="grid-bg absolute inset-0 opacity-70" />
                <span className="absolute -right-3 top-2 select-none font-display text-[9rem] font-black leading-none text-white/[0.07]" aria-hidden="true">
                  H
                </span>
                <img
                  src={photo}
                  width={720}
                  height={930}
                  alt={`Portrait of ${profile.name}`}
                  className="absolute bottom-0 left-1/2 h-[104%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,.6)]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-panel to-transparent" />
                <div className="scanline" />
                {/* corner brackets */}
                <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-neon/80" />
                <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-neon/80" />
                <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-neon/80" />
                <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-neon/80" />
              </div>

              {/* identity */}
              <div className="px-5 pb-5 pt-1">
                <p className="font-display text-lg font-bold leading-tight">{profile.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-neon">{profile.title}</p>

                <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
                  {badge.map(([k, v]) => (
                    <div key={k} className="bg-panel px-3 py-2.5">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{k}</dt>
                      <dd className="mt-0.5 text-[13px] font-medium leading-snug text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div className="barcode h-8 flex-1 text-fg/70" aria-hidden="true" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">UPTM · 2026</p>
                </div>
              </div>

              <div className="foil" aria-hidden="true" />
              <div className="glare" aria-hidden="true" />
            </div>
          </div>
        </Tilt>
      </div>
    </div>
  )
}

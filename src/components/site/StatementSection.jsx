import Reveal from './Reveal';

export default function StatementSection({ statement }) {
  return (
    <section id="statement" className="section-shell section-space pt-10">
      <Reveal className="statement-panel overflow-hidden rounded-[2.75rem] px-7 py-20 text-slate-50 sm:px-12 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              {statement.label}
            </span>
            <h2 className="mt-8 max-w-[14ch] text-[clamp(3.45rem,7.8vw,6.15rem)] font-bold leading-[0.87] tracking-[-0.088em] lg:max-w-[12ch]">
              {statement.headline}
            </h2>
            <p className="mt-8 max-w-[34rem] text-[1.04rem] leading-[1.95] text-slate-300 sm:text-[1.1rem]">{statement.supporting}</p>
            <p className="mt-10 max-w-[24rem] font-editorial text-[2.15rem] italic leading-tight text-slate-200 sm:text-[2.6rem]">
              Product polish, network awareness, and security-minded execution.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {['Identity', 'Network behavior', 'Trust by design'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative flex h-[14.5rem] w-[14.5rem] items-center justify-center rounded-full border border-white/10 bg-white/4 backdrop-blur-sm">
              <span className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-slate-500/70" />
              <span className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-slate-500/70" />
              <span className="absolute h-[9.5rem] w-[9.5rem] rounded-full border border-white/12" />
              <span className="absolute h-[6.5rem] w-[10.5rem] rotate-[28deg] rounded-full border border-accent/90" />
              <span className="absolute h-[6.5rem] w-[10.5rem] -rotate-[28deg] rounded-full border border-slate-200/85" />
              <span className="absolute h-5 w-5 rounded-full bg-accent shadow-[0_0_45px_var(--theme-accent)]" />
              <span className="absolute text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-300">
                Signal
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

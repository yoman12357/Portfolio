import Reveal from './Reveal';

export default function SectionHeading({ label, title, description, centered = false }) {
  return (
    <Reveal
      className={centered ? 'mx-auto max-w-[46rem] text-center' : 'max-w-[46rem]'}
      staggerChildren={0.08}
      delayChildren={0.03}
      distance={18}
      duration={0.46}
    >
      <Reveal.Item>
        <div className={`section-kicker ${centered ? 'justify-center' : ''}`}>
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal.Item>

      <Reveal.Item>
        <h2
          className={`mt-8 max-w-[15ch] text-[clamp(3.6rem,8vw,6.65rem)] font-bold leading-[0.86] tracking-[-0.086em] text-foreground ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {title}
        </h2>
      </Reveal.Item>

      {description ? (
        <Reveal.Item>
          <p
            className={`mt-8 max-w-[34rem] text-[1.03rem] leading-[1.95] text-foreground-muted sm:text-[1.1rem] ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        </Reveal.Item>
      ) : null}
    </Reveal>
  );
}

import Reveal from './Reveal';

export default function SectionTransition({ step, title }) {
  return (
    <div className="section-shell py-5 sm:py-6 lg:py-8">
      <Reveal className="section-transition-shell mx-auto max-w-4xl text-center">
        <div className="section-transition-line" />
        <span className="section-transition-step">{step}</span>
        <p className="max-w-2xl text-sm leading-7 text-foreground-muted sm:text-[0.98rem]">
          {title}
        </p>
      </Reveal>
    </div>
  );
}

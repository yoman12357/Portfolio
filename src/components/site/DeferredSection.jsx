import { memo, useEffect, useRef, useState } from 'react';

function DeferredSection({
  id,
  className = 'section-space',
  rootMargin = '320px 0px',
  placeholderHeightClassName = 'min-h-[16rem]',
  render,
}) {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return undefined;
    }

    if (typeof window === 'undefined') {
      setShouldRender(true);
      return undefined;
    }

    const node = sectionRef.current;

    if (!node || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={sectionRef} className="deferred-section">
      {shouldRender ? (
        render()
      ) : (
        <section id={id} className={className} aria-hidden="true">
          <div className="section-shell">
            <div className={placeholderHeightClassName} />
          </div>
        </section>
      )}
    </div>
  );
}

export default memo(DeferredSection);

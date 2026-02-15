import { useEffect, useRef } from 'react';
import './CursorGlow.css';

export default function CursorGlow() {
    const ref = useRef(null);
    const pos = useRef({ x: 0, y: 0, gx: 0, gy: 0 });

    useEffect(() => {
        const onMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };
        window.addEventListener('mousemove', onMove);

        let raf;
        const update = () => {
            const p = pos.current;
            p.gx += (p.x - p.gx) * 0.08;
            p.gy += (p.y - p.gy) * 0.08;
            if (ref.current) {
                ref.current.style.left = p.gx + 'px';
                ref.current.style.top = p.gy + 'px';
            }
            raf = requestAnimationFrame(update);
        };
        update();

        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
    }, []);

    return <div ref={ref} className="cursor-glow" />;
}

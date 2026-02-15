import { useEffect, useRef } from 'react';
import './ParticleCanvas.css';

export default function ParticleCanvas() {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const raf = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();

        const colors = ['#00f5ff', '#ff2dff', '#7b2dff'];
        const create = (x, y) => ({
            x: x ?? Math.random() * canvas.width,
            y: y ?? Math.random() * canvas.height,
            size: Math.random() * 2.5 + 0.5,
            sx: (Math.random() - 0.5) * 1.2,
            sy: (Math.random() - 0.5) * 1.2,
            opacity: Math.random() * 0.5 + 0.15,
            color: colors[Math.floor(Math.random() * 3)],
            life: Math.random() * 160 + 100,
            maxLife: 0,
        });

        const init = () => {
            const arr = [];
            const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000));
            for (let i = 0; i < count; i++) { const p = create(); p.maxLife = p.life; arr.push(p); }
            particles.current = arr;
        };
        init();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const pts = particles.current;
            const m = mouse.current;

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                p.x += p.sx; p.y += p.sy; p.life--;
                const dx = m.x - p.x, dy = m.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) { const f = (140 - dist) / 140; p.sx += (dx / dist) * f * 0.015; p.sy += (dy / dist) * f * 0.015; }
                p.sx *= 0.99; p.sy *= 0.99;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                if (p.life <= 0) { const n = create(); n.maxLife = n.life; pts[i] = n; }
                else p.opacity = (p.life / p.maxLife) * 0.45;
            }

            // connections
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 130) {
                        const grad = ctx.createLinearGradient(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
                        grad.addColorStop(0, pts[i].color); grad.addColorStop(1, pts[j].color);
                        ctx.save(); ctx.globalAlpha = ((130 - d) / 130) * 0.08;
                        ctx.strokeStyle = grad; ctx.lineWidth = 0.5;
                        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
                        ctx.restore();
                    }
                }
            }

            // draw
            for (const p of pts) {
                ctx.save(); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
                ctx.shadowBlur = 12; ctx.shadowColor = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
            }

            raf.current = requestAnimationFrame(animate);
        };
        animate();

        const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
        const onClick = (e) => {
            for (let i = 0; i < 6; i++) {
                const p = create(e.clientX + (Math.random() - 0.5) * 30, e.clientY + (Math.random() - 0.5) * 30);
                p.maxLife = p.life; p.size = Math.random() * 3 + 1.5; particles.current.push(p);
            }
            if (particles.current.length > 200) particles.current.splice(0, particles.current.length - 200);
        };
        const onResize = () => { resize(); init(); };

        window.addEventListener('mousemove', onMouse);
        window.addEventListener('resize', onResize);
        canvas.addEventListener('click', onClick);
        return () => {
            cancelAnimationFrame(raf.current);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('resize', onResize);
            canvas.removeEventListener('click', onClick);
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-canvas" />;
}

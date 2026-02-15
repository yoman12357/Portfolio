import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

export default function Loader() {
    const [phase, setPhase] = useState(0); // 0 = rings, 1 = name, 2 = hidden

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 800);
        const t2 = setTimeout(() => setPhase(2), 2200);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <AnimatePresence>
            {phase < 2 && (
                <motion.div
                    className="loader"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <div className="loader__inner">
                        {/* Rings */}
                        <motion.div
                            className="loader__rings"
                            animate={{ opacity: phase === 0 ? 1 : 0, scale: phase === 0 ? 1 : 0.5 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="loader__ring"></div>
                            <div className="loader__ring"></div>
                            <div className="loader__ring"></div>
                            <span className="loader__text">INITIALIZING</span>
                        </motion.div>

                        {/* Name reveal */}
                        <motion.div
                            className="loader__name-wrap"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <h1 className="loader__name">
                                {'ARYAN'.split('').map((ch, i) => (
                                    <motion.span
                                        key={i}
                                        className="loader__char"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: i * 0.08, duration: 0.4 }}
                                    >
                                        {ch}
                                    </motion.span>
                                ))}
                            </h1>
                            <motion.h2
                                className="loader__surname"
                                initial={{ opacity: 0, letterSpacing: '20px' }}
                                animate={phase >= 1 ? { opacity: 1, letterSpacing: '12px' } : {}}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                BOKOLIA
                            </motion.h2>
                            <motion.div
                                className="loader__line"
                                initial={{ scaleX: 0 }}
                                animate={phase >= 1 ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase';
import './VisitorCounter.css';

export default function VisitorCounter() {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const trackVisitor = async () => {
            try {
                const ref = doc(db, 'analytics', 'visitors');
                const hasVisited = sessionStorage.getItem('portfolio-visited');

                if (!hasVisited) {
                    await setDoc(ref, { count: increment(1) }, { merge: true });
                    sessionStorage.setItem('portfolio-visited', 'true');
                }

                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setCount(snap.data().count || 0);
                }
            } catch (err) {
                console.log('Visitor counter:', err.message);
            }
        };
        trackVisitor();
    }, []);

    if (count === null) return null;

    return (
        <div className="visitor-counter">
            <span className="visitor-counter__dot" />
            <span className="visitor-counter__text">
                <span className="visitor-counter__num">{count.toLocaleString()}</span> visitors
            </span>
        </div>
    );
}

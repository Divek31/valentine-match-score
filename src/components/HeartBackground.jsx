import React, { useEffect, useState } from 'react';
import './HeartBackground.css';

const HeartBackground = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((currentHearts) => {
                const newHeart = {
                    id: Date.now(),
                    left: Math.random() * 100,
                    animationDuration: Math.random() * 3 + 2,
                    opacity: Math.random() * 0.5 + 0.3,
                    size: Math.random() * 20 + 10,
                };
                // Keep only the last 50 hearts to prevent memory issues
                return [...currentHearts.slice(-49), newHeart];
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="heart-container">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="heart"
                    style={{
                        left: `${heart.left}%`,
                        animationDuration: `${heart.animationDuration}s`,
                        opacity: heart.opacity,
                        fontSize: `${heart.size}px`,
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
};

export default HeartBackground;

import React, { useState, useEffect } from 'react';
import './ClickToHeart.css';

const ClickToHeart = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const newHeart = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };
            setHearts((prev) => [...prev, newHeart]);

            // Remove heart after animation (1s)
            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="click-to-heart-container">
            {hearts.map((heart) => (
                <span
                    key={heart.id}
                    className="click-heart"
                    style={{ left: heart.x, top: heart.y }}
                >
                    ❤️
                </span>
            ))}
        </div>
    );
};

export default ClickToHeart;

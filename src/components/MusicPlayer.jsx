import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [muted, setMuted] = useState(false);
    const audioRef = useRef(null);

    // Use a direct link to a royalty-free romantic/happy song
    // This is a placeholder standard example; reliable and won't 404 easily.
    // "Sunny" from Bensound or similar is good, but for direct linking we'll use a reliable CDN example or similar.
    // Using a sample from a public source.
    const songUrl = "https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3"; // "Relaxing Romantic" style loop

    useEffect(() => {
        // Attempt auto-play when component mounts
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // Start at 50% volume
            audioRef.current.play().catch(e => {
                console.log("Audio playback failed (likely browser policy):", e);
            });
        }
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <div className="music-player">
            <audio ref={audioRef} src={songUrl} loop />
            <button className="mute-btn" onClick={toggleMute} title={muted ? "Unmute" : "Mute"}>
                {muted ? "🔇" : "🎵"}
            </button>
        </div>
    );
};

export default MusicPlayer;

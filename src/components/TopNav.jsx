import { useState, useRef, useEffect } from "react";

export default function TopNav({ onOpenCollection }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio.play().catch(() => setIsMuted(true));
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.play();
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  const tabs = [
    { label: "LOBBY", active: true },
    { label: "COLLECTION" },
  ];

  return (
    <>
      <audio ref={audioRef} loop autoPlay src="/audio/champ-select.mp3" />

      <nav className="flex items-center justify-between bg-linear-to-b from-lol-nav-top to-lol-nav-bottom border-b border-lol-border px-5 h-12 sticky top-0 z-50">
        {/* Left */}
        <div className="flex items-center gap-1.5">
          <img src="/images/icons/poro.gif" alt="LoL" className="w-8 h-8" />
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={tab.label === "COLLECTION" ? onOpenCollection : undefined}
              className={`px-4 py-3 text-xs font-bold tracking-widest uppercase transition-colors border-none bg-transparent cursor-pointer
                ${
                  tab.active
                    ? "text-lol-gold bg-lol-gold/10 border border-lol-gold/30 rounded"
                    : "text-lol-grey hover:text-lol-gold-light"
                }`}
            >
              {tab.alert}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-sm text-lol-grey">
          <span>LOOT</span>
          <span>STORE</span>
          <span className="flex items-center gap-0.5"><img src="/images/icons/currency.jpg" className="w-4 h-4" /> 446</span>
          <span className="flex items-center gap-0.5"><img src="/images/icons/blue-essence.jpg" className="w-4 h-4" /> 6444</span>
          <button
            onClick={toggleMute}
            className="bg-lol-gold text-lol-blue-dark border-none px-3.5 py-1.5 rounded font-bold text-xs cursor-pointer hover:bg-lol-gold-light transition-colors"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </nav>
    </>
  );
}

import { useState, useEffect, useRef } from "react";

export default function PlayerSlot({ player, showJoin }) {
  const [showBubble, setShowBubble] = useState(false);
  const slotRef = useRef(null);

  useEffect(() => {
    if (!showBubble) return;
    const handler = (e) => {
      if (slotRef.current && !slotRef.current.contains(e.target)) {
        setShowBubble(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showBubble]);

  if (!player) {
    return (
      <div className="flex items-center px-3.5 py-2.5 mb-1 border border-lol-border/30 border-l-[3px] border-l-lol-border/30 bg-[rgba(10,20,40,0.5)] min-h-14">
        <span className="text-lol-grey/40 text-sm pl-2.5">Empty</span>
      </div>
    );
  }

  return (
    <div
      ref={slotRef}
      onClick={() => setShowBubble((prev) => !prev)}
      className="relative flex items-center px-3.5 py-2.5 mb-1 border border-lol-border border-l-[3px] border-l-lol-gold bg-[rgba(30,35,40,0.7)] min-h-14 cursor-pointer transition-all duration-300 hover:bg-[rgba(40,45,55,0.8)] hover:translate-x-1"
    >
      {/* Level */}
      <span className="text-sm font-bold text-lol-gold w-7 text-center">
        {player.level}
      </span>

      {/* Avatar */}
      <img
        src={player.avatar}
        alt={player.name}
        className="w-9 h-9 rounded-full border-2 border-lol-gold-dark mx-2.5 object-cover"
      />

      {/* Name */}
      <div className="flex flex-col flex-1">
        <span className="text-sm font-bold text-lol-gold-light">{player.username}</span>
        <span className="text-xs text-lol-grey">{player.name}</span>
      </div>

      {/* Role icon */}
      {player.roleIcon && (
        <img
          src={player.roleIcon}
          alt="role"
          className="w-5 h-5 ml-2 opacity-70"
        />
      )}

      {/* Join button */}
      {showJoin && (
        <button className="absolute right-3.5 px-6 py-1.5 border-2 border-lol-gold bg-transparent text-lol-gold text-[11px] font-bold tracking-wider uppercase cursor-pointer transition-all hover:bg-lol-gold/15">
          JOIN
        </button>
      )}

      {/* Message bubble */}
      {showBubble && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)] bg-lol-nav-top border border-lol-gold-dark rounded-lg p-4 px-5 w-80 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          <p className="text-sm text-lol-text leading-relaxed whitespace-pre-line mb-2">
            {player.message}
          </p>
          <div className="text-xs text-lol-gold font-bold text-right mt-2">
            - {player.username} ({player.name})
          </div>
        </div>
      )}
    </div>
  );
}

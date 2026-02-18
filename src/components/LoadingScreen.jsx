import { useState, useEffect } from "react";
import { asset } from "../utils";

export default function LoadingScreen({ players, onComplete }) {
  const [loading, setLoading] = useState(true);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [exiting, setExiting] = useState(false);

  const allFlipped = players.every((p) => flippedCards[p.id]);

  // Cards stagger in immediately, progress bar fills over 4s
  useEffect(() => {
    const revealTimer = setTimeout(() => setCardsRevealed(true), 300);
    const loadTimer = setTimeout(() => setLoading(false), 4200);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  const handleFlip = (id) => {
    if (loading) return; // can't flip until loaded
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleContinue = () => {
    setExiting(true);
    setTimeout(() => onComplete(), 600);
  };

  // Split players into two rows
  const topRow = players.filter((p) => p.team === 1);
  const bottomRow = players.filter((p) => p.team === 2);
  const padRow = (row) => {
    const padded = [...row];
    while (padded.length < 5) padded.push(null);
    return padded;
  };

  return (
    <div
      className={`fixed inset-0 z-200 flex flex-col transition-opacity duration-500 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={asset("/images/loading-bg.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark overlay so cards are readable */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main content area */}
      <div className="relative flex-1 flex flex-col items-center justify-center z-10 px-4">
        {/* Top row */}
        <div className="flex items-end justify-center gap-3 mb-2 max-md:gap-1.5 max-sm:gap-1">
          {padRow(topRow).map((player, i) => (
            <BannerCard
              key={player?.id ?? `empty-top-${i}`}
              player={player}
              index={i}
              revealed={cardsRevealed}
              loading={loading}
              flipped={player ? !!flippedCards[player.id] : false}
              onFlip={player ? () => handleFlip(player.id) : undefined}
            />
          ))}
        </div>

        {/* Game tip divider */}
        <p className="text-lol-grey/80 text-xs my-2 text-center italic max-md:text-[10px] drop-shadow-lg">
          &quot;Tristana&apos;s cannon is named &apos;Boomer&apos;.&quot;
        </p>

        {/* Bottom row */}
        <div className="flex items-start justify-center gap-3 mt-2 max-md:gap-1.5 max-sm:gap-1">
          {padRow(bottomRow).map((player, i) => (
            <BannerCard
              key={player?.id ?? `empty-bot-${i}`}
              player={player}
              index={i + 5}
              revealed={cardsRevealed}
              loading={loading}
              flipped={player ? !!flippedCards[player.id] : false}
              onFlip={player ? () => handleFlip(player.id) : undefined}
            />
          ))}
        </div>

        {/* Continue button — appears after all real cards are flipped */}
        <button
          onClick={handleContinue}
          className={`mt-6 px-10 py-3 border-2 border-lol-teal bg-black/40 backdrop-blur-sm text-lol-teal text-sm font-bold tracking-wider uppercase cursor-pointer transition-all duration-500 hover:bg-lol-teal hover:text-lol-blue-dark hover:shadow-[0_0_24px_rgba(10,200,185,0.4)] ${
            allFlipped
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          Continue
        </button>
      </div>

      {/* Bottom bar with progress */}
      <div className="relative z-10 px-6 pb-4 pt-2">
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-lol-teal rounded-full transition-all"
            style={{
              animation: loading ? "loadProgress 4s ease-in-out forwards" : undefined,
              width: loading ? undefined : "100%",
            }}
          />
        </div>
        {/* Footer info */}
        <div className="flex items-center justify-between text-lol-grey/50 text-[10px]">
          <span className="flex items-center gap-2">
            {loading ? (
              <span className="text-lol-gold-light/70 tracking-widest uppercase text-xs font-medium animate-pulse">
                Loading...
              </span>
            ) : (
              <span className="text-lol-gold-light/70 tracking-widest uppercase text-xs font-medium">
                Click each card to read
              </span>
            )}
          </span>
          <span className="text-lol-gold/50 font-mono">128 ms</span>
        </div>
      </div>

      <style>{`
        @keyframes loadProgress {
          0% { width: 0%; }
          60% { width: 75%; }
          90% { width: 95%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

/* ── Individual Banner Card ── */
function BannerCard({ player, index, revealed, loading, flipped, onFlip }) {
  if (!player) {
    return (
      <div
        className={`w-52 h-104 max-lg:w-44 max-lg:h-88 max-md:w-34 max-md:h-68 max-sm:w-24 max-sm:h-52 rounded-md border border-white/10 bg-black/30 backdrop-blur-sm transition-all duration-700 ${
          revealed ? "opacity-30 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      />
    );
  }

  return (
    <div
      className={`relative w-52 max-lg:w-44 max-md:w-34 max-sm:w-24 transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${!loading && !flipped ? "cursor-pointer" : ""} ${loading ? "" : "cursor-pointer"}`}
      style={{ transitionDelay: `${index * 80}ms`, perspective: "1000px" }}
      onClick={onFlip}
    >
      <div
        className="relative w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── Front: Champion Banner ── */}
        <div
          className={`relative h-104 max-lg:h-88 max-md:h-68 max-sm:h-52 rounded-md overflow-hidden border-2 bg-lol-blue-mid group transition-all duration-300 ${
            loading
              ? "border-lol-border/60"
              : "border-lol-border hover:border-lol-gold hover:shadow-[0_0_24px_rgba(200,170,110,0.3)] hover:-translate-y-1"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Banner image */}
          <img
            src={player.banner}
            alt={player.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              loading ? "brightness-75" : "brightness-100 group-hover:scale-110"
            }`}
          />

          {/* Top vignette */}
          <div className="absolute top-0 left-0 w-full h-10 bg-linear-to-b from-black/50 to-transparent" />
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

          {/* Skin name + info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-2 max-md:p-1.5 max-sm:p-1">
            {/* Skin name */}
            <div className="text-lol-gold-light text-xs max-md:text-[10px] max-sm:text-[8px] font-semibold leading-tight mb-1.5 text-center drop-shadow-lg">
              {player.skinName}
            </div>

            {/* Single row: rune (left) | icon + username (center) | summoner spells (right) */}
            <div className="flex items-center gap-1 max-sm:gap-0.5">
              {/* Rune keystone — left */}
              <div className="flex-1 flex justify-start">
                {player.rune && (
                  <img
                    src={player.rune}
                    alt=""
                    className="w-6 h-6 rounded-full border border-lol-gold/40 object-cover"
                  />
                )}
              </div>

              {/* Icon + username — center */}
              <div className="shrink-0 flex flex-col items-center gap-0.5">
                <img
                  src={player.summonerIcon || asset("/images/icons/default.jpg")}
                  alt=""
                  className="w-8 h-8 max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4 rounded-full border-2 border-lol-border/60 object-cover"
                />
                <div className="text-lol-grey text-[10px] max-md:text-[9px] max-sm:text-[7px] text-center truncate drop-shadow-lg">
                  {player.username}
                </div>
              </div>

              {/* Summoner spells — right */}
              <div className="flex-1 flex justify-end gap-0.5">
                {player.summonerSpells?.map((spell, i) => (
                  <img
                    key={i}
                    src={spell}
                    alt=""
                    className="w-5 h-5 rounded-sm border border-lol-border/60 object-cover"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-1 left-1 w-3 h-3 max-sm:w-1.5 max-sm:h-1.5 border-t border-l border-lol-gold/30" />
          <div className="absolute top-1 right-1 w-3 h-3 max-sm:w-1.5 max-sm:h-1.5 border-t border-r border-lol-gold/30" />
          <div className="absolute bottom-1 left-1 w-3 h-3 max-sm:w-1.5 max-sm:h-1.5 border-b border-l border-lol-gold/30" />
          <div className="absolute bottom-1 right-1 w-3 h-3 max-sm:w-1.5 max-sm:h-1.5 border-b border-r border-lol-gold/30" />

          {/* Click hint on hover (only when not loading) */}
          {!loading && !flipped && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-black/70 text-lol-gold text-[10px] max-sm:text-[8px] px-2 py-1 rounded font-medium backdrop-blur-sm">
                Click to read
              </span>
            </div>
          )}

          {/* Loading shimmer overlay */}
          {loading && (
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          )}
        </div>

        {/* ── Back: Birthday Message ── */}
        <div
          className="absolute inset-0 h-104 max-lg:h-88 max-md:h-68 max-sm:h-52 rounded-md overflow-hidden border-2 border-lol-gold bg-linear-to-b from-lol-nav-top to-lol-blue-mid flex flex-col shadow-[0_0_20px_rgba(200,170,110,0.2)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-2 max-sm:px-1.5 max-sm:py-1 border-b border-lol-border/60 bg-black/20">
            <img
              src={player.avatar}
              alt=""
              className="w-7 h-7 max-sm:w-4 max-sm:h-4 rounded-full border border-lol-gold/50"
            />
            <div className="min-w-0">
              <div className="text-lol-gold text-xs max-sm:text-[9px] font-bold truncate">
                {player.username}
              </div>
              <div className="text-lol-grey text-[9px] max-sm:text-[7px]">
                {player.name}
              </div>
            </div>
          </div>
          {/* Message body */}
          <div className="flex-1 px-3 py-2 max-sm:px-1.5 max-sm:py-1 overflow-auto">
            <p className="text-lol-gold-light text-[11px] max-md:text-[10px] max-sm:text-[8px] leading-relaxed whitespace-pre-line">
              {player.message}
            </p>
          </div>
          {/* Bottom glow bar */}
          <div className="h-0.5 w-full bg-lol-gold/60" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

import { forwardRef } from "react";

const MessageCard = ({ player }) => (
  <div className="bg-linear-to-br from-[rgba(30,35,40,0.9)] to-[rgba(20,25,30,0.95)] border border-lol-border rounded-md p-6 transition-all duration-300 hover:border-lol-gold hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
    <div className="flex items-center gap-3 mb-3.5">
      <img
        src={player.avatar}
        alt={player.name}
        className="w-10 h-10 rounded-full border-2 border-lol-gold-dark object-cover"
      />
      <div className="flex flex-col">
        <span className="text-base font-bold text-lol-gold">{player.username}</span>
        <span className="text-xs text-lol-grey">{player.name}</span>
      </div>
    </div>
    <div className="text-sm leading-7 text-lol-text whitespace-pre-line">
      {player.message}
    </div>
  </div>
);

const PhotoCard = ({ src }) => (
  <div className="border border-lol-border rounded-md overflow-hidden p-0 transition-all duration-300 hover:border-lol-gold hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
    <img src={src} alt="memory" className="w-full h-auto block rounded-md" />
  </div>
);

const MessagesSection = forwardRef(function MessagesSection(
  { players, photos, visible },
  ref
) {
  if (!visible) return null;

  // Interleave messages and photos
  const cards = [];
  let photoIdx = 0;
  players.forEach((player) => {
    cards.push({ type: "message", player });
    if (photoIdx < photos.length) {
      cards.push({ type: "photo", src: photos[photoIdx] });
      photoIdx++;
    }
  });

  return (
    <div ref={ref} className="max-w-275 mx-auto px-10 py-10">
      <h2 className="text-base font-bold tracking-wider uppercase text-lol-gold mb-6 pb-3 border-b border-lol-border">
        🎉 Birthday Messages for Linus 🎉
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
        {cards.map((card, i) =>
          card.type === "message" ? (
            <MessageCard key={card.player.id} player={card.player} />
          ) : (
            <PhotoCard key={`photo-${i}`} src={card.src} />
          )
        )}
      </div>
    </div>
  );
});

export default MessagesSection;

import { useState } from "react";

const SKIN_RARITIES = ["epic", "legendary", "mythic"];

export default function CollectionPage({ photos, players, onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Assign deterministic rarity to each photo
  const rarityOrder = ["legendary", "epic", "mythic", "epic", "legendary"];

  // Create collection items from photos
  const collectionItems = photos.map((photo, i) => ({
    id: i,
    src: photo,
    name: `Memory ${i + 1}`,
    rarity: rarityOrder[i % rarityOrder.length],
    chest: i % 2 === 0,
  }));

  // Create "champion" items from players
  const championItems = players.map((p, i) => ({
    id: `champ-${p.id}`,
    src: p.banner,
    name: p.skinName,
    rarity: SKIN_RARITIES[i % SKIN_RARITIES.length],
    chest: true,
    avatar: p.avatar,
  }));

  // Interleave collection and champion items
  const allItems = [];
  const maxLen = Math.max(collectionItems.length, championItems.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < collectionItems.length) allItems.push(collectionItems[i]);
    if (i < championItems.length) allItems.push(championItems[i]);
  }

  // Border color by rarity
  const rarityBorder = {
    epic: "border-[#4b69ff]",
    legendary: "border-[#e44c4c]",
    mythic: "border-lol-gold",
  };

  // Glow color by rarity
  const rarityGlow = {
    epic: "hover:shadow-[0_0_16px_rgba(75,105,255,0.4)]",
    legendary: "hover:shadow-[0_0_16px_rgba(228,76,76,0.4)]",
    mythic: "hover:shadow-[0_0_16px_rgba(200,170,110,0.4)]",
  };

  return (
    <div className="fixed inset-0 z-100 flex flex-col bg-lol-blue-dark">
      {/* Header bar */}
      <div className="border-b border-lol-border bg-linear-to-b from-lol-nav-top to-lol-nav-bottom">
        {/* Tabs */}
        <div className="flex items-center gap-0 px-6 h-10">
          {["CHAMPIONS", "SKINS", "EMOTES", "RUNES", "SPELLS", "ITEMS", "ICONS", "WARDS", "CHROMAS"].map(
            (tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase border-none bg-transparent cursor-pointer transition-colors ${
                  i === 0
                    ? "text-lol-gold border-b-2 border-lol-gold"
                    : "text-lol-grey/60 hover:text-lol-grey"
                }`}
              >
                {tab}
              </button>
            )
          )}
          {/* Close button */}
          <button
            onClick={onClose}
            className="ml-auto text-lol-grey hover:text-lol-gold text-lg cursor-pointer bg-transparent border-none px-2"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 max-lg:w-48 max-md:hidden border-r border-lol-border/40 bg-lol-blue-dark/80 p-5 flex flex-col gap-5">
          {/* Mastery score */}
          <div className="border border-lol-border/40 rounded-lg p-4 text-center bg-black/20">
            <div className="text-lol-gold text-4xl font-bold">575</div>
            <div className="text-lol-grey/60 text-[10px] tracking-widest uppercase mt-1 font-bold">
              Total Mastery Score
            </div>
            <div className="text-lol-gold text-2xl font-bold mt-2">0</div>
            <div className="text-lol-grey/60 text-[10px] tracking-widest uppercase mt-1 font-bold">
              Eternals Milestones
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lol-grey/40 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-black/30 border border-lol-border/40 rounded px-3 py-2 pl-8 text-sm text-lol-grey placeholder-lol-grey/30 outline-none focus:border-lol-gold/50"
            />
          </div>

          {/* Filters */}
          <label className="flex items-center gap-2 text-lol-grey/70 text-xs cursor-pointer">
            <input type="checkbox" className="accent-lol-gold" />
            Show Unowned
          </label>

          <div className="border border-lol-border/40 rounded px-3 py-2 text-lol-grey/70 text-xs bg-black/20 flex items-center justify-between">
            All Champions
            <span className="text-lol-grey/40">⌄</span>
          </div>

          <div className="border border-lol-border/40 rounded px-3 py-2 text-lol-grey/70 text-xs bg-black/20 flex items-center justify-between">
            Alphabetical ▲
            <span className="text-lol-grey/40">⌄</span>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto p-6 max-md:p-4">
          {/* Milestones bar */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-4">
              {/* Milestone emblem */}
              <div className="w-16 h-16 rounded-full border-2 border-lol-gold/50 bg-linear-to-b from-lol-gold/20 to-transparent flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <span className="text-lol-gold font-bold text-sm">0/12</span>
                <div className="text-lol-grey/50 text-[10px] tracking-wider uppercase">
                  Milestones
                </div>
              </div>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
            {allItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => setSelectedPhoto(item)}
              >
                {/* Card */}
                <div
                  className={`relative aspect-3/4 rounded-md overflow-hidden border ${
                    rarityBorder[item.rarity] || "border-lol-border/40"
                  } ${rarityGlow[item.rarity] || ""} transition-all duration-300 hover:-translate-y-1`}
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Skin rarity icon — bottom center */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
                    <img
                      src={`/images/icons/skins/${item.rarity}.jpg`}
                      alt={item.rarity}
                      className="w-7 h-7 max-sm:w-5 max-sm:h-5 object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Chest indicator — bottom right */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    <span className="text-lol-grey/60 text-xs">📦</span>
                    <span className="text-lol-grey/60 text-[10px] font-mono">
                      {item.chest ? "0" : "—"}
                    </span>
                  </div>
                </div>

                {/* Name below card */}
                <div className="text-lol-grey text-xs text-center mt-1.5 truncate group-hover:text-lol-gold-light transition-colors">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-200 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl max-h-[85vh] rounded-lg overflow-hidden border-2 border-lol-gold/50 shadow-[0_0_40px_rgba(200,170,110,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.name}
              className="w-full h-full object-contain"
            />
            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6">
              <div className="flex items-center gap-3">
                <img
                  src={`/images/icons/skins/${selectedPhoto.rarity}.jpg`}
                  alt={selectedPhoto.rarity}
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <div className="text-lol-gold-light text-lg font-bold">
                    {selectedPhoto.name}
                  </div>
                  <div className="text-lol-grey/70 text-xs mt-0.5 uppercase tracking-wider">
                    {selectedPhoto.rarity}
                  </div>
                </div>
              </div>
            </div>
            {/* Close */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-lol-border/40 text-lol-grey hover:text-lol-gold cursor-pointer flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

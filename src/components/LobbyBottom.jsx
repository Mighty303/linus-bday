export default function LobbyBottom() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-275 mx-auto mt-10">
      {/* Invites */}
      <div>
        <div className="text-xs font-bold tracking-wider uppercase text-lol-grey mb-2">
          INVITES (0)
        </div>
        <div className="text-sm text-lol-grey/50">No pending invites</div>
      </div>

      {/* Spectators */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-bold tracking-wider uppercase text-lol-grey mb-2">
            SPECTATORS
          </div>
          <div className="text-sm text-lol-grey/50">No spectators</div>
        </div>
        <button className="px-7 py-2 border-2 border-lol-grey bg-transparent text-lol-grey text-[11px] font-bold tracking-wider uppercase cursor-pointer transition-all hover:border-lol-gold hover:text-lol-gold">
          SPECTATE
        </button>
      </div>
    </div>
  );
}

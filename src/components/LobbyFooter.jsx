export default function LobbyFooter({ onStartGame, gameStarted }) {
  return (
    <div className="bg-linear-to-b from-[rgba(10,20,40,0.9)] to-lol-blue-dark border-t border-lol-border px-10 py-5 flex items-center justify-center gap-4 max-md:flex-col">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="px-12 py-3 border-2 border-lol-grey bg-transparent text-lol-grey text-sm font-bold tracking-wider uppercase cursor-pointer transition-all hover:border-lol-red hover:text-lol-red"
      >
        QUIT
      </button>

      <button
        onClick={onStartGame}
        className={`px-12 py-3 border-2 text-sm font-bold tracking-wider uppercase cursor-pointer transition-all duration-300
          ${
            gameStarted
              ? "border-lol-teal bg-lol-teal text-lol-blue-dark shadow-[0_0_20px_rgba(10,200,185,0.3)]"
              : "border-lol-teal bg-transparent text-lol-teal hover:bg-lol-teal hover:text-lol-blue-dark hover:shadow-[0_0_20px_rgba(10,200,185,0.3)]"
          }`}
      >
        {gameStarted ? "🎉 GAME ON! 🎉" : "START GAME"}
      </button>
    </div>
  );
}

import PlayerSlot from "./PlayerSlot";

const TEAM_SIZE = 5;

export default function TeamsContainer({ players }) {
  const team1 = players.filter((p) => p.team === 1);
  const team2 = players.filter((p) => p.team === 2);

  const padTeam = (team) => {
    const padded = [...team];
    while (padded.length < TEAM_SIZE) padded.push(null);
    return padded;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-275 mx-auto">
      {/* Team 1 */}
      <div>
        <div className="text-sm font-bold tracking-wider uppercase text-lol-grey mb-3 pb-2 border-b border-lol-gold/20">
          Team 1
        </div>
        {padTeam(team1).map((player, i) => (
          <PlayerSlot key={player?.id ?? `t1-empty-${i}`} player={player} />
        ))}
      </div>

      {/* Team 2 */}
      <div>
        <div className="text-sm font-bold tracking-wider uppercase text-lol-grey mb-3 pb-2 border-b border-lol-gold/20">
          Team 2
        </div>
        {padTeam(team2).map((player, i) => (
          <PlayerSlot
            key={player?.id ?? `t2-empty-${i}`}
            player={player}
            showJoin={!player}
          />
        ))}
      </div>
    </div>
  );
}

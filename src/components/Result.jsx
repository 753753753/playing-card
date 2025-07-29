const Result = ({ players, scores, onGoBack }) => {
  const totals = players.map((_, index) =>
    scores.reduce((sum, round) => sum + (round[index] || 0), 0)
  );

  const ranked = [...players].map((name, i) => ({
    name,
    total: totals[i],
  }));

  ranked.sort((a, b) => b.total - a.total);

  const lastPlayer = ranked[ranked.length - 1];

  const rankColors = [
    "bg-yellow-400 text-black",
    "bg-gray-400 text-black",
    "bg-orange-500 text-white",
  ];

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center bg-green-900 sm:bg-none px-4">

      {/* Background image for mobile only */}
      <div className="absolute inset-0 sm:hidden">
        <img
          src="/bg1.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 py-6 w-full max-w-md">

        <div className="flex justify-start mb-4">
          <button
            onClick={onGoBack}
            className="bg-white/10 backdrop-blur-md text-green-900 px-4 py-2 rounded-full font-bold hover:bg-yellow-400"
          >
            ⬅️ Go Back
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-cyan-900 sm:text-yellow-300 drop-shadow-lg text-center">
          🏆 Final Results
        </h2>

        <div className="space-y-4">
          {ranked.map((player, index) => (
            <div
              key={index}
              className={`
              flex justify-between items-center px-5 py-3 rounded-lg transform transition hover:scale-105
              border 
              ${rankColors[index] || "bg-green-800 sm:bg-green-800 sm:border-green-700 bg-white/10 border-green-500/40 backdrop-blur-sm"
                }
              shadow-xl
            `}
            >
              <span className="font-semibold text-lg text-yellow-100 sm:text-white">
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                {index === 3 && "☕ "}
                {index + 1}ᵗʰ — {player.name}
              </span>
              <span className="font-bold text-xl text-white">{player.total} pts</span>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-green-800 sm:bg-green-800 sm:border-yellow-400 border border-yellow-400 px-6 py-4 rounded-xl shadow-lg text-center animate-bounce sm:animate-none backdrop-blur-sm sm:backdrop-blur-none">
          <p className="text-lg font-semibold text-yellow-300">
            🤭 {lastPlayer.name} sabko <span className="text-white font-bold">chai ☕</span> pilayega!
          </p>
          <p className="text-sm text-gray-300 mt-1">Next time better luck 😜</p>
        </div>
      </div>
    </div>
  );

};

export default Result;

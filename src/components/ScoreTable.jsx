const ScoreTable = ({ players, scores }) => {
  // Calculate cumulative scores up to the current round
  const cumulativeTotals = players.map((_, i) =>
    scores.reduce((sum, round) => sum + (round[i] || 0), 0)
  );

  // Sort players by total score for header
  const sortedHeader = [...players]
    .map((name, i) => ({ name, total: cumulativeTotals[i] }))
    .sort((a, b) => b.total - a.total)
    .map((item) => item.name);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-green-700 mt-4">
      <table className="w-full text-sm text-center bg-green-800 text-white table-auto">
        <thead className="bg-green-900 text-yellow-400">
          <tr>
            <th className="border border-green-700 px-3 py-2">Round</th>
            {sortedHeader.map((name, index) => (
              <th key={index} className="border border-green-700 px-3 py-2">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scores.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-green-700" : "bg-green-800"}
            >
              <td className="border border-green-700 px-3 py-2 font-medium">
                {i + 1}
              </td>
              {sortedHeader.map((name, j) => {
                const originalIndex = players.indexOf(name);
                const score = row[originalIndex];
                return (
                  <td key={j} className="border border-green-700 px-3 py-2">
                    {score < 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[24px] min-h-[24px] px-2 rounded-full border border-red-500 bg-red-600 text-white font-bold text-xs">
                        {score}
                      </span>
                    ) : (
                      score
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;

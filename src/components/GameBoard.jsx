import { useState, useEffect } from "react";
import ScoreTable from "./ScoreTable";
import Result from "./Result";

const GameBoard = ({ players }) => {
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState([]);
  const [hands, setHands] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("callbreak_game");
    if (saved) {
      const data = JSON.parse(saved);
      setRound(data.round);
      setScores(data.scores);
      setHands(data.hands);
      setIsSubmitted(data.isSubmitted);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "callbreak_game",
      JSON.stringify({ round, scores, hands, isSubmitted })
    );
  }, [round, scores, hands, isSubmitted]);

  const handleInputChange = (index, value) => {
    const updated = [...hands];
    updated[index] = value === "" ? "" : parseInt(value);
    setHands(updated);
  };

  const handleNext = () => {
    const convertedHands = hands.map((val) => (val === "" ? 0 : val));
    setScores([...scores, convertedHands]);
    setHands(["", "", "", ""]);
    setRound((prev) => prev + 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleDeleteLastRound = () => {
    if (scores.length > 0) {
      const updatedScores = scores.slice(0, -1);
      setScores(updatedScores);
      setRound((prev) => prev - 1);
    }
  };

  const handleGoBack = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Result
        players={players}
        scores={[...scores, hands.map((val) => (val === "" ? 0 : val))]}
        onGoBack={handleGoBack}
      />
    );
  }

  return (
    <div className="relative min-h-screen font-sans">
      {/* 🌌 Background for Mobile */}
      <div className="sm:hidden absolute inset-0 z-0">
        <img
          src="/bg1.jpg"
          alt="Mobile Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* 💻 Background for Desktop/Laptop */}
      <div className="hidden sm:block absolute inset-0 z-0">
        <img
          src="/bg2.jpg"
          alt="Desktop Background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      

      {/* 🎮 Game Content */}
      <div className="relative z-10 p-3 sm:p-6 min-h-screen text-white bg-transparent bg-opacity-70">
        <h2 className="text-xl sm:text-3xl font-bold text-cyan-900 text-center mb-4 sm:mb-8 drop-shadow">
          🃏 Round {round}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 bg-opacity-60 z-0">
          {players.map((player, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md text-black rounded-lg p-2 sm:p-4 shadow-lg border border-white/20"
            >
              <label className="block text-center text-sm sm:text-base font-semibold mb-1">
                {player}
              </label>
              <input
                type="number"
                min="0"
                max="13"
                value={hands[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-full px-2 py-1 sm:px-4 sm:py-2 border rounded-md text-center font-bold text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-4 sm:mb-8">
          <button
            onClick={handleNext}
            className="w-full sm:w-auto text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-md"
          >
            ➕ Next Round
          </button>
          <button
            onClick={handleDeleteLastRound}
            className="w-full sm:w-auto text-sm sm:text-base bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-md"
          >
            🔙 Undo Last Round
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto text-sm sm:text-base bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-md"
          >
            ✅ Submit Game
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 shadow-xl overflow-x-auto">
          <ScoreTable players={players} scores={scores} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;

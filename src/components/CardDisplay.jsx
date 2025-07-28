const suits = ['♣', '♠', '♥', '♦']; // Use non-emoji for styling
const values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

const getSuitColor = (suit) => {
  return suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black';
};

export default function CardDisplay() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {suits.map((suit) =>
        values.map((value, index) => (
          <div
            key={`${value}-${suit}`}
            className="w-20 h-32 bg-white rounded-lg shadow-md border border-gray-400 relative"
            style={{ gridRowStart: index + 1 }}
          >
            {/* Top-left corner */}
            <div className={`absolute top-1 left-1 text-sm font-bold ${getSuitColor(suit)}`}>
              {value}
              <br />
              {suit}
            </div>

            {/* Bottom-right corner (rotated) */}
            <div
              className={`absolute bottom-1 right-1 text-sm font-bold ${getSuitColor(suit)} rotate-180 text-right`}
            >
              {value}
              <br />
              {suit}
            </div>

            {/* Center suit symbol (optional) */}
            <div className={`absolute inset-0 flex items-center justify-center text-2xl ${getSuitColor(suit)}`}>
              {suit}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

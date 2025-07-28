import CardDisplay from "./CardDisplay";

const InfoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div
        className="bg-white text-black w-full sm:w-11/12 sm:max-w-sm p-4 rounded-none sm:rounded-lg shadow-lg relative max-h-screen overflow-y-auto pt-10"
      >
        {/* ❌ Close Button */}
        <button
          className="absolute top-9 right-2 text-gray-700 hover:text-black text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        {/* 🃏 Card Viewer */}
        <h3 className="font-semibold mb-4 text-center ">🃏 All 52 Cards</h3>
        <CardDisplay />

        {/* ✅ Close Button at Bottom */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;

import { branches } from "../data/menu";

export default function BranchSelector({ selectedBranch, onSelect }) {
  const icons = { "Satellite Town": "🛰️", "Nowshera Road": "🛣️", "Model Town": "🏘️" };

  return (
    <section className="bg-black border-b border-red-900 py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-red-500 text-xs font-bold tracking-widest uppercase mb-2">Step 1</p>
        <h2 className="text-white text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: "'Georgia', serif" }}>
          Choose Your Branch
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {branches.map((branch) => (
            <button
              key={branch}
              onClick={() => onSelect(branch)}
              className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 font-bold text-sm transition-all duration-200 transform hover:scale-105
                ${selectedBranch === branch
                  ? "bg-red-700 border-red-500 text-white shadow-lg shadow-red-900"
                  : "bg-gray-900 border-gray-700 text-gray-300 hover:border-red-700 hover:text-white"
                }`}
            >
              <span className="text-xl">{icons[branch]}</span>
              <span>{branch}</span>
              {selectedBranch === branch && <span className="ml-1">✓</span>}
            </button>
          ))}
        </div>
        {!selectedBranch && (
          <p className="text-gray-600 text-xs mt-4">Please select a branch to place your order</p>
        )}
      </div>
    </section>
  );
}

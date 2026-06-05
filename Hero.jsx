export default function Hero({ onOrderNow }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(153,27,27,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(153,27,27,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-red-900 opacity-20 blur-3xl" />
      </div>

      {/* Offer Banner */}
      <div className="relative z-10 mb-8 flex items-center gap-2 bg-red-800 bg-opacity-90 border border-red-600 text-white text-sm font-bold px-5 py-2 rounded-full tracking-widest uppercase animate-pulse">
        <span>🔥</span>
        <span>Buy 1 Get 1 Free Every Tuesday</span>
        <span>🔥</span>
      </div>

      {/* Logo / Brand */}
      <div className="relative z-10 text-center px-4">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-5xl">🍕</span>
          <span
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-2px" }}
          >
            Mr <span className="text-red-600">Pizza</span>
          </span>
        </div>

        <h1
          className="text-3xl md:text-6xl font-black text-white mb-4 leading-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Fresh Hot Pizza
          <br />
          <span className="text-red-500">Delivered Fast</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md mx-auto">
          Delicious pizzas made fresh every day.
          <br />
          <span className="text-gray-500 text-sm">Satellite Town · Nowshera Road · Model Town</span>
        </p>

        <button
          onClick={onOrderNow}
          className="group relative inline-flex items-center gap-3 bg-red-700 hover:bg-red-600 text-white font-black text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-800"
        >
          <span>Order Now</span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 flex flex-col items-center gap-1 text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

import { menuCategories } from "../data/menu";

function MenuItem({ item, onAdd, inCart, qty }) {
  return (
    <div className="group relative bg-gray-900 border border-gray-800 hover:border-red-800 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-red-950 hover:-translate-y-1">
      {/* Pizza emoji art */}
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 text-center">🍕</div>

      <h3 className="text-white font-black text-base mb-1" style={{ fontFamily: "'Georgia', serif" }}>
        {item.name}
      </h3>
      <p className="text-gray-500 text-xs mb-4 leading-relaxed">{item.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-red-500 font-black text-lg">
          PKR {item.price.toLocaleString()}
        </span>

        {inCart && qty > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">{qty} in cart</span>
            <button
              onClick={() => onAdd(item)}
              className="bg-red-700 hover:bg-red-600 text-white w-8 h-8 rounded-full font-black text-lg transition-colors duration-200 flex items-center justify-center"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(item)}
            className="bg-red-700 hover:bg-red-600 text-white text-xs font-black px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default function MenuSection({ cart, onAdd }) {
  const cartMap = {};
  cart.forEach((item) => { cartMap[item.id] = item.qty; });

  return (
    <section id="menu" className="bg-black py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-red-500 text-xs font-bold tracking-widest uppercase text-center mb-2">Step 2</p>
        <h2
          className="text-white text-3xl md:text-4xl font-black text-center mb-12"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Our Menu
        </h2>

        {menuCategories.map((cat) => (
          <div key={cat.id} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{cat.icon}</span>
              <h3
                className="text-white text-xl font-black border-b-2 border-red-700 pb-1"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {cat.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.items.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAdd={onAdd}
                  inCart={!!cartMap[item.id]}
                  qty={cartMap[item.id] || 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

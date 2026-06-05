const reviews = [
  { name: "Ahmed K.", branch: "Satellite Town", text: "Best pizza in town! The Crown Crust Special is absolutely mind-blowing. Fresh, hot, and delivered on time.", stars: 5 },
  { name: "Sara M.", branch: "Model Town", text: "Ordered the Chicken Tikka pizza and it was amazing. Authentic flavors and generous toppings. Will order again!", stars: 5 },
  { name: "Bilal R.", branch: "Nowshera Road", text: "Deal 1 is insane value. Two pizzas and a drink for just PKR 1499? Unbeatable. Fast delivery too!", stars: 5 },
  { name: "Zara H.", branch: "Satellite Town", text: "Mr Pizza Special lives up to its name. Secret sauce is the real deal. My whole family loves it.", stars: 5 },
  { name: "Omar F.", branch: "Model Town", text: "Crown Crust with extra cheese is heavenly. The crust alone is worth coming back for!", stars: 5 },
  { name: "Fatima A.", branch: "Nowshera Road", text: "Great service, great pizza. The Beef Supreme is loaded with toppings. Highly recommended!", stars: 5 },
];

const whyUs = [
  { icon: "🍅", title: "Fresh Ingredients", desc: "We source only the freshest toppings and premium quality cheese daily." },
  { icon: "⚡", title: "Fast Delivery", desc: "Hot pizza at your door within 30–45 minutes, guaranteed." },
  { icon: "👨‍🍳", title: "Expert Chefs", desc: "Years of experience crafting the perfect pizza every single time." },
  { icon: "💰", title: "Best Value", desc: "Unbeatable deals and generous portions at the most affordable prices." },
];

export default function Reviews() {
  return (
    <>
      {/* Why Choose Us */}
      <section className="bg-red-900 bg-opacity-10 border-t border-b border-red-900 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl font-black text-center mb-12" style={{ fontFamily: "'Georgia', serif" }}>
            Why Choose <span className="text-red-500">Mr Pizza?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="text-center group">
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{w.icon}</div>
                <h3 className="text-white font-black mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl font-black text-center mb-2" style={{ fontFamily: "'Georgia', serif" }}>
            Customer Reviews
          </h2>
          <p className="text-gray-600 text-sm text-center mb-12">What our customers are saying</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 hover:border-red-900 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
                <div className="flex text-yellow-500 text-sm mb-3">
                  {"★".repeat(r.stars)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div>
                  <p className="text-white font-black text-sm">{r.name}</p>
                  <p className="text-red-600 text-xs">{r.branch}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

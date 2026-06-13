import { useState } from "react";
import { placeOrder } from "../firebase";

export default function CustomerForm({ cart, total, selectedBranch }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!selectedBranch) e.branch = "Please select a branch above.";
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (cart.length === 0) e.cart = "Your cart is empty.";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setSubmitting(true);

    const orderItems = cart.map((i) => ({
      name: i.name,
      qty: i.qty,
      price: i.price,
      subtotal: i.price * i.qty,
    }));

    try {
      await placeOrder({
        customerName: form.name,
        phone: form.phone,
        address: form.address,
        branch: selectedBranch,
        notes: form.notes,
        items: orderItems,
        total,
      });

      setSuccess(true);
    } catch (err) {
      console.error("Failed to save order:", err);
    }

    setSubmitting(false);
  };

  const inputClass = (field) =>
    `w-full bg-gray-900 border ${errors[field] ? "border-red-500" : "border-gray-700"} text-white placeholder-gray-600 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-red-600 transition-colors duration-200`;

  if (success) {
    return (
      <section id="checkout" className="bg-black py-16 px-4 border-t border-gray-900">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-white text-2xl font-black mb-2" style={{ fontFamily: "'Georgia', serif" }}>
            Order Placed!
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Your order has been received. We'll contact you shortly to confirm delivery.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-700 hover:bg-red-600 text-white font-black px-8 py-3 rounded-full transition-all duration-200 hover:scale-105"
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="bg-black py-16 px-4 border-t border-gray-900">
      <div className="max-w-lg mx-auto">
        <p className="text-red-500 text-xs font-bold tracking-widest uppercase text-center mb-2">Step 3</p>
        <h2
          className="text-white text-3xl md:text-4xl font-black text-center mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Complete Your Order
        </h2>
        <p className="text-gray-500 text-sm text-center mb-10">
          Fill in your details to place your order
        </p>

        {cart.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-8">
            <h3 className="text-white font-black text-sm mb-3 tracking-wide uppercase">Order Summary</h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.name} ×{item.qty}</span>
                  <span className="text-white font-bold">PKR {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between">
              <span className="text-white font-black">Total</span>
              <span className="text-red-500 font-black">PKR {total.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {errors.branch && <p className="text-red-500 text-xs bg-red-950 border border-red-800 px-4 py-2 rounded-lg">{errors.branch}</p>}
          {errors.cart && <p className="text-red-500 text-xs bg-red-950 border border-red-800 px-4 py-2 rounded-lg">{errors.cart}</p>}

          <div>
            <label className="text-gray-400 text-xs font-bold uppercase tracking-wide block mb-1">Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" className={inputClass("name")} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-xs font-bold uppercase tracking-wide block mb-1">Phone Number *</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="03XX-XXXXXXX" className={inputClass("phone")} />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-xs font-bold uppercase tracking-wide block mb-1">Delivery Address *</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, Area, City"
              rows={3}
              className={`${inputClass("address")} resize-none`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-xs font-bold uppercase tracking-wide block mb-1">Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Special instructions, spice level, etc."
              rows={2}
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-red-600 transition-colors duration-200 resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full mt-4 bg-red-700 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-red-900 flex items-center justify-center gap-3"
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </section>
  );
}
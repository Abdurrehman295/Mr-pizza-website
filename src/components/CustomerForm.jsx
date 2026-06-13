import { useState } from "react";
import { WHATSAPP_NUMBER } from "../data/menu";
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

    const itemLines = cart.map((i) => `• ${i.name} x${i.qty} = PKR ${(i.price * i.qty).toLocaleString()}`).join("\n");

    const message = `🍕 *Mr Pizza Order*

👤 *Customer Name:* ${form.name}
📞 *Phone:* ${form.phone}
📍 *Address:* ${form.address}
🏪 *Branch:* ${selectedBranch}

📋 *Order Items:*
${itemLines}

💰 *Total: PKR ${total.toLocaleString()}*

${form.notes ? `📝 Notes: ${form.notes}` : ""}`.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

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
          Fill in your details and we'll send your order via WhatsApp
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
            className="w-full mt-4 bg-green-700 hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-green-900 flex items-center justify-center gap-3"
          >
            {submitting ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>Place Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
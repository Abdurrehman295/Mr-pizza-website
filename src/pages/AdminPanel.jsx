import { useState, useEffect } from "react";
import { subscribeToOrders, updateOrderStatus } from "../firebase";

const ADMIN_PASSWORD = "mrpizza2026"; // Change this to your preferred password

function formatTime(timestamp) {
  if (!timestamp) return "Just now";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderCard({ order, onComplete, onReopen }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-red-800 transition-colors duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-black text-lg">{order.customerName}</h3>
          <p className="text-gray-500 text-xs">{formatTime(order.createdAt)}</p>
        </div>
        <span className="bg-red-900 bg-opacity-50 border border-red-800 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
          {order.branch}
        </span>
      </div>

      <div className="space-y-1 mb-3 text-sm">
        <p className="text-gray-300">
          <span className="text-gray-500">📞 Phone:</span>{" "}
          <a href={`tel:${order.phone}`} className="text-green-400 font-bold hover:underline">
            {order.phone}
          </a>
        </p>
        <p className="text-gray-300">
          <span className="text-gray-500">📍 Address:</span> {order.address}
        </p>
        {order.notes && (
          <p className="text-gray-300">
            <span className="text-gray-500">📝 Notes:</span> {order.notes}
          </p>
        )}
      </div>

      <div className="bg-black bg-opacity-50 rounded-xl p-3 mb-3">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-2">Order Items</p>
        <div className="space-y-1">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-300">{item.name} x{item.qty}</span>
              <span className="text-white font-bold">PKR {item.subtotal?.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-2 pt-2 flex justify-between">
          <span className="text-white font-black text-sm">Total</span>
          <span className="text-red-500 font-black text-sm">PKR {order.total?.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href={`tel:${order.phone}`}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold text-sm py-2.5 rounded-full text-center transition-colors duration-200"
        >
          📞 Call
        </a>
        {order.status === "pending" ? (
          <button
            onClick={() => onComplete(order.id)}
            className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold text-sm py-2.5 rounded-full transition-all duration-200 hover:scale-105"
          >
            ✓ Mark Completed
          </button>
        ) : (
          <button
            onClick={() => onReopen(order.id)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm py-2.5 rounded-full transition-all duration-200"
          >
            ↺ Reopen
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("mrpizza_admin") === "true"
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [branchFilter, setBranchFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authenticated) return;
    const unsubscribe = subscribeToOrders((data) => {
      setOrders(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("mrpizza_admin", "true");
      setAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("mrpizza_admin");
    setAuthenticated(false);
  };

  const handleComplete = (id) => updateOrderStatus(id, "completed");
  const handleReopen = (id) => updateOrderStatus(id, "pending");

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-2">🍕</div>
            <h1 className="text-white text-2xl font-black" style={{ fontFamily: "'Georgia', serif" }}>
              Mr Pizza <span className="text-red-600">Admin</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Staff login required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setLoginError(""); }}
              placeholder="Enter admin password"
              autoFocus
              className={`w-full bg-gray-900 border ${loginError ? "border-red-500" : "border-gray-700"} text-white placeholder-gray-600 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-red-600 transition-colors duration-200`}
            />
            {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-600 text-white font-black py-3 rounded-full transition-all duration-200 hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter((o) => {
    const statusMatch = o.status === activeTab;
    const branchMatch = branchFilter === "all" || o.branch === branchFilter;
    return statusMatch && branchMatch;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  return (
    <div className="min-h-screen bg-black">
      <div className="sticky top-0 z-10 bg-black bg-opacity-95 backdrop-blur-sm border-b border-gray-900 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-white font-black text-lg" style={{ fontFamily: "'Georgia', serif" }}>
            🍕 Mr Pizza <span className="text-red-600">Admin</span>
          </h1>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-white text-sm font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all duration-200 ${
              activeTab === "pending"
                ? "bg-red-700 text-white"
                : "bg-gray-900 text-gray-400 hover:text-white"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all duration-200 ${
              activeTab === "completed"
                ? "bg-green-700 text-white"
                : "bg-gray-900 text-gray-400 hover:text-white"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {["all", "Satellite Town", "Nowshera Road", "Model Town"].map((b) => (
            <button
              key={b}
              onClick={() => setBranchFilter(b)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                branchFilter === b
                  ? "bg-white text-black"
                  : "bg-gray-900 text-gray-400 border border-gray-800 hover:text-white"
              }`}
            >
              {b === "all" ? "All Branches" : b}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">📋</div>
            <p className="text-gray-500 font-bold">
              No {activeTab} orders{branchFilter !== "all" ? ` for ${branchFilter}` : ""}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onComplete={handleComplete}
                onReopen={handleReopen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
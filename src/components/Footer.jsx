import { WHATSAPP_NUMBER } from "../data/menu";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
            <span className="text-2xl">🍕</span>
            <span className="text-white font-black text-xl" style={{ fontFamily: "'Georgia', serif" }}>
              Mr <span className="text-red-600">Pizza</span>
            </span>
          </div>
          <p className="text-gray-600 text-xs">Fresh Hot Pizza Delivered Fast</p>
        </div>

        <div className="flex flex-col items-center gap-1 text-xs text-gray-600">
          <span>Satellite Town · Nowshera Road · Model Town</span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-500 transition-colors font-bold"
          >
            +92 327 534 3399
          </a>
        </div>

        <p className="text-gray-700 text-xs text-center md:text-right">
          © {new Date().getFullYear()} Mr Pizza. All rights reserved.
          <br />
          <span className="text-gray-800">Rawalpindi, Pakistan</span>
        </p>
      </div>
    </footer>
  );
}

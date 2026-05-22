import { useNavigate, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const location = useLocation()
  const stored = (() => {
    try {
      const raw = sessionStorage.getItem('n1che_order')
      if (raw) { sessionStorage.removeItem('n1che_order'); return JSON.parse(raw) }
    } catch {}
    return {}
  })()
  const { email, orderNumber, cart = [], total = 0 } = location.state || stored

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header — logo only */}
      <header className="border-b border-black/[0.08] flex-shrink-0">
        <div className="max-w-[1400px] mx-auto px-5 py-4 flex justify-center">
          <Logo />
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full px-5 py-16">
        {/* Checkmark */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M5 13l5.5 5.5L21 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-[22px] font-bold tracking-widest uppercase">ORDER CONFIRMED</h1>
          {orderNumber && (
            <p className="text-[11px] tracking-widest uppercase text-black/40 mt-2">
              ORDER #{orderNumber}
            </p>
          )}
          {email && (
            <p className="text-[12px] text-black/40 mt-3">
              A confirmation email has been sent to {email}
            </p>
          )}
        </div>

        {/* Order summary */}
        {cart.length > 0 && (
          <div className="border-t border-black/[0.08] pt-6 mb-10">
            <h2 className="text-[10px] tracking-widest uppercase text-black/40 mb-5">ORDER SUMMARY</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-start gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-12 h-14 bg-[#f0f0f0] flex-shrink-0 overflow-hidden">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest font-medium leading-snug">{item.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-black/40 mt-0.5">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] tracking-widest flex-shrink-0">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {total > 0 && (
              <div className="flex justify-between items-center border-t border-black/[0.08] pt-4 mt-5">
                <span className="text-[11px] tracking-widest uppercase font-medium">TOTAL</span>
                <span className="text-[11px] tracking-widest font-medium">€{total.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 bg-black text-white text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors duration-150"
        >
          CONTINUE SHOPPING
        </button>
      </main>
    </div>
  )
}

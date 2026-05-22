import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Checkout({ cart, onClearCart }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [postcode, setPostcode] = useState('')
  const [city, setCity] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('ideal')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.95
  const total = subtotal + shipping

  const inputClass =
    'w-full border border-black/20 px-4 py-3 text-[12px] tracking-wide focus:border-black focus:outline-none placeholder:text-black/30 transition-colors duration-150'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const orderNumber = Math.floor(100000 + Math.random() * 900000).toString()

    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total.toFixed(2),
          description: `N1CHE Order #${orderNumber}`,
          redirectUrl: `${window.location.origin}/confirmation`,
          webhookUrl: `${window.location.origin}/api/webhooks/mollie`,
          metadata: { orderNumber, email },
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Payment could not be started.')
      }

      const { checkoutUrl } = await res.json()
      sessionStorage.setItem('n1che_order', JSON.stringify({ email, orderNumber, cart, total }))
      onClearCart()
      window.location.href = checkoutUrl
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header — logo only */}
      <header className="border-b border-black/[0.08] flex-shrink-0">
        <div className="max-w-[1400px] mx-auto px-5 py-4 flex justify-center">
          <Logo />
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-5 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16">
          {/* Left: form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact */}
            <section>
              <h2 className="text-[11px] tracking-widest uppercase font-medium mb-4">CONTACT</h2>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputClass}
              />
            </section>

            {/* Delivery */}
            <section>
              <h2 className="text-[11px] tracking-widest uppercase font-medium mb-4">DELIVERY</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Postcode"
                    value={postcode}
                    onChange={e => setPostcode(e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-[11px] tracking-widest uppercase font-medium mb-4">PAYMENT</h2>
              <div className="grid grid-cols-2 gap-3">
                {[['ideal', 'IDEAL'], ['card', 'CARD']].map(([method, label]) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-3.5 border text-[11px] tracking-widest uppercase transition-colors duration-150 ${
                      paymentMethod === method
                        ? 'bg-black text-white border-black'
                        : 'border-black/20 text-black hover:border-black'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>

            {error && (
              <p className="text-[11px] tracking-widest text-red-600 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'REDIRECTING...' : `PAY NOW — €${total.toFixed(2)}`}
            </button>
          </form>

          {/* Right: order summary */}
          <div className="lg:border-l lg:border-black/[0.08] lg:pl-12 pt-0 lg:pt-0">
            <h2 className="text-[11px] tracking-widest uppercase font-medium mb-6">ORDER SUMMARY</h2>

            <div className="space-y-4">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 items-start">
                  <div className="relative flex-shrink-0 w-14 h-16 bg-[#f0f0f0] overflow-hidden">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    )}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white text-[9px] flex items-center justify-center rounded-full font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-widest font-medium leading-snug">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mt-0.5">{item.size}</p>
                  </div>
                  <p className="text-[11px] tracking-widest flex-shrink-0">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-black/[0.08] space-y-3">
              <div className="flex justify-between text-[11px] tracking-widest">
                <span className="uppercase text-black/50">SUBTOTAL</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] tracking-widest">
                <span className="uppercase text-black/50">SHIPPING</span>
                <span>€{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] tracking-widest font-medium border-t border-black/[0.08] pt-3">
                <span className="uppercase">TOTAL</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

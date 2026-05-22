import { Link, useNavigate } from 'react-router-dom'

export default function Cart({ cart, onUpdateQuantity }) {
  const navigate = useNavigate()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="max-w-2xl mx-auto px-5 py-10">
      <h1 className="text-[11px] tracking-widest uppercase font-medium mb-10">YOUR CART</h1>

      {cart.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[11px] tracking-widest uppercase text-black/30">YOUR CART IS EMPTY</p>
          <Link
            to="/"
            className="inline-block mt-8 text-[11px] tracking-widest uppercase underline underline-offset-2 hover:opacity-40 transition-opacity duration-150"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="divide-y divide-black/[0.08]">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 py-5">
                {/* Thumbnail */}
                <Link to={`/product/${item.id}`} className="flex-shrink-0 w-20 h-24 bg-[#f0f0f0] overflow-hidden block">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#e4e4e4]" />
                  )}
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] tracking-widest uppercase font-medium leading-snug">{item.name}</p>
                  <p className="text-[10px] tracking-widest uppercase text-black/40 mt-1">SIZE: {item.size}</p>
                  <p className="text-[11px] tracking-widest mt-1">€{item.price.toFixed(2)}</p>
                </div>

                {/* Quantity + line total */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <div className="flex items-center border border-black/20">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.size, -1)}
                      className="w-8 h-8 flex items-center justify-center text-[14px] hover:bg-black/5 transition-colors duration-150"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-[11px] tracking-widest w-6 text-center select-none">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.size, 1)}
                      className="w-8 h-8 flex items-center justify-center text-[14px] hover:bg-black/5 transition-colors duration-150"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[11px] tracking-widest">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="border-t border-black/[0.08] pt-5 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] tracking-widest uppercase">SUBTOTAL</span>
              <span className="text-[11px] tracking-widest">€{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[10px] tracking-widest text-black/30 mt-1 uppercase">
              SHIPPING CALCULATED AT CHECKOUT
            </p>
          </div>

          {/* Checkout button */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full mt-6 py-4 bg-black text-white text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors duration-150"
          >
            CHECKOUT
          </button>

          <div className="text-center mt-5">
            <Link
              to="/"
              className="text-[10px] tracking-widest uppercase text-black/40 underline underline-offset-2 hover:text-black transition-colors duration-150"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </>
      )}
    </main>
  )
}

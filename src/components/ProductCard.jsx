import { useState } from 'react'
import { Link } from 'react-router-dom'

const CARD_SIZES = ["XS", "S", "M", "L", "XL"]

export default function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [shaking, setShaking] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedSize) {
      setShaking(true)
      setTimeout(() => setShaking(false), 420)
      return
    }
    onAddToCart(product, selectedSize)
    setJustAdded(true)
    setSelectedSize(null)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const toggleSize = (e, size) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedSize(prev => (prev === size ? null : size))
  }

  return (
    <div className="flex flex-col">
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden bg-[#f4f4f4]"
        style={{ aspectRatio: '3/4' }}
        onMouseEnter={() => setShowBack(true)}
        onMouseLeave={() => setShowBack(false)}
      >
        {product.image ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                showBack && product.backImage ? 'opacity-0' : 'opacity-100'
              } ${product.soldOut ? 'opacity-40' : ''}`}
            />
            {product.backImage && (
              <img
                src={product.backImage}
                alt={`${product.name} — back`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  showBack ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-[#ebebeb] flex items-center justify-center">
            <span className="text-[9px] tracking-widest text-black/25 uppercase">COMING SOON</span>
          </div>
        )}

        {/* Sold out overlay */}
        {product.soldOut && (
          <div className="absolute top-3 left-3">
            <span className="text-[9px] tracking-widest uppercase bg-black text-white px-2 py-1">SOLD OUT</span>
          </div>
        )}

        {/* New badge for first 3 products */}
        {!product.soldOut && product.id <= 3 && (
          <div className="absolute top-3 left-3">
            <span className="text-[9px] tracking-widest uppercase bg-black text-white px-2 py-1">NEW</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="px-2 pt-3 pb-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-[11px] uppercase tracking-wider font-medium leading-snug">{product.name}</p>
          <p className="text-[11px] text-black/50 tracking-wide shrink-0">€{product.price.toFixed(2)}</p>
        </div>

        {product.soldOut ? (
          <button
            disabled
            className="w-full mt-3 py-2.5 bg-black/10 text-black/30 text-[10px] tracking-widest uppercase cursor-not-allowed"
          >
            SOLD OUT
          </button>
        ) : (
          <>
            {/* Size selector */}
            <div className={`flex gap-1 mt-3 flex-wrap ${shaking ? 'animate-shake' : ''}`}>
              {CARD_SIZES.map(size => (
                <button
                  key={size}
                  onClick={(e) => toggleSize(e, size)}
                  className={`text-[9px] px-2 py-1 border tracking-wider transition-colors duration-150 ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-black/15 text-black/70 hover:border-black hover:text-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full mt-2 py-2.5 text-[10px] tracking-widest uppercase transition-all duration-200 ${
                justAdded
                  ? 'bg-black/60 text-white cursor-default'
                  : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              {justAdded ? 'ADDED ✓' : 'ADD TO CART'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

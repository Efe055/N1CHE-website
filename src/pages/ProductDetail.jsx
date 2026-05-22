import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'

const DETAIL_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = PRODUCTS.find(p => p.id === parseInt(id))

  const [selectedSize, setSelectedSize] = useState(null)
  const [shaking, setShaking] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) {
    return (
      <main className="flex items-center justify-center py-32">
        <div className="text-center">
          <p className="text-[11px] tracking-widest uppercase text-black/40 mb-6">PRODUCT NOT FOUND</p>
          <Link to="/" className="text-[11px] tracking-widest uppercase underline">BACK TO SHOP</Link>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    if (product.soldOut) return
    if (!selectedSize) {
      setShaking(true)
      setTimeout(() => setShaking(false), 420)
      return
    }
    onAddToCart(product, selectedSize)
    setJustAdded(true)
    setSelectedSize(null)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <main className="max-w-[1400px] mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-black/40 mb-8">
        <Link to="/" className="hover:text-black transition-colors duration-150">HOME</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-black transition-colors duration-150">{product.category}</Link>
        <span>/</span>
        <span className="text-black truncate max-w-[180px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16 xl:gap-24">
        {/* Image */}
        <div
          className="relative bg-[#f0f0f0] overflow-hidden cursor-crosshair select-none"
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
                } ${product.soldOut ? 'opacity-50' : ''}`}
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
            <div className="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center">
              <span className="text-[10px] tracking-widest text-black/30 uppercase">COMING SOON</span>
            </div>
          )}

          {product.backImage && (
            <span className="absolute bottom-3 right-3 text-[9px] tracking-widest uppercase text-black/30 pointer-events-none">
              HOVER TO FLIP
            </span>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col pt-0 md:pt-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-widest uppercase leading-tight">
            {product.name}
          </h1>
          <p className="text-[15px] mt-3 tracking-widest">€{product.price.toFixed(2)}</p>

          {product.soldOut ? (
            <div className="mt-8">
              <button
                disabled
                className="w-full py-4 bg-[#d4d4d4] text-[#a0a0a0] text-[11px] tracking-widest uppercase cursor-not-allowed"
              >
                SOLD OUT
              </button>
            </div>
          ) : (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] tracking-widest uppercase text-black/40">SELECT SIZE</p>
                {product.sizeChart && (
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-[10px] tracking-widest uppercase underline underline-offset-2 hover:opacity-40 transition-opacity duration-150"
                  >
                    SIZE GUIDE
                  </button>
                )}
              </div>

              <div className={`grid grid-cols-7 gap-1 ${shaking ? 'animate-shake' : ''}`}>
                {DETAIL_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(prev => (prev === size ? null : size))}
                    className={`py-3 text-[10px] tracking-wider border transition-colors duration-150 ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-black/20 hover:border-black text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full mt-3 py-4 text-[11px] tracking-widest uppercase transition-colors duration-150 ${
                  justAdded
                    ? 'bg-black/70 text-white cursor-default'
                    : 'bg-black text-white hover:bg-black/80'
                }`}
              >
                {justAdded ? 'ADDED TO CART ✓' : 'ADD TO CART'}
              </button>
            </div>
          )}

          {/* Description */}
          <div className="mt-10 pt-8 border-t border-black/[0.08]">
            <p className="text-[12px] leading-relaxed text-black/60 tracking-wide">{product.description}</p>
          </div>

          {/* Go to cart prompt */}
          {justAdded && (
            <button
              onClick={() => navigate('/cart')}
              className="mt-4 text-[10px] tracking-widest uppercase underline underline-offset-2 text-black/50 hover:text-black transition-colors duration-150 text-left"
            >
              VIEW CART →
            </button>
          )}
        </div>
      </div>

      {/* Size chart modal */}
      {showSizeChart && product.sizeChart && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="bg-white max-w-lg w-full p-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] tracking-widest uppercase font-medium">SIZE GUIDE</span>
              <button
                onClick={() => setShowSizeChart(false)}
                className="text-[11px] tracking-widest uppercase hover:opacity-40 transition-opacity duration-150"
              >
                CLOSE ×
              </button>
            </div>
            <img src={product.sizeChart} alt="Size guide" className="w-full" />
          </div>
        </div>
      )}
    </main>
  )
}

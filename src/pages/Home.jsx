import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

const TICKER_TEXT = 'FREE SHIPPING OVER €75 · NEW COLLECTION IN · PREMIUM NATURAL FIBRES · NO POLYESTER · '

const CATEGORIES = [
  { slug: 'TOPS',      image: '/images/black-zip-hoodie.png',  count: PRODUCTS.filter(p => p.category === 'TOPS').length },
  { slug: 'BOTTOMS',   image: '/images/dark-wash-denim.png',   count: PRODUCTS.filter(p => p.category === 'BOTTOMS').length },
  { slug: 'OUTERWEAR', image: null,                            count: PRODUCTS.filter(p => p.category === 'OUTERWEAR').length },
]

export default function Home({ onAddToCart }) {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black" style={{ height: '90vh', minHeight: 500 }}>
        <div className="absolute inset-0 bg-[#0d0d0d]" />
        <img
          src="/images/lifestyle-hero.jpg"
          alt="N1CHE Campaign"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        />
        {/* Strong bottom-to-top gradient so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-24 px-5 text-center text-white">
          <p className="text-xs tracking-[0.3em] uppercase mb-5 opacity-70 drop-shadow-md">SS26 COLLECTION</p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.15em] uppercase leading-none mb-5 drop-shadow-lg">
            N1CHE
          </h1>
          <p className="text-sm tracking-widest uppercase opacity-80 mb-10 max-w-sm drop-shadow-md leading-relaxed">
            Essentials engineered for fit.<br />Built to outlast the trend cycle.
          </p>
          <div className="flex gap-3">
            <Link
              to="/category/TOPS"
              className="px-10 py-3.5 bg-white text-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 font-medium"
            >
              SHOP NOW
            </Link>
            <Link
              to="/about"
              className="px-10 py-3.5 border border-white/80 text-white text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200"
            >
              OUR STORY
            </Link>
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-black/[0.08] py-2.5 bg-white select-none">
        <div className="ticker-inner">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-[11px] tracking-[0.2em] uppercase text-black whitespace-nowrap px-1">
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORY TILES ───────────────────────────────────── */}
      <section className="grid grid-cols-3 gap-[2px] bg-black/[0.06]">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="relative overflow-hidden bg-[#f0f0f0] group"
            style={{ aspectRatio: '2/3' }}
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.slug}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            {/* Always-on overlay for legibility */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 text-white text-center">
              <span className="text-sm tracking-widest uppercase font-semibold drop-shadow-md">{cat.slug}</span>
              <span className="text-xs tracking-widest uppercase opacity-70 mt-1 drop-shadow-sm">{cat.count} STYLES</span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── BRAND STATEMENT ──────────────────────────────────── */}
      <section className="py-20 px-5 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-black/35 mb-5">THE PHILOSOPHY</p>
        <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto text-black/75">
          Premium basics engineered for fit, built to outlast the trend cycle.
          No polyester. No compromise. Just the essentials, done right.
        </p>
        <Link
          to="/about"
          className="inline-block mt-8 text-[11px] tracking-widest uppercase underline underline-offset-4 hover:opacity-40 transition-opacity duration-150"
        >
          READ OUR STORY
        </Link>
      </section>

      {/* ── PRODUCT GRID ─────────────────────────────────────── */}
      <div className="border-t border-black/[0.08]">
        <div className="flex items-center justify-between px-4 py-5">
          <h2 className="text-[11px] tracking-widest uppercase font-medium">ALL PRODUCTS</h2>
          <span className="text-[11px] tracking-widest text-black/35">{PRODUCTS.length} STYLES</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] bg-black/[0.06]">
          {PRODUCTS.map(product => (
            <div key={product.id} className="bg-white">
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>

      {/* ── LIFESTYLE BANNER ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0d0d0d]" style={{ minHeight: 400 }}>
        <img
          src="/images/lifestyle-paris.jpg"
          alt="N1CHE Lifestyle"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="relative flex flex-col items-start justify-center h-full min-h-[400px] p-8 sm:p-16 text-white">
          <p className="text-[11px] tracking-[0.3em] uppercase opacity-60 mb-3" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>WORN IN THE CITY</p>
          <p className="text-2xl sm:text-4xl font-bold tracking-widest uppercase leading-tight mb-8" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}>
            BUILT FOR<br />EVERYWHERE
          </p>
          <Link
            to="/category/BOTTOMS"
            className="text-[11px] tracking-widest uppercase border-b border-white pb-0.5 hover:opacity-50 transition-opacity duration-150"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
          >
            SHOP BOTTOMS →
          </Link>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────── */}
      <section className="py-20 px-5 text-center border-t border-black/[0.08]">
        <p className="text-[11px] tracking-widest uppercase font-medium mb-2">STAY IN THE LOOP</p>
        <p className="text-[11px] tracking-widest text-black/40 mb-8">New drops, restocks and brand updates. No spam.</p>
        <form
          onSubmit={e => e.preventDefault()}
          className="flex flex-col sm:flex-row max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            required
            className="flex-1 border border-black/20 px-4 py-3.5 text-[11px] tracking-widest focus:border-black focus:outline-none placeholder:text-black/25 transition-colors duration-150"
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-black text-white text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors duration-150 border border-black whitespace-nowrap mt-0"
          >
            SUBSCRIBE
          </button>
        </form>
      </section>
    </main>
  )
}

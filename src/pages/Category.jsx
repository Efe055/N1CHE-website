import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

const CATEGORIES = ['TOPS', 'BOTTOMS', 'OUTERWEAR']

export default function Category({ onAddToCart }) {
  const { slug } = useParams()
  const category = slug?.toUpperCase()
  const filtered = PRODUCTS.filter(p => p.category === category)

  if (!CATEGORIES.includes(category)) {
    return (
      <main className="flex items-center justify-center py-32">
        <p className="text-[11px] tracking-widest uppercase text-black/40">CATEGORY NOT FOUND</p>
      </main>
    )
  }

  return (
    <main>
      {/* Category header */}
      <div className="px-5 py-6 flex items-baseline gap-4 border-b border-black/[0.08]">
        <h1 className="text-[11px] tracking-widest uppercase font-medium">{category}</h1>
        <span className="text-[10px] tracking-widest text-black/30">{filtered.length} PRODUCTS</span>
        <div className="ml-auto flex gap-5">
          {CATEGORIES.filter(c => c !== category).map(c => (
            <Link
              key={c}
              to={`/category/${c}`}
              className="text-[10px] tracking-widest uppercase text-black/40 hover:text-black transition-colors duration-150"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] bg-black/[0.06]">
          {filtered.map(product => (
            <div key={product.id} className="bg-white">
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-32">
          <p className="text-[11px] tracking-widest uppercase text-black/30">NO PRODUCTS</p>
        </div>
      )}
    </main>
  )
}

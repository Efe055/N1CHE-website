import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Nav({ cartCount }) {
  const location = useLocation()

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/')

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-[11px] tracking-widest uppercase leading-none transition-opacity duration-150 hover:opacity-40 ${
        isActive(to) ? 'opacity-40' : ''
      }`}
    >
      {label}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/[0.08]">
      <nav className="grid grid-cols-3 items-center px-5 py-3.5 max-w-[1728px] mx-auto">
        {/* Left nav */}
        <div className="flex items-center gap-5 sm:gap-7">
          {navLink('/category/TOPS', 'TOPS')}
          {navLink('/category/BOTTOMS', 'BOTTOMS')}
          <span className="hidden md:block">{navLink('/category/OUTERWEAR', 'OUTERWEAR')}</span>
        </div>

        {/* Center logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Right nav */}
        <div className="flex items-center gap-5 sm:gap-7 justify-end">
          <span className="hidden sm:block">{navLink('/about', 'ABOUT')}</span>
          <Link
            to="/cart"
            className={`text-[11px] tracking-widest uppercase leading-none transition-opacity duration-150 hover:opacity-40 whitespace-nowrap ${
              isActive('/cart') ? 'opacity-40' : ''
            }`}
          >
            CART ({cartCount})
          </Link>
        </div>
      </nav>
    </header>
  )
}

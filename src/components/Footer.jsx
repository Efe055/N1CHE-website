import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.08] mt-16">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-8 px-5">
        <Link
          to="/about"
          className="text-[11px] tracking-widest uppercase text-black hover:opacity-50 transition-opacity duration-150"
        >
          ABOUT
        </Link>
        <span className="text-black/30 hidden sm:inline">·</span>
        <Link
          to="/refund-policy"
          className="text-[11px] tracking-widest uppercase text-black hover:opacity-50 transition-opacity duration-150"
        >
          REFUND POLICY
        </Link>
        <span className="text-black/30 hidden sm:inline">·</span>
        <Link
          to="/shipping-policy"
          className="text-[11px] tracking-widest uppercase text-black hover:opacity-50 transition-opacity duration-150"
        >
          SHIPPING POLICY
        </Link>
      </div>
      <div className="text-center pb-6">
        <p className="text-[10px] tracking-widest uppercase text-black">© 2026 N1CHE</p>
      </div>
    </footer>
  )
}

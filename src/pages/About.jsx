import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    heading: 'THE BLUEPRINT OF THE PERFECT FIT',
    body: [
      'We believe that a garment is only as good as the way it moves with you. At N1CHE, we don\'t just design clothes; we meticulously engineer them.',
      'We spend countless hours obsessing over the architecture of a silhouette — the drop of a shoulder, the exact pooling of a hem, and the relaxed structure of a waistband.',
      'Our pieces are tailored to offer a modern, universally flattering fit that balances comfortable ease with a clean, sharp aesthetic.',
      'When you put on a piece from N1CHE, you immediately feel the difference of a garment that was made to be lived in, offering a boost of quiet confidence through superior tailoring.',
    ],
  },
  {
    heading: 'UNCOMPROMISING QUALITY: OUR HIGHEST STANDARD',
    body: [
      'For us, quality is not a marketing buzzword — it is our absolute baseline and a non-negotiable promise to our community. We firmly believe that the clothes closest to your skin should be crafted with the utmost care and responsibility.',
      'From heavy-weight cottons that retain their shape wash after wash, to robust stitching designed to withstand the test of time, every single detail is scrutinized.',
      'We design our collection to be the anti-fast-fashion solution, creating durable staples that become reliable fixtures in your daily life rather than disposable garments destined for a landfill.',
    ],
  },
  {
    heading: 'PURE MATERIALS: WHY WE AVOID POLYESTER',
    pullQuote: '"What you put on your body is just as important as what you put into it."',
    body: [
      'A cornerstone of the N1CHE philosophy is our conscious decision to drastically avoid the use of synthetic materials, particularly polyester. While the mass market relies heavily on polyester to cut corners and lower production costs, we refuse to compromise your well-being or the environment for higher profit margins.',
      'Polyester is essentially a plastic derivative, and wearing it means trapping your skin in a non-breathable, synthetic barrier that can cause irritation, trap bacteria, and disrupt the body\'s natural thermal regulation.',
      'Instead, N1CHE prioritizes rich, premium natural fibres. By focusing on breathable, high-grade cottons and natural blends, we ensure that our garments feel incredibly soft, allow your skin to breathe naturally, and offer a luxurious, authentic texture that synthetic alternatives simply cannot replicate.',
    ],
  },
  {
    heading: 'CLOTHES FOR EVERYONE',
    body: [
      'N1CHE is built on the democratic idea that high-quality, beautifully fitting garments should be accessible to anyone who appreciates fine craftsmanship.',
      'Our aesthetic is intentionally minimalist and clean, serving as a blank canvas for your individuality. Whether you are dressing them up for a sleek, sophisticated look or keeping it completely casual for a relaxed weekend, our basics adapt to your life.',
      'We invite you to experience apparel that honours your body, respects craftsmanship, and elevates the everyday. Welcome to your new standard. Welcome to N1CHE.',
    ],
  },
]

export default function About() {
  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="border-b border-black/[0.08] px-5 py-16 sm:py-24 text-center">
        <p className="text-[9px] tracking-[0.35em] uppercase text-black/30 mb-4">AMSTERDAM · EST. 2026</p>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-[0.2em] uppercase leading-none mb-6">
          WELCOME TO N1CHE
        </h1>
        <p className="text-[12px] sm:text-sm leading-relaxed text-black/60 max-w-2xl mx-auto">
          In a fashion landscape that is constantly racing to keep up with the next fleeting trend, N1CHE was
          born out of a desire to slow things down and refocus on what truly matters: the foundation of your
          wardrobe. We believe that the most powerful statement you can make is one of effortless, timeless
          simplicity.
        </p>
      </section>

      {/* ── MISSION STRIP ────────────────────────────────────── */}
      <section className="bg-black text-white px-5 py-12 text-center">
        <p className="text-[10px] tracking-widest uppercase text-white/40 mb-4">OUR MISSION</p>
        <p className="text-base sm:text-lg leading-relaxed tracking-wide max-w-2xl mx-auto text-white/90">
          To create premium, everyday basic pieces that seamlessly blend an exceptional fit with unparalleled
          quality — designed for absolutely everyone, regardless of personal style or walk of life.
        </p>
      </section>

      {/* ── CONTENT SECTIONS ─────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 py-16 sm:py-24">
        {SECTIONS.map((section, i) => (
          <div key={i} className={`${i < SECTIONS.length - 1 ? 'mb-16 pb-16 border-b border-black/[0.08]' : ''}`}>
            <p className="text-[9px] tracking-[0.3em] uppercase text-black/30 mb-4">0{i + 1}</p>
            <h2 className="text-[13px] tracking-widest uppercase font-medium mb-6 leading-snug">
              {section.heading}
            </h2>
            {section.pullQuote && (
              <blockquote className="border-l-2 border-black pl-5 mb-6 italic text-sm sm:text-base leading-relaxed text-black/70">
                {section.pullQuote}
              </blockquote>
            )}
            <div className="space-y-4">
              {section.body.map((para, j) => (
                <p key={j} className="text-[13px] sm:text-sm leading-[1.85] text-black/60">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── LIFESTYLE PHOTOS ─────────────────────────────────── */}
      <section className="border-t border-black/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-black/[0.06]">
          {/* Lifestyle image 1 — brick wall back view */}
          <div className="relative bg-[#f0f0f0] overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img
              src="/images/lifestyle-1.jpg"
              alt="N1CHE Campaign — Leopard Hoodie"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Lifestyle image 2 — leopard duo front */}
          <div className="relative bg-[#f0f0f0] overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img
              src="/images/lifestyle-2.jpg"
              alt="N1CHE Campaign — Leopard Duo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Caption strip */}
        <div className="bg-black text-white px-5 py-10 text-center">
          <p className="text-[10px] tracking-widest uppercase text-white/40 mb-3">WORN BY EVERYONE</p>
          <p className="text-[12px] tracking-widest text-white/80 max-w-lg mx-auto leading-relaxed">
            N1CHE isn't just a clothing brand; it is a curated approach to modern dressing,
            designed for absolutely everyone.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-5 text-center">
        <p className="text-[9px] tracking-[0.3em] uppercase text-black/30 mb-6">YOUR NEW STANDARD AWAITS</p>
        <Link
          to="/"
          className="inline-block px-12 py-4 bg-black text-white text-[10px] tracking-widest uppercase hover:bg-black/80 transition-colors duration-150"
        >
          SHOP THE COLLECTION
        </Link>
      </section>
    </main>
  )
}

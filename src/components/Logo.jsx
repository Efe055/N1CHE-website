import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex flex-col items-center gap-0.5 hover:opacity-60 transition-opacity duration-200">
      <svg width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="5"  r="2.2" fill="#000"/>
        <circle cx="15" cy="9"  r="1.7" fill="#000"/>
        <circle cx="29" cy="9"  r="1.7" fill="#000"/>
        <circle cx="9"  cy="15" r="1.7" fill="#000"/>
        <circle cx="17" cy="15" r="3.8" fill="#000"/>
        <circle cx="27" cy="15" r="3.8" fill="#000"/>
        <circle cx="35" cy="15" r="1.7" fill="#000"/>
        <circle cx="6"  cy="22" r="1.2" fill="#000"/>
        <circle cx="14" cy="22" r="1.7" fill="#000"/>
        <circle cx="22" cy="22" r="5.2" fill="#000"/>
        <circle cx="30" cy="22" r="1.7" fill="#000"/>
        <circle cx="38" cy="22" r="1.2" fill="#000"/>
        <circle cx="9"  cy="29" r="1.7" fill="#000"/>
        <circle cx="17" cy="29" r="3.8" fill="#000"/>
        <circle cx="27" cy="29" r="3.8" fill="#000"/>
        <circle cx="35" cy="29" r="1.7" fill="#000"/>
        <circle cx="15" cy="35" r="1.7" fill="#000"/>
        <circle cx="29" cy="35" r="1.7" fill="#000"/>
        <circle cx="22" cy="39" r="2.2" fill="#000"/>
      </svg>
      <span className="text-[13px] font-bold tracking-[0.22em] uppercase leading-none">N1CHE</span>
    </Link>
  )
}

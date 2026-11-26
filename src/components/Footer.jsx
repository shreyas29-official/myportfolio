import { LuArrowUp } from 'react-icons/lu'
import { profile } from '../data/profile'
import './Footer.css'

export default function Footer({ onTop }) {
  return (
    <footer className="footer">
      <p className="footer__big" aria-hidden="true">
        {profile.firstName}
        <em>.</em>
      </p>
      <div className="footer__row">
        <p>
          © {new Date().getFullYear()} {profile.name}. 
        </p>
        <button className="footer__top" onClick={onTop}>
          Back to top <LuArrowUp />
        </button>
      </div>
    </footer>
  )
}

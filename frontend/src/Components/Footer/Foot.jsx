import { Link } from 'react-router-dom'
import SocialIcon from '../SocialIcon.jsx'
import './Foot.css'

const socialLinks = [
  {
    label: 'YouTube',
    type: 'youtube',
    href: 'https://youtube.com/@ariseshine3703?si=iZxzwPCgq0MBMXo',
  },
  {
    label: 'Instagram',
    type: 'instagram',
    href: 'https://www.instagram.com/arise_and_shine_ministries._?mdxt=dXExY3NqODR4ZDM3',
  },
  { label: 'Gmail', type: 'gmail', href: 'mailto:ariseandshineofficial@gmail.com' },
]

function Foot() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-name">Arise &amp; Shine Ministries</Link>
          <p>Praying Together • Growing Together • For His Glory</p>
        </div>
        <nav className="footer-social" aria-label="Official social links">
          {socialLinks.map(({ label, type, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <SocialIcon type={type} size={21} />
            </a>
          ))}
        </nav>
        <p className="footer-copy">
          © {new Date().getFullYear()} Arise &amp; Shine Ministries. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Foot

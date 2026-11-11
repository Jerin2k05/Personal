import { ArrowUpRight, Mail } from 'lucide-react'
import SocialIcon from '../../SocialIcon.jsx'
import './Cont.css'

const socialCards = [
  {
    name: 'YouTube',
    type: 'youtube',
    description: 'Watch messages, prayers, and ministry videos on our official channel.',
    href: 'https://youtube.com/@ariseshine3703?si=iZxzwPCgq0MBMXo',
    action: 'Visit channel',
    external: true,
  },
  {
    name: 'Instagram',
    type: 'instagram',
    description: 'Follow the ministry and stay connected with our community.',
    href: 'https://www.instagram.com/arise_and_shine_ministries._?mdxt=dXExY3NqODR4ZDM3',
    action: 'Visit profile',
    external: true,
  },
  {
    name: 'Gmail',
    type: 'gmail',
    description: 'Send a note or question directly to the ministry by email.',
    href: 'mailto:ariseandshineofficial@gmail.com',
    action: 'Send an email',
    external: false,
  },
]

function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-banner">
        <div className="page-width">
          <p className="eyebrow">We would love to hear from you</p>
          <h1 className="page-heading">Get in touch</h1>
          <p>Connect with Arise &amp; Shine Ministries or follow along online.</p>
        </div>
      </section>

      <section className="contact-content page-width">
        <div className="contact-info">
          <div className="contact-mail-icon"><Mail size={24} aria-hidden="true" /></div>
          <p className="eyebrow">Ministry contact</p>
          <h2>Reach out to us</h2>
          <p>For prayer, questions, or ministry inquiries, email us at:</p>
          <a className="official-email" href="mailto:ariseandshineofficial@gmail.com">
            ariseandshineofficial@gmail.com
          </a>
        </div>

        <div className="social-section">
          <div className="social-heading">
            <div>
              <p className="eyebrow">Stay connected</p>
              <h2>Find us online</h2>
            </div>
          </div>
          <div className="social-card-grid">
            {socialCards.map(({ name, type, description, href, action, external }) => (
              <article className="social-card" key={name}>
                <div className="social-card-icon"><SocialIcon type={type} size={29} /></div>
                <h3>{name}</h3>
                <p>{description}</p>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                >
                  {action} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

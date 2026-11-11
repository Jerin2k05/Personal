import { ArrowRight, BookOpen, HeartHandshake, Heart, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import sunriseImage from './homebackground.avif'
import './Home.css'

const values = [
  {
    title: 'Prayer',
    description: 'Bring every need before God and find strength in a community that cares.',
    Icon: Heart,
  },
  {
    title: 'Community',
    description: 'Find encouragement, connection, and a place to walk alongside one another.',
    Icon: UsersRound,
  },
  {
    title: 'Faith',
    description: 'Grow in the Word and trust the hope found in Jesus Christ.',
    Icon: BookOpen,
  },
  {
    title: 'Outreach',
    description: 'Share the love of Christ with compassion in our communities and beyond.',
    Icon: HeartHandshake,
  },
]

function Home() {
  return (
    <div className="home">
      <section className="home-hero" aria-labelledby="home-title">
        <img
          className="hero-background"
          src={sunriseImage}
          alt="Sunrise over a mountain landscape"
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">A place to pray, grow, and serve</p>
          <h1 id="home-title">Arise &amp; Shine</h1>
          <p className="hero-ministry">Ministries</p>
          <p className="hero-tagline">Praying Together <span>•</span> Growing Together <span>•</span> For His Glory</p>
          <blockquote className="hero-verse">
            “Arise, shine, for your light has come,<br className="desktop-break" /> and the glory of the Lord rises upon you.”
          </blockquote>
          <p className="hero-reference">Isaiah 60:1</p>
          <Link to="/prayer-request" className="primary-button hero-button">
            Share a Prayer Request <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <span className="hero-cross" aria-hidden="true" />
      </section>

      <section className="feature-section page-width" aria-label="Our ministry values">
        {values.map(({ title, description, Icon }) => (
          <article className="feature-card" key={title}>
            <div className="feature-icon"><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></div>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <section className="prayer-section">
        <div className="prayer-image-wrap">
          {/* <img
            src="/images/open-bible.svg"
            className="prayer-image"
            alt="An open Bible resting in warm morning light"
            loading="lazy"
          /> */}
        </div>
        <div className="prayer-content">
          <p className="eyebrow">Together in prayer</p>
          <h2>There is strength in praying together.</h2>
          <p>
            Whatever you are carrying, you do not have to carry it alone.
            Share your prayer request and let us stand with you in faith.
          </p>
          <Link to="/contact" className="secondary-button learn-button">
            Learn More <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

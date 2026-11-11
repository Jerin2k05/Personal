import { BookOpen, Clock3 } from 'lucide-react'
import './His.css'

function History() {
  return (
    <div className="history-page">
      <section className="history-hero">
        <img
          src="/images/open-bible.svg"
          alt="An open Bible in the morning light"
          fetchPriority="high"
        />
        <div className="history-hero-shade" />
        <div className="history-hero-copy page-width">
          <p className="eyebrow">Our story</p>
          <h1>Rooted in prayer.<br />Growing in faith.</h1>
          <p>A ministry journey shaped by faith, fellowship, and the hope of Christ.</p>
        </div>
      </section>

      <section className="history-body page-width">
        <div className="history-intro">
          <p className="eyebrow">Arise &amp; Shine Ministries</p>
          <h2 className="page-heading">A story still being gathered</h2>
          <p className="lead-copy">
            Arise &amp; Shine Ministries is a Christian prayer ministry centered
            on prayer, community, faith, and outreach. We are preparing a
            chronological account of the ministry’s journey. Specific dates and
            milestones will be added when confirmed by ministry leadership.
          </p>
        </div>
        <div className="history-milestone">
          <span className="milestone-icon"><Clock3 size={21} aria-hidden="true" /></span>
          <div>
            <p className="milestone-label">Milestones</p>
            <h3>Confirmed ministry history will be shared here.</h3>
            <p>We will update this timeline as verified details are provided.</p>
          </div>
        </div>
        <figure className="history-verse">
          <BookOpen size={25} aria-hidden="true" />
          <blockquote>“Your word is a lamp for my feet, a light on my path.”</blockquote>
          <figcaption>Psalm 119:105</figcaption>
        </figure>
      </section>
    </div>
  )
}

export default History

import {
  BookOpen,
  CalendarDays,
  Heart,
  HeartHandshake,
  Music2,
  UsersRound,
  Video,
} from 'lucide-react'
import './His.css'

const ministryMilestones = [
  {
    icon: HeartHandshake,
    title: 'Missionary visits',
    text: 'As a prayer team, we visited the missionary family serving through our church in the Serapattu Hills near Salem. For nearly three years, we visited local homes, met people, and spent time praying with them.',
  },
  {
    icon: Heart,
    title: "Children's ministry",
    text: 'We extended our service to children through ministry activities at a Polio Home.',
  },
  {
    icon: BookOpen,
    title: 'Vacation Bible School',
    text: 'Every year, we actively participated as a team in VBS programmes, continuing the vision through which our ministry was born.',
  },
  {
    icon: UsersRound,
    title: 'Growing together',
    text: 'With continuous encouragement and support from Giftson Samuel Master and NIMS Ministry, we held an annual retreat to strengthen our spiritual lives, deepen our fellowship, and grow together in Christ.',
  },
]

function History() {
  return (
    <main className="history-page">
      <section className="history-hero">
        <img
          src="/images/open-bible.svg"
          alt=""
          fetchPriority="high"
        />
        <div className="history-hero-shade" />
        <div className="history-hero-copy page-width">
          <p className="eyebrow">Arise and Shine Ministry</p>
          <p className="history-tamil" lang="ta">எழும்பிப் பிரகாசி</p>
          <h1>Our journey of faith</h1>
          <p>Rooted in prayer, growing in fellowship, and serving by His grace.</p>
        </div>
      </section>

      <section className="history-content page-width">
        <div className="history-intro">
          <p className="eyebrow">Our story</p>
          <h2 className="page-heading">A vision that began with a VBS</h2>
          <p>
            Arise and Shine Ministry was born out of a vision and a desire to
            continue serving God beyond a Vacation Bible School (VBS). In 2009,
            the VBS theme was <strong>“Arise and Shine” (எழும்பிப் பிரகாசி)</strong>,
            based on Isaiah 60:1. When the VBS ended, we felt that the ministry
            and fellowship we had experienced should not stop there. With a
            vision to continue serving the Lord, two of us decided to take this
            initiative forward.
          </p>
        </div>

        <aside className="history-founding" aria-label="Ministry founding">
          <CalendarDays size={23} aria-hidden="true" />
          <p className="history-founding-date">6 June 2009</p>
          <h3>A small beginning, a growing fellowship</h3>
          <p>
            Arise and Shine Prayer Ministry officially began at Vijay’s house
            terrace with just four members. By God’s grace, that small gathering
            gradually grew to nearly 20 members.
          </p>
          <div className="history-founding-stats">
            <span><strong>4</strong> members at the beginning</span>
            <span><strong>~20</strong> members through God’s grace</span>
          </div>
        </aside>

        <section className="history-section history-journey">
          <div className="history-section-heading">
            <p className="eyebrow">Our journey of ministry</p>
            <h2 className="page-heading">Serving wherever God leads</h2>
            <p>
              Through the years, God has given us many opportunities to serve,
              pray, and grow together.
            </p>
          </div>
          <div className="history-milestones">
            {ministryMilestones.map(({ icon: Icon, title, text }) => (
              <article className="history-milestone" key={title}>
                <span className="milestone-icon">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="history-prayer-note">
            <UsersRound size={22} aria-hidden="true" />
            <p>
              We initially gathered for group prayers every Saturday and
              Sunday, and later continued our regular prayer fellowship every
              Sunday.
            </p>
          </div>
        </section>

        <section className="history-section history-online">
          <span className="history-feature-icon"><Video size={25} aria-hidden="true" /></span>
          <div>
            <p className="eyebrow">The beginning of online ministry</p>
            <h2 className="page-heading">Fellowship beyond four walls</h2>
            <p>
              During the COVID-19 pandemic, when physical gatherings became
              difficult, God opened a new door for our ministry. We began
              conducting online prayer meetings and gradually expanded our
              activities into digital platforms.
            </p>
            <p>
              We started hosting Bible verse sessions and later introduced
              daily online prayers, where children took turns praying each
              day. Along with daily prayers, we began sharing Bible verses
              regularly to encourage and strengthen people in their spiritual
              journey.
            </p>
          </div>
        </section>

        <section className="history-media">
          <span className="history-feature-icon"><Music2 size={25} aria-hidden="true" /></span>
          <div>
            <p className="eyebrow">Media ministry</p>
            <h2 className="page-heading">Sharing His love through media</h2>
            <p>
              As our ministry continued to grow, we stepped into digital media
              evangelism by launching our own YouTube channel—a platform to
              share God’s love, Word, and message with more people. By God’s
              grace, we have also released two original songs as part of our
              musical ministry.
            </p>
          </div>
          <div className="history-song-count" aria-label="Two original songs">
            <strong>2</strong>
            <span>original songs</span>
          </div>
        </section>

        <section className="history-closing">
          <p className="eyebrow">By His grace, we continue</p>
          <h2>More than a name—our vision and calling.</h2>
          <p>
            From four members on a house terrace in 2009 to a ministry that has
            grown through prayer gatherings, missionary outreach, children’s
            ministry, online prayer meetings, and media ministry, our journey
            has been a testimony of God’s faithfulness.
          </p>
          <p>
            Our desire is to continue rising, shining, and serving the Lord,
            reaching more people through prayer, worship, God’s Word, and every
            opportunity He places before us.
          </p>
          <p className="history-glory">All glory, honour, and praise belong to God alone!</p>
        </section>

        <figure className="history-verse">
          <BookOpen size={25} aria-hidden="true" />
          <blockquote>
            “Arise, shine; for thy light is come, and the glory of the LORD is
            risen upon thee.”
          </blockquote>
          <figcaption>Our foundation verse · Isaiah 60:1</figcaption>
        </figure>
      </section>
    </main>
  )
}

export default History

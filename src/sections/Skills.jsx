import { motion } from 'framer-motion'
import { marquee, skills } from '../data/profile'
import SectionHeading from '../components/SectionHeading'
import { BrandIcon, Icon } from '../components/icons'
import { ease, fadeUp, inView, stagger } from '../components/motion'
import { spotlight } from '../hooks/useSpotlight'
import './Skills.css'

function Marquee({ items, reverse }) {
  const loop = [...items, ...items]
  return (
    <div className={`marquee${reverse ? ' marquee--reverse' : ''}`} aria-hidden="true">
      <div className="marquee__track">
        {loop.map((name, i) => (
          <span className="marquee__item" key={i}>
            <BrandIcon name={name} />
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const half = Math.ceil(marquee.length / 2)

  return (
    <section id="skills" className="section">
      <SectionHeading
        index="04"
        label="Skills"
        title="The *toolkit* I reach for."
        intro="Backend and cloud first, with enough frontend, data and Salesforce knowledge to see a feature through end to end."
      />

      <motion.div
        className="marquees"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ duration: 1 }}
      >
        <Marquee items={marquee.slice(0, half)} />
        <Marquee items={marquee.slice(half)} reverse />
      </motion.div>

      <div className="bento">
        {skills.map((g) => (
          <motion.article
            key={g.title}
            className={`bento__card card${g.wide ? ' is-wide' : ''}${g.full ? ' is-full' : ''}${g.accent ? ' is-sf' : ''}`}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            variants={stagger(0.03, 0.1)}
            onMouseMove={spotlight}
          >
            <motion.header className="bento__head" variants={fadeUp}>
              <span className="bento__icon">
                <Icon name={g.icon} />
              </span>
              <h3>{g.title}</h3>
              <span className="bento__count">{String(g.items.length).padStart(2, '0')}</span>
            </motion.header>
            <ul className="bento__items">
              {g.items.map((s) => (
                <motion.li
                  key={s}
                  className="chip"
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.9 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } },
                  }}
                >
                  {s}
                </motion.li>
              ))}
            </ul>
            {g.flow && (
              <motion.div className="bento__flow" variants={fadeUp}>
                <span className="bento__flow-label">A typical request path</span>
                <ol>
                  {g.flow.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <span className="bento__flow-beam" aria-hidden="true" />
              </motion.div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}

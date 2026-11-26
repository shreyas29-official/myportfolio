import { motion } from 'framer-motion'
import { focusAreas, profile, stats } from '../data/profile'
import { Icon } from '../components/icons'
import Counter from '../components/Counter'
import RevealText from '../components/RevealText'
import Typewriter from '../components/Typewriter'
import { fadeUp, inView, stagger, useReady } from '../components/motion'
import { spotlight } from '../hooks/useSpotlight'
import './About.css'

export default function About() {
  const ready = useReady()

  return (
    <section id="about" className="section about">
      <motion.div
        className="about__hero"
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        variants={stagger(0.1, 0.45)}
      >
        <motion.p className="about__label" variants={fadeUp}>
          <span className="sec-head__index">01</span>
          <span className="about__label-line" />
          About
        </motion.p>

        <h2 className="about__title">
          <RevealText text="Backend engineer building *reliable* systems for the cloud." gap={0.06} />
        </h2>

        <motion.div className="about__terminal" variants={fadeUp}>
          <span className="about__prompt">~/shreyas</span>
          <span className="about__arrow">›</span>
          <span className="about__cmd">building</span>
          <Typewriter phrases={profile.rotating} start={ready} />
        </motion.div>

        <motion.div className="about__summary" variants={stagger(0.12)}>
          {profile.summary.map((p) => (
            <motion.p key={p.slice(0, 20)} variants={fadeUp}>
              {p}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>

      <motion.dl
        className="stats card"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0.1)}
        onMouseMove={spotlight}
      >
        {stats.map((s) => (
          <motion.div className="stats__item" key={s.label} variants={fadeUp}>
            <dt>{s.label}</dt>
            <dd>
              <Counter to={s.value} suffix={s.suffix} />
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      <motion.div
        className="now"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={fadeUp}
      >
        <span className="now__tag">
          <span className="pulse" /> Now
        </span>
        <p>{profile.now}</p>
      </motion.div>

      <motion.div
        className="focus"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0.1)}
      >
        <motion.p className="eyebrow focus__heading" variants={fadeUp}>
          What I work on
        </motion.p>
        <div className="focus__grid">
          {focusAreas.map((f, i) => (
            <motion.article
              key={f.title}
              className={`focus__card card${f.icon === 'salesforce' ? ' is-sf' : ''}`}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onMouseMove={spotlight}
            >
              <span className="focus__icon">
                <Icon name={f.icon} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <span className="focus__num">{String(i + 1).padStart(2, '0')}</span>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

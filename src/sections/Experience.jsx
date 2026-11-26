import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { LuArrowUpRight } from 'react-icons/lu'
import { experience } from '../data/profile'
import SectionHeading from '../components/SectionHeading'
import { ease, fadeUp, inView, stagger } from '../components/motion'
import { spotlight } from '../hooks/useSpotlight'
import './Experience.css'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="section">
      <SectionHeading
        index="02"
        label="Experience"
        title="Where I’ve *shipped* production code."
        intro="A year-plus across three teams: tuning databases, replacing third-party services with self-hosted ones, and running serverless backends across regions."
      />

      <div className="timeline" ref={ref}>
        <div className="timeline__rail" aria-hidden="true">
          <motion.div className="timeline__fill" style={{ scaleY: fill }} />
        </div>

        {experience.map((job) => (
          <motion.article
            key={job.company}
            className="job"
            initial="hidden"
            whileInView="show"
            viewport={inView}
            variants={stagger(0.07)}
          >
            <motion.span
              className={`job__node${job.current ? ' is-current' : ''}`}
              aria-hidden="true"
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 0.6, ease } } }}
            />
            <motion.div
              className="job__card card"
              variants={fadeUp}
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              onMouseMove={spotlight}
            >
              <header className="job__head">
                <div>
                  <h3 className="job__company">
                    {job.company}
                    {job.current && (
                      <span className="job__current">
                        <span className="pulse" /> Current
                      </span>
                    )}
                  </h3>
                  <p className="job__role">{job.role}</p>
                </div>
                <span className="job__period">{job.period}</span>
              </header>

              <p className="job__impact">
                <LuArrowUpRight /> {job.impact}
              </p>

              <motion.ul className="job__points" variants={stagger(0.06, 0.15)}>
                {job.points.map((p) => (
                  <motion.li key={p.slice(0, 24)} variants={fadeUp}>
                    {p}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.ul className="job__tags" variants={stagger(0.035, 0.3)}>
                {job.tags.map((t) => (
                  <motion.li
                    key={t}
                    className="chip"
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                  >
                    {t}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

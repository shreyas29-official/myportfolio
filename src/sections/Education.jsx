import { motion } from 'framer-motion'
import { LuGraduationCap, LuMapPin } from 'react-icons/lu'
import { education } from '../data/profile'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, inView, stagger } from '../components/motion'
import { spotlight } from '../hooks/useSpotlight'
import './Education.css'

export default function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading
        index="05"
        label="Education"
        title="Where the *fundamentals* came from."
      />

      <motion.div
        className="edu"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0.12)}
      >
        {education.map((e, i) => (
          <motion.article
            key={e.school}
            className="edu__card card"
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onMouseMove={spotlight}
          >
            <span className="edu__ghost" aria-hidden="true">
              {e.short}
            </span>
            <span className="edu__icon">
              <LuGraduationCap />
            </span>
            <p className="edu__period">{e.period}</p>
            <h3 className="edu__degree">{e.degree}</h3>
            <p className="edu__school">
              {e.school}
              <span>
                <LuMapPin /> {e.place}
              </span>
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

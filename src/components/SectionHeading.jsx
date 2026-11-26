import { motion } from 'framer-motion'
import RevealText from './RevealText'
import { ease, fadeUp, inView, stagger } from './motion'
import './SectionHeading.css'

export default function SectionHeading({ index, label, title, intro }) {
  return (
    <motion.header
      className="sec-head"
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={stagger(0.08)}
    >
      <motion.p className="sec-head__label" variants={fadeUp}>
        <span className="sec-head__index">{index}</span>
        <motion.span
          className="sec-head__line"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease } } }}
        />
        <span>{label}</span>
      </motion.p>
      <h2 className="sec-head__title">
        <RevealText text={title} />
      </h2>
      {intro && (
        <motion.p className="sec-head__intro" variants={fadeUp}>
          {intro}
        </motion.p>
      )}
    </motion.header>
  )
}

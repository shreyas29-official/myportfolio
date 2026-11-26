import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { ease } from './motion'
import './Preloader.css'

const curtain = [0.76, 0, 0.24, 1]

export default function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      exit={{ y: '-100%', transition: { duration: 0.9, ease: curtain, delay: 0.15 } }}
    >
      <motion.div className="preloader__inner" exit={{ opacity: 0, y: -24, transition: { duration: 0.35 } }}>
        <p className="preloader__name" aria-label={profile.name}>
          {profile.name.split('').map((ch, i) => (
            <span className="preloader__clip" key={i} aria-hidden="true">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.05 }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            </span>
          ))}
        </p>
        <div className="preloader__bar">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          />
        </div>
        <motion.p
          className="preloader__tag"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Backend <i>·</i> Cloud <i>·</i> Salesforce
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

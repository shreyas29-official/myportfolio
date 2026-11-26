import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { LuArrowUp } from 'react-icons/lu'
import './BackToTop.css'

// Floating button with a ring that fills as you scroll.
export default function BackToTop({ onTop }) {
  const { scrollY, scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 700))

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          onClick={onTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <svg className="to-top__ring-svg" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" className="to-top__track" />
            <motion.circle cx="24" cy="24" r="22" className="to-top__ring" style={{ pathLength: scrollYProgress }} />
          </svg>
          <LuArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

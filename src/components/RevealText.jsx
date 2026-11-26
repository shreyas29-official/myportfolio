import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { ease } from './motion'

const word = {
  hidden: { y: '115%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease } },
}

// Splits a sentence into masked words that slide up one after another.
// Wrap words in *asterisks* to render them as accented italics.
export default function RevealText({ text, gap = 0.045 }) {
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean)
  const words = parts.flatMap((part) => {
    const accent = part.startsWith('*')
    return part
      .replace(/\*/g, '')
      .split(' ')
      .filter(Boolean)
      .map((w) => ({ w, accent }))
  })

  return (
    <motion.span
      className="reveal"
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      aria-label={text.replace(/\*/g, '')}
    >
      {words.map(({ w, accent }, i) => (
        <Fragment key={i}>
          <span className="reveal__mask" aria-hidden="true">
            <motion.span className="reveal__word" variants={word}>
              {accent ? <em>{w}</em> : w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </motion.span>
  )
}

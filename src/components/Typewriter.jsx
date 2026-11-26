import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Types each phrase, pauses, deletes it, then moves on to the next.
export default function Typewriter({ phrases, start = true }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!start) return
    const phrase = phrases[index % phrases.length]

    if (reduce) {
      setText(phrase)
      const t = setTimeout(() => setIndex((i) => i + 1), 3000)
      return () => clearTimeout(t)
    }

    let delay = deleting ? 28 : 55 + Math.random() * 45
    if (!deleting && text === phrase) delay = 1900
    if (deleting && text === '') delay = 350

    const t = setTimeout(() => {
      if (!deleting && text === phrase) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else {
        setText(phrase.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, phrases, start, reduce])

  return (
    <span className="typewriter" aria-live="off">
      {text}
      <span className="typewriter__caret" aria-hidden="true" />
    </span>
  )
}

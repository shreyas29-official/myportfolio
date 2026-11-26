import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!seen) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [seen, to])

  return (
    <span ref={ref}>
      {value}
      {suffix && <span className="counter__suffix">{suffix}</span>}
    </span>
  )
}

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './Background.css'

export default function Background() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__grid" />
      <div className="bg__blob bg__blob--a" />
      <div className="bg__blob bg__blob--b" />
      <div className="bg__blob bg__blob--c" />
      <motion.div className="bg__cursor" style={{ x: sx, y: sy }} />
      <div className="bg__noise" />
    </div>
  )
}

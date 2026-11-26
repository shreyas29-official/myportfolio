import { createContext, useContext } from 'react'

// Becomes true once the intro preloader has finished, so the
// above-the-fold entrance animations start at the right moment.
export const ReadyContext = createContext(true)
export const useReady = () => useContext(ReadyContext)

export const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.08 },
  }),
}

export const stagger = (gap = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const inView = { once: true, margin: '0px 0px -12% 0px' }

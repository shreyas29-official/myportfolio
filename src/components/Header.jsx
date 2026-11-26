import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { LuDownload, LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { profile, sections } from '../data/profile'
import { useTheme } from '../hooks/useTheme'
import { ease, useReady } from './motion'
import './Header.css'

export default function Header({ active, onNavigate }) {
  const ready = useReady()
  const [theme, toggleTheme] = useTheme()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    if (!open) return
    const close = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    onNavigate(id)
  }

  return (
    <motion.header
      className="header"
      initial={{ y: -90, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.9, ease, delay: 0.1 }}
    >
      <div className="header__inner">
        <a href="#top" className="brand" onClick={go('top')} aria-label={`${profile.name}, back to top`}>
          <span className="brand__mark">{profile.initials}</span>
          <span className="brand__text">
            <span className="brand__name">{profile.name}</span>
            <span className="brand__role">{profile.title}</span>
          </span>
        </a>

        <nav className="nav" aria-label="Sections">
          {sections.map((s, i) => {
            const isActive = active === s.id
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={go(s.id)}
                className={`nav__link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav__pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="nav__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="nav__label">{s.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="header__actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3, ease }}
                style={{ display: 'grid' }}
              >
                {theme === 'dark' ? <LuSun /> : <LuMoon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a className="btn btn--sm header__resume" href={profile.resume} download>
            Résumé <LuDownload />
          </a>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </div>

      <motion.div className="header__progress" style={{ scaleX: progress }} />

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Sections"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={go(s.id)}
                    className={active === s.id ? 'is-active' : undefined}
                  >
                    <span className="nav__num">{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}>
                <a href={profile.resume} download className="mobile-nav__resume">
                  Download résumé <LuDownload />
                </a>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

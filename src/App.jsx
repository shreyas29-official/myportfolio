import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { sections } from './data/profile'
import { useActiveSection } from './hooks/useActiveSection'
import { ReadyContext } from './components/motion'
import Preloader from './components/Preloader'
import Background from './components/Background'
import Header from './components/Header'
import ProfilePanel from './components/ProfilePanel'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const headerHeight = () =>
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72

export default function App() {
  const [loading, setLoading] = useState(() => !prefersReducedMotion())
  const lenisRef = useRef(null)
  const ids = useMemo(() => sections.map((s) => s.id), [])
  const active = useActiveSection(ids)

  // Buttery smooth scrolling (skipped for reduced-motion users)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading)
    if (loading) lenisRef.current?.stop()
    else lenisRef.current?.start()
  }, [loading])

  // Sections carry `scroll-margin-top: var(--header-h)`, which Lenis honours,
  // so they land just below the fixed header without an extra offset.
  const scrollTo = useCallback((id) => {
    const target = id === 'top' ? 0 : document.getElementById(id)
    if (target === null) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.4 })
    } else {
      const top =
        target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - headerHeight()
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
    history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`)
  }, [])

  const finishLoading = useCallback(() => setLoading(false), [])
  const toTop = useCallback(() => scrollTo('top'), [scrollTo])
  const toContact = useCallback(() => scrollTo('contact'), [scrollTo])

  return (
    <MotionConfig reducedMotion="user">
      <ReadyContext.Provider value={!loading}>
        <AnimatePresence>{loading && <Preloader onDone={finishLoading} />}</AnimatePresence>

        <Background />
        <Header active={active} onNavigate={scrollTo} />

        <div className="layout">
          <aside className="layout__left" aria-label="Profile">
            <ProfilePanel onContact={toContact} />
          </aside>

          <main className="layout__right">
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
            <Footer onTop={toTop} />
          </main>
        </div>

        <BackToTop onTop={toTop} />
      </ReadyContext.Provider>
    </MotionConfig>
  )
}

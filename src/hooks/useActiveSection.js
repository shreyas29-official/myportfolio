import { useEffect, useState } from 'react'

// Tracks which section is currently being read. A section becomes active
// once its top crosses 40% of the viewport; at the very bottom of the page
// the last section wins (it may be too short to reach that line).
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = ids[0]
      if (atBottom) {
        current = ids[ids.length - 1]
      } else {
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= line) current = id
        }
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}

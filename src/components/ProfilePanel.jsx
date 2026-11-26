import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { LuArrowUpRight, LuBriefcase, LuDownload, LuMail, LuMapPin, LuPhone } from 'react-icons/lu'
import { profile } from '../data/profile'
import { ease, stagger, useReady } from './motion'
import './ProfilePanel.css'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const socials = [
  { label: 'GitHub', href: profile.github, icon: FaGithub, external: true },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedinIn, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: LuMail },
  { label: 'Phone', href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: LuPhone },
]

function Photo() {
  const [failed, setFailed] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div className="photo" variants={item} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div className="photo__tilt" style={{ rotateX, rotateY }}>
        <div className="photo__frame">
          <div className="photo__inner">
            {failed ? (
              <div className="photo__placeholder">
                <span>{profile.initials}</span>
                {import.meta.env.DEV && <small>Add your photo at public/profile.jpg</small>}
              </div>
            ) : (
              <motion.img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                onError={() => setFailed(true)}
                variants={{
                  hidden: { scale: 1.25, filter: 'grayscale(1)' },
                  show: { scale: 1, filter: 'grayscale(0)', transition: { duration: 1.6, ease } },
                }}
              />
            )}
            <div className="photo__tone" />
            <div className="photo__shade" />
            <span className="photo__coords">12.97° N · 77.59° E</span>
          </div>
        </div>
        <motion.div
          className="photo__badge"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="pulse" /> {profile.status}
        </motion.div>
      </motion.div>
      <span className="photo__tick photo__tick--tl" />
      <span className="photo__tick photo__tick--tr" />
      <span className="photo__tick photo__tick--bl" />
      <span className="photo__tick photo__tick--br" />
    </motion.div>
  )
}

export default function ProfilePanel({ onContact }) {
  const ready = useReady()

  return (
    <motion.div
      className="profile"
      id="top"
      initial="hidden"
      animate={ready ? 'show' : 'hidden'}
      variants={stagger(0.08, 0.35)}
    >
      <Photo />

      <div className="profile__body">
        <motion.h1 className="profile__name" variants={item}>
          {profile.firstName} <em>M</em>
        </motion.h1>
        <motion.p className="profile__title" variants={item}>
          {profile.title}
        </motion.p>

        <motion.ul className="profile__meta" variants={item}>
          <li>
            <LuMapPin /> {profile.location}
          </li>
          <li>
            <LuBriefcase /> {profile.current}
          </li>
        </motion.ul>

        <motion.div className="profile__social" variants={item}>
          {socials.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <Icon />
            </a>
          ))}
        </motion.div>

        <motion.div className="profile__cta" variants={item}>
          <a className="btn" href={profile.resume} download>
            Download résumé <LuDownload />
          </a>
          <button className="btn btn--ghost" onClick={onContact}>
            Let’s talk <LuArrowUpRight />
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

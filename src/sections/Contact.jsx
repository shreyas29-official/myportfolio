import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { LuArrowUpRight, LuCheck, LuCopy, LuFileText, LuPhone, LuSend } from 'react-icons/lu'
import { profile } from '../data/profile'
import SectionHeading from '../components/SectionHeading'
import Magnetic from '../components/Magnetic'
import { fadeUp, inView, stagger } from '../components/motion'
import { spotlight } from '../hooks/useSpotlight'
import './Contact.css'

const links = [
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: LuPhone },
  { label: 'LinkedIn', value: profile.linkedin.replace(/^https?:\/\//, ''), href: profile.linkedin, icon: FaLinkedinIn, external: true },
  { label: 'GitHub', value: profile.github.replace(/^https?:\/\//, ''), href: profile.github, icon: FaGithub, external: true },
  { label: 'Résumé', value: 'Download PDF', href: profile.resume, icon: LuFileText, download: true },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section contact">
      <SectionHeading
        index="06"
        label="Contact"
        title="Let’s build something *reliable* together."
        intro="I’m open to backend, cloud and Salesforce-related engineering roles. Email is the quickest way to reach me."
      />

      <motion.div
        className="contact__email card"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={fadeUp}
        onMouseMove={spotlight}
      >
        <span className="eyebrow">Email</span>
        <div className="contact__email-row">
          <a href={`mailto:${profile.email}`} className="contact__address">
            {profile.email}
          </a>
          <button className="contact__copy" onClick={copy} aria-label="Copy email address">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'ok' : 'copy'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {copied ? (
                  <>
                    <LuCheck /> Copied
                  </>
                ) : (
                  <>
                    <LuCopy /> Copy
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <Magnetic className="contact__cta">
          <a className="btn" href={`mailto:${profile.email}`}>
            Say hello <LuSend />
          </a>
        </Magnetic>
      </motion.div>

      <motion.ul
        className="contact__links"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0.08)}
      >
        {links.map(({ label, value, href, icon: Icon, external, download }) => (
          <motion.li key={label} variants={fadeUp}>
            <a
              className="contact__link card"
              href={href}
              onMouseMove={spotlight}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              {...(download ? { download: true } : {})}
            >
              <span className="contact__link-icon">
                <Icon />
              </span>
              <span className="contact__link-text">
                <small>{label}</small>
                <span>{value}</span>
              </span>
              <LuArrowUpRight className="contact__link-arrow" />
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

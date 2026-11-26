import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowUpRight, LuCheck, LuShieldCheck } from 'react-icons/lu'
import { profile, projects } from '../data/profile'
import SectionHeading from '../components/SectionHeading'
import { Icon } from '../components/icons'
import { ease, fadeUp, inView, stagger } from '../components/motion'
import { spotlight } from '../hooks/useSpotlight'
import './Projects.css'

function FlowViz({ flows }) {
  const ref = useRef(null)
  const visible = useInView(ref, { margin: '-10% 0px' })
  const [tab, setTab] = useState(0)
  const [done, setDone] = useState(0)
  const steps = flows[tab].steps

  useEffect(() => {
    setDone(0)
  }, [tab])

  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => setDone((d) => (d >= steps.length + 1 ? 0 : d + 1)), 850)
    return () => clearInterval(id)
  }, [visible, steps.length, tab])

  return (
    <div className="flow" ref={ref}>
      <div className="flow__top">
        <p className="eyebrow">Business workflows</p>
        <div className="flow__tabs" role="tablist" aria-label="Workflow">
          {flows.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              aria-selected={tab === i}
              className={`flow__tab${tab === i ? ' is-active' : ''}`}
              onClick={() => setTab(i)}
            >
              {tab === i && (
                <motion.span
                  layoutId="flow-tab"
                  className="flow__tab-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      <ol className="flow__steps" key={tab}>
        {steps.map((s, i) => {
          const isDone = i < done
          const isGate = s === 'Approval'
          return (
            <motion.li
              key={s}
              className={`flow__step${isDone ? ' is-done' : ''}${isGate ? ' is-gate' : ''}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
            >
              <span className="flow__dot">
                {isDone ? <LuCheck /> : isGate ? <LuShieldCheck /> : i + 1}
              </span>
              <span className="flow__label">{s}</span>
              {i < steps.length - 1 && (
                <span className="flow__link" aria-hidden="true">
                  <motion.span
                    animate={{ scaleX: i < done - 1 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease }}
                  />
                </span>
              )}
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        index="03"
        label="Projects"
        title="Something I *built* end to end."
        intro="A full-stack ERP modelled on how real businesses buy, sell, stock and account, with the approvals, permissions and audit trails that come with it."
      />

      {projects.map((p) => (
        <motion.article
          key={p.name}
          className="project card"
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={stagger(0.08)}
          onMouseMove={spotlight}
        >
          <motion.div className="project__head" variants={fadeUp}>
            <div>
              <p className="project__kicker">
                <span className="project__star">✦</span> Featured project
              </p>
              <h3 className="project__name">{p.name}</h3>
              <p className="project__kind">{p.kind}</p>
            </div>
            <a
              className="project__link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="View on GitHub"
            >
              <FaGithub />
              <LuArrowUpRight className="project__link-arrow" />
            </a>
          </motion.div>

          <motion.p className="project__desc" variants={fadeUp}>
            {p.description}
          </motion.p>

          <motion.div className="project__modules" variants={stagger(0.05)}>
            {p.modules.map((m, i) => (
              <motion.span
                key={m}
                className="module"
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
                }}
              >
                <span className="module__num">{String(i + 1).padStart(2, '0')}</span>
                {m}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <FlowViz flows={p.flows} />
          </motion.div>

          <motion.ul className="project__highlights" variants={stagger(0.08)}>
            {p.highlights.map((h) => (
              <motion.li key={h.text.slice(0, 20)} variants={fadeUp}>
                <span className="project__hl-icon">
                  <Icon name={h.icon} />
                </span>
                <p>{h.text}</p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div className="project__stack" variants={fadeUp}>
            <span className="eyebrow">Stack</span>
            <ul>
              {p.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.article>
      ))}

      <motion.a
        className="more card"
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={fadeUp}
        onMouseMove={spotlight}
      >
        <FaGithub className="more__icon" />
        <span>
          <strong>More on GitHub</strong>
          <small>Experiments, practice and work in progress</small>
        </span>
        <LuArrowUpRight className="more__arrow" />
      </motion.a>
    </section>
  )
}

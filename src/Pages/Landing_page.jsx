import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!:-/"

function ScrambleText({ text, className = "", delay = 0, duration = 0.9 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text
      return
    }

    let raf = null
    let frame = 0
    let started = false
    const totalFrames = Math.round(duration * 60)

    const resolve = () => {
      const progress = frame / totalFrames
      const resolved = Math.floor(progress * text.length)
      let out = ""
      for (let i = 0; i < text.length; i++) {
        out += i < resolved ? text[i] : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
      }
      el.textContent = out
      frame++
      if (frame <= totalFrames) raf = requestAnimationFrame(resolve)
      else el.textContent = text
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (started) return
        started = true
        setTimeout(() => {
          raf = requestAnimationFrame(resolve)
        }, delay * 1000)
      },
    })

    return () => {
      st.kill()
      cancelAnimationFrame(raf)
    }
  }, [text, delay, duration])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  )
}

/* ---------------------------------- atoms --------------------------------- */

function Arrow({ size = 16, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function Diamond() {
  return <span className="marquee-diamond" aria-hidden="true" />
}

/* -------------------------------- loader --------------------------------- */

function Loader() {
  const loaderRef = useRef(null)
  const innerRef = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)

  return (
    <div ref={loaderRef} className="loader" aria-hidden="true">
      <div ref={innerRef} className="loader-inner">
        <div className="loader-top">
          <span className="loader-wordmark">UrbanFlow</span>
          <span ref={countRef} className="loader-count">
            000
          </span>
        </div>
        <div className="loader-bar">
          <div ref={barRef} className="loader-bar-fill" />
        </div>
      </div>
    </div>
  )
}

/* --------------------------- scroll indicator ---------------------------- */

function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    if (!barRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    }, barRef)
    return () => ctx.revert()
  }, [])

  return <div ref={barRef} className="scroll-progress" />
}

/* --------------------------------- navbar -------------------------------- */

function Navbar({ visible }) {
  const navRef = useRef(null)

  useEffect(() => {
    if (!navRef.current || !visible) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out" }
      )
    }, navRef)
    return () => ctx.revert()
  }, [visible])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      nav.classList.toggle("nav-scrolled", window.scrollY > 24)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav ref={navRef} className="landing-nav">
      <Link to="/" className={`nav-brand ${!visible ? "nav-hidden" : ""}`}>
        <span className="nav-mark">U</span>
        <span className="nav-wordmark">UrbanFlow</span>
      </Link>
      <div className="nav-links">
        <a href="#coordination">The gap</a>
        <a href="#resources">Resources</a>
        <a href="#features">How it works</a>
        <a href="#impact">Impact</a>
        <a href="/login">Log in</a>
        <Link to="/signup" className="nav-cta">
          Get started
          <Arrow size={14} />
        </Link>
      </div>
    </nav>
  )
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const eyebrowRef = useRef(null)
  const linesRef = useRef(null)
  const subRef = useRef(null)
  const subCopyRef = useRef(null)
  const ctasRef = useRef(null)
  const metaRef = useRef(null)
  const windowRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = gsap.context(() => {
      if (reduced) return

      const lines = linesRef.current ? linesRef.current.querySelectorAll(".hero-line-inner") : []
      const tl = gsap.timeline({ delay: 2.5 })

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .fromTo(
          lines,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.15, stagger: 0.12, ease: "power4.out" },
          "-=0.35"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctasRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
          "-=0.55"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          windowRef.current,
          { opacity: 0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=1.1"
        )

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          xPercent: 14,
          yPercent: 10,
          duration: 26,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }

      gsap.to(contentRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(windowRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const matches = [
    { id: "01", label: "Truck · 4.2 t spare", route: "SODO → Ballard", badge: "Matched", tone: "green" },
    { id: "02", label: "Cold storage · 120 m²", route: "Georgetown", badge: "Open", tone: "yellow" },
    { id: "03", label: "Workshop · 60 m²", route: "Capitol Hill", badge: "Requested", tone: "blue" },
    { id: "04", label: "Pallet space · 84 slots", route: "Tukwila", badge: "Booked", tone: "green" },
  ]

  return (
    <section ref={sectionRef} className="hero" id="top">
      <div ref={glowRef} className="hero-glow" aria-hidden="true" />
      <div className="hero-lines" aria-hidden="true" />

      <div ref={contentRef} className="hero-content">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span ref={eyebrowRef} className="hero-eyebrow-line">
              <span className="pulse-dot" />
              City resource network
            </span>
          </div>

          <h1 className="hero-title" ref={linesRef}>
            <span className="hero-line">
              <span className="hero-line-inner">Make the city</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">work <em>twice</em> as hard<sup className="hero-sup">01</sup></span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">with what&rsquo;s already there.</span>
            </span>
          </h1>

          <div ref={subRef} className="hero-sub">
            <span ref={subCopyRef}>
              <ScrambleText text="UrbanFlow matches underutilized transport, storage, space and equipment with the people who need them — so the city moves on capacity that already exists." delay={0.1} duration={1.1} />
            </span>
          </div>

          <div ref={ctasRef} className="hero-cta-row">
            <Link to="/signup" className="btn btn-ink">
              Join the network
              <Arrow size={17} stroke={2.25} />
            </Link>
            <a href="#coordination" className="btn btn-ghost">
              See the gap
              <Arrow size={16} />
            </a>
          </div>

          <div ref={metaRef} className="hero-meta">
            <div className="hero-meta-item">
              <span className="meta-src">Live regions</span>
              <span className="meta-val">06</span>
            </div>
            <div className="hero-meta-item">
              <span className="meta-src">Capacity listed</span>
              <span className="meta-val">2.4M m²</span>
            </div>
            <div className="hero-meta-item">
              <span className="meta-src">Avg. match time</span>
              <span className="meta-val">11 min</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div ref={windowRef} className="app-window">
            <div className="win-bar">
              <span className="win-dot" />
              <span className="win-dot" />
              <span className="win-dot" />
              <span className="win-url mono">urbanflow.app / network</span>
            </div>
            <div className="win-body">
              <div className="win-head">
                <div>
                  <span className="mono win-kicker">Nearby capacity · 14:32</span>
                  <h3 className="win-title">4 active matches</h3>
                </div>
                <span className="win-live">
                  <span className="pulse-dot" />
                  Live
                </span>
              </div>
              <div className="win-list">
                {matches.map((m) => (
                  <div className="win-item" key={m.id}>
                    <span className={`win-badge badge-${m.tone}`}>{m.badge}</span>
                    <div className="win-item-copy">
                      <span className="win-item-label">{m.label}</span>
                      <span className="mono win-route">{m.route}</span>
                    </div>
                    <span className="mono win-id">{m.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hero-visual-caption mono">
            Capacity finds demand in minutes, not days.
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint mono">
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  )
}

/* -------------------------------- marquee --------------------------------- */

function Marquee({ items, className = "", speed = 26, reverse = false }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const tween = gsap.to(el, {
      xPercent: reverse ? 50 : -50,
      ease: "none",
      duration: speed,
      repeat: -1,
    })
    return () => tween.kill()
  }, [speed, reverse])

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        {[0, 1].map((dup) => (
          <div className="marquee-group" key={dup}>
            {items.map((text, i) => (
              <span className="marquee-inner" key={i}>
                <span className="marquee-text">{text}</span>
                <Diamond />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* --------------------------- coordination gap ---------------------------- */

const GAP_STATS = [
  { value: 34, suffix: "%", label: "of urban capacity sits underutilized on an average day", sub: "Trucks, docks, lots, floors" },
  { value: 62, suffix: "%", label: "of commercial vehicles run below capacity on every route", sub: "Delivery fleets, freight" },
  { value: 47, suffix: "%", label: "of urban storage lies empty through peak hours", sub: "Warehouses, yards, mezzanines" },
]

function CoordinationGap() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const titleRef = useRef(null)
  const statRefs = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { yPercent: 0 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 46 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 62%" },
        }
      )

      statRefs.current.forEach((stat, i) => {
        const numEl = stat.querySelector("[data-num]")
        const obj = { val: 0 }

        gsap.fromTo(
          stat,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: `top ${62 - i * 12}%`,
            },
          }
        )

        gsap.to(obj, {
          val: GAP_STATS[i].value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            onUpdate: () => {
              if (numEl) numEl.textContent = Math.round(obj.val)
            },
          },
        })
      })

      ScrollTrigger.create({
        trigger: leftRef.current,
        start: "top 70%",
        end: "bottom top",
        pin: false,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="gap-section" id="coordination">
      <div className="gap-inner">
        <div className="gap-left">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            The coordination gap
          </div>
          <h2 ref={titleRef} className="gap-title serif">
            Cities have the capacity.
            <br />
            <em className="serif-em">Coordination is the missing link.</em>
          </h2>
          <p className="gap-body">
            Every day, trucks run half-empty, warehouse floors stand idle and dock space
            goes unused — while the very same assets are being requested across town.
            UrbanFlow makes the invisible supply visible.
          </p>
          <a href="#resources" className="text-link">
            What can be matched
            <Arrow size={15} />
          </a>
        </div>

        <div className="gap-right" ref={rightRef}>
          {GAP_STATS.map((s, i) => (
            <div
              key={s.label}
              className="gap-stat"
              ref={(el) => (statRefs.current[i] = el)}
            >
              <div className="gap-stat-top">
                <span className="mono gap-stat-index">0{i + 1}</span>
                <span className="mono gap-stat-sub">{s.sub}</span>
              </div>
              <div className="gap-stat-value mono">
                <span data-num>0</span>
                {s.suffix}
              </div>
              <p className="gap-stat-label">{s.label}</p>
              <div className="gap-stat-rule" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ resources -------------------------------- */

const RESOURCES = [
  {
    name: "Transport",
    desc: "Trucks, vans and delivery fleets with spare load and idle route time.",
    chip: "vans",
    tag: "ACTIVE",
    tone: "blue",
    metric: "4.2 k routes",
  },
  {
    name: "Storage",
    desc: "Warehouses, yards and mezzanines with open capacity on the block.",
    chip: "racks",
    tag: "GROWING",
    tone: "yellow",
    metric: "1.1 M m²",
  },
  {
    name: "Space",
    desc: "Underused lots, docks and temporary floors available for adaptive use.",
    chip: "square",
    tag: "NEW",
    tone: "green",
    metric: "340 sites",
  },
  {
    name: "Equipment",
    desc: "Machinery, tools and infrastructure that sit idle between jobs.",
    chip: "gear",
    tag: "SCALING",
    tone: "red",
    metric: "860 units",
  },
]

function CategoryIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" }
  if (name === "vans") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" {...common} aria-hidden="true">
        <path d="M1 8h12v9H1zM13 11h4l4 3v3h-8z" />
        <circle cx="5.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    )
  }
  if (name === "racks") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" {...common} aria-hidden="true">
        <path d="M5 3v18M19 3v18M5 8h14M5 12h14M5 16h14" />
      </svg>
    )
  }
  if (name === "square") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" {...common} aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" />
        <path d="M4 12h16M12 4v16" />
      </svg>
    )
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...common} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" />
    </svg>
  )
}

function Resources() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = gsap.context(() => {
      if (reduced) return

      const distance = () => trackRef.current.scrollWidth - window.innerWidth
      const tween = gsap.to(trackRef.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      const cards = trackRef.current.querySelectorAll(".resource-card")
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 70 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 85%",
            },
          }
        )
      })

      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0.25 },
          { opacity: 1, ease: "none", scrub: 0.4, scrollTrigger: { trigger: introRef.current, containerAnimation: tween, start: "left 90%", end: "left 40%" } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="resource-section" id="resources">
      <div ref={trackRef} className="resource-track">
        <div className="resource-intro" ref={introRef}>
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            Resource categories
          </div>
          <h2 className="resource-intro-title serif">
            Use what is
            <br />
            <em className="serif-em">already moving.</em>
          </h2>
          <p className="resource-intro-body">
            Four kinds of underutilized capacity, published live by the operators who
            hold it — and requested by the districts that need it.
          </p>
          <div className="mono resource-intro-foot">
            04 categories · live availability
          </div>
        </div>

        {RESOURCES.map((r, i) => (
          <div className={`resource-card tone-${r.tone}`} key={r.name}>
            <div className="resource-card-top">
              <span className="mono resource-tag">{r.tag}</span>
              <span className="resource-chip">
                <CategoryIcon name={r.chip} />
              </span>
            </div>
            <div className="resource-card-mid">
              <h3 className="resource-name serif">{r.name}</h3>
              <p className="resource-desc">{r.desc}</p>
            </div>
            <div className="resource-card-foot">
              <span className="mono resource-metric">{r.metric}</span>
              <span className="resource-card-num mono">0{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------- layer ---------------------------------- */

function Layer() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const nodesRef = useRef(null)
  const lineRef = useRef(null)
  const dotRef = useRef(null)
  const sideRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sideRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=90%",
          pin: pinRef.current,
          scrub: 1,
        },
      })

      if (nodesRef.current) {
        const nodes = nodesRef.current.querySelectorAll(".flow-node")
        tl.fromTo(
          nodes,
          { opacity: 0, y: 44, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.2, ease: "power3.out" },
          0.05
        )
      }

      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, ease: "power2.inOut" },
          0.1
        )
      }

      if (dotRef.current) {
        tl.fromTo(
          dotRef.current,
          { yPercent: -50, opacity: 0 },
          { yPercent: 820, opacity: 1, duration: 1.6, ease: "power2.inOut" },
          0.15
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="layer-section">
      <div className="layer-inner">
        <div className="layer-left" ref={sideRef}>
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            The UrbanFlow layer
          </div>
          <h2 className="layer-title serif">
            One network.
            <br />
            <em className="serif-em">Fuller loads.</em>
          </h2>
          <p className="layer-body">
            A coordination layer sits between what the city has and what it needs.
            List it once. Discover it in real time. Match on the same day.
          </p>
          <div className="layer-steps">
            <div className="layer-step">
              <span className="mono step-key">01</span>
              <div>
                <strong>List</strong>
                <span>Operators publish live capacity.</span>
              </div>
            </div>
            <div className="layer-step">
              <span className="mono step-key">02</span>
              <div>
                <strong>Discover</strong>
                <span>Demand surfaces nearby matches.</span>
              </div>
            </div>
            <div className="layer-step">
              <span className="mono step-key">03</span>
              <div>
                <strong>Match</strong>
                <span>Book on live availability.</span>
              </div>
            </div>
          </div>
          <div className="kbd-row">
            <span>Match shortcut</span>
            <kbd>M</kbd>
          </div>
        </div>

        <div className="layer-visual" ref={pinRef}>
          <div className="flow-wrap">
            <div ref={lineRef} className="flow-line" />
            <span ref={dotRef} className="flow-dot" />
            <div ref={nodesRef} className="flow-nodes">
              <div className="flow-node">
                <span className="mono flow-tag">Supply</span>
                <strong className="flow-name">Available resources</strong>
                <span className="mono flow-detail">Transport · Storage · Space</span>
              </div>
              <div className="flow-node flow-node-core">
                <span className="mono flow-tag">Coordination</span>
                <strong className="flow-name serif">UrbanFlow</strong>
                <span className="mono flow-detail">List · Discover · Match · Utilize</span>
              </div>
              <div className="flow-node">
                <span className="mono flow-tag">Demand</span>
                <strong className="flow-name">People &amp; businesses</strong>
                <span className="mono flow-detail">Search · Select · Utilize</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ feature bento ----------------------------- */

const FEATURES = [
  {
    title: "List in minutes, not months",
    desc: "Publish capacity straight from a mobile phone — set availability, pricing and service area without a sales cycle.",
    icon: "list",
    tone: "green",
    span: "wide",
  },
  {
    title: "Discover live availability",
    desc: "A city-wide view of what is open right now, filtered by district, weight class and window.",
    icon: "radar",
    tone: "blue",
  },
  {
    title: "Match on the same day",
    desc: "Requests hit live capacity the moment they are posted. No phone tag, no spreadsheets.",
    icon: "link",
    tone: "yellow",
  },
  {
    title: "Utilization you can measure",
    desc: "Every match lands in a ledger your ops team can read — occupancy, fill rate and idle time per asset.",
    icon: "chart",
    tone: "red",
  },
]

function FeatureIcon({ name, size = 20 }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" }
  if (name === "list") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" {...common} aria-hidden="true">
        <path d="M9 6h12M9 12h12M9 18h12" />
        <path d="M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
    )
  }
  if (name === "radar") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" {...common} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 12l6.3-6.3M12 9.5v.01" />
      </svg>
    )
  }
  if (name === "link") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" {...common} aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...common} aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
    </svg>
  )
}

function FeatureBento() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll(".feature-card")
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 54 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: (i % 2) * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
        )
        const chip = card.querySelector(".feature-chip")
        if (chip) {
          gsap.to(chip, {
            rotation: i % 2 === 0 ? 6 : -6,
            yoyo: true,
            repeat: -1,
            duration: 4 + i,
            ease: "sine.inOut",
          })
        }
      })

      const header = sectionRef.current.querySelector(".feature-header")
      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 82%" },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="feature-section" id="features">
      <div className="feature-header">
        <div className="section-eyebrow">
          <span className="eyebrow-line" />
          How it works
        </div>
        <h2 className="feature-title serif">
          From idle to <em className="serif-em">in use.</em>
        </h2>
        <p className="feature-sub">
          Four moves between a resource sitting dark and a load being carried.
        </p>
      </div>

      <div ref={gridRef} className="feature-grid">
        <div className="feature-card tone-green feature-wide">
          <div className="feature-card-head">
            <span className="feature-chip">
              <FeatureIcon name="list" />
            </span>
            <span className="mono feature-num">01 — List</span>
          </div>
          <h3 className="feature-name serif">{FEATURES[0].title}</h3>
          <p className="feature-desc">{FEATURES[0].desc}</p>
          <div className="feature-kv">
            <span className="mono kv-src">asset · truck-04</span>
            <span className="mono kv-val">live in 4 min</span>
          </div>
        </div>

        <div className="feature-card tone-blue">
          <div className="feature-card-head">
            <span className="feature-chip">
              <FeatureIcon name="radar" />
            </span>
            <span className="mono feature-num">02 — Discover</span>
          </div>
          <h3 className="feature-name serif">{FEATURES[1].title}</h3>
          <p className="feature-desc">{FEATURES[1].desc}</p>
        </div>

        <div className="feature-card tone-yellow">
          <div className="feature-card-head">
            <span className="feature-chip">
              <FeatureIcon name="link" />
            </span>
            <span className="mono feature-num">03 — Match</span>
          </div>
          <h3 className="feature-name serif">{FEATURES[2].title}</h3>
          <p className="feature-desc">{FEATURES[2].desc}</p>
        </div>

        <div className="feature-card tone-red">
          <div className="feature-card-head">
            <span className="feature-chip">
              <FeatureIcon name="chart" />
            </span>
            <span className="mono feature-num">04 — Utilize</span>
          </div>
          <h3 className="feature-name serif">{FEATURES[3].title}</h3>
          <p className="feature-desc">{FEATURES[3].desc}</p>
          <div className="mini-bars" aria-hidden="true">
            {[38, 54, 47, 71, 63, 82, 74, 92, 68, 86].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- impact --------------------------------- */

const IMPACTS = [
  {
    index: "01",
    title: "Less pressure on the street",
    desc: "Fewer empty trips mean lighter congestion, faster deliveries and quieter peak hours.",
  },
  {
    index: "02",
    title: "Assets pulled off idle",
    desc: "Warehouses, docks and lots already in the network start earning from day one.",
  },
  {
    index: "03",
    title: "Matching measured in minutes",
    desc: "Capacity finds demand in the time it takes to drink a coffee — not a procurement cycle.",
  },
  {
    index: "04",
    title: "A city that does more with less",
    desc: "Progress measured in utilization, not new builds. Better use of what already exists.",
  },
]

function Impact() {
  const sectionRef = useRef(null)
  const stackRef = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      )

      const blocks = stackRef.current.querySelectorAll(".impact-block:not(.impact-block-spacer)")
      const travel = (() => {
        let total = 0
        for (let i = 1; i < blocks.length; i++) {
          total += blocks[i].getBoundingClientRect().height
        }
        return total
      })()

      gsap.to(stackRef.current, {
        y: () => -travel,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${travel + window.innerHeight * 0.4}`,
          pin: sectionRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      blocks.forEach((block, idx) => {
        const line = block.querySelector(".impact-block-line")
        if (!line) return
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${idx * 25 + 6}%`,
              end: `top ${idx * 25 + 16}%`,
              scrub: 0.6,
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="impact-section" id="impact">
      <div className="impact-intro" ref={introRef}>
        <div className="section-eyebrow">
          <span className="eyebrow-line" />
          Impact
        </div>
        <span className="mono impact-intro-right">Measured outcomes</span>
      </div>

      <div className="impact-stack" ref={stackRef}>
        <div className="impact-block impact-block-spacer" aria-hidden="true" />
        {IMPACTS.map((imp) => (
          <div className="impact-block" key={imp.index}>
            <span className="mono impact-index">{imp.index}</span>
            <h2 className="impact-title serif">{imp.title}</h2>
            <p className="impact-desc">{imp.desc}</p>
            <div className="impact-block-line" />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------- faq ----------------------------------- */

const FAQS = [
  {
    q: "Who can list a resource?",
    a: "Any business, operator or city department holding transport, storage, space or equipment can publish live capacity in minutes — no sales process, no contract negotiation.",
  },
  {
    q: "How does matching actually work?",
    a: "A request posts the need; the network surfaces nearby capacity against live availability and confirms the match. Both sides see the same window, price and service area.",
  },
  {
    q: "What does it cost to join?",
    a: "Listing is free. UrbanFlow takes a small percentage only when a match is utilized — so the platform earns when your assets earn.",
  },
  {
    q: "Is the capacity data real-time?",
    a: "Operators maintain live status, and listings that go stale are flagged automatically. What you book is what gets used.",
  },
  {
    q: "Which regions is it live in?",
    a: "Six regions are live today, rolling out district by district. New areas open as operators and demand come online.",
  },
]

function FAQ() {
  const sectionRef = useRef(null)
  const [open, setOpen] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll(".faq-item")
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="faq-section" id="faq">
      <div className="faq-inner">
        <div className="faq-head">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            Questions
          </div>
          <h2 className="faq-title serif">
            Straight <em className="serif-em">answers.</em>
          </h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={`faq-item ${open === i ? "is-open" : ""}`} key={f.q}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="mono faq-index">0{i + 1}</span>
                <span className="faq-question">{f.q}</span>
                <span className={`faq-icon ${open === i ? "minus" : ""}`}>
                  <span className="faq-icon-h" />
                  <span className="faq-icon-v" />
                </span>
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------- cta ---------------------------------- */

function CTA() {
  const sectionRef = useRef(null)
  const glowRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelector(".cta-box"),
        { opacity: 0, y: 70, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      )
      if (btnRef.current) {
        gsap.to(btnRef.current, {
          scale: 1.025,
          yoyo: true,
          repeat: -1,
          duration: 1.6,
          ease: "sine.inOut",
        })
      }
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          xPercent: -18,
          yPercent: 14,
          duration: 24,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta-section">
      <div ref={glowRef} className="cta-glow" aria-hidden="true" />
      <div className="cta-box">
        <div className="section-eyebrow cta-eyebrow">
          <span className="eyebrow-line" />
          Start with one resource
        </div>
        <h2 className="cta-title serif">
          Move the city
          <br />
          <em className="serif-em">
            forward with what already
            <br />
            runs through it.
          </em>
        </h2>
        <div className="cta-actions">
          <Link to="/signup" className="btn btn-ink btn-lg" ref={btnRef}>
            Join UrbanFlow
            <Arrow size={19} stroke={2.25} />
          </Link>
          <a href="#top" className="btn btn-ghost btn-lg">
            Back to top
          </a>
        </div>
        <div className="mono cta-foot">
          Free to list · Live in 06 regions · Matches in minutes
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- footer --------------------------------- */

function Footer() {
  const sectionRef = useRef(null)
  const wordRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordRef.current.querySelectorAll(".footer-word-pane"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.3,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={sectionRef} className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <span className="mono footer-label">Network</span>
          <a href="#resources">Transport</a>
          <a href="#resources">Storage</a>
          <a href="#resources">Space</a>
          <a href="#resources">Equipment</a>
        </div>
        <div className="footer-col">
          <span className="mono footer-label">Company</span>
          <a href="#features">How it works</a>
          <a href="#impact">Impact</a>
          <a href="#faq">Questions</a>
          <a href="/login">Log in</a>
        </div>
        <div className="footer-col footer-col-contact">
          <span className="mono footer-label">Contact</span>
          <a href="mailto:ops@urbanflow.city">ops@urbanflow.city</a>
          <a href="#top" className="mono footer-region">
            Live in 06 regions
          </a>
        </div>
      </div>

      <div className="footer-word" ref={wordRef} aria-hidden="true">
        <div className="footer-word-clip">
          <span className="footer-word-pane">
            Urban<span className="footer-flow">Flow</span>
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="mono">© {new Date().getFullYear()} UrbanFlow</span>
        <span className="mono">Capacity, coordinated.</span>
      </div>
    </footer>
  )
}

/* ---------------------------------- page ---------------------------------- */

const MARQUEE_A = ["Transport", "Storage", "Space", "Equipment", "Logistics", "Fleet"]
const MARQUEE_B = ["Less pressure", "Fewer empty trips", "Better utilization", "Faster matches", "Live capacity"]

function LandingPage() {
  const [loaded, setLoaded] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    const loader = loaderRef.current
    if (!loader) {
      setLoaded(true)
      return
    }
    const ctx = gsap.context(() => {
      const count = { v: 0 }
      const counter = loader.querySelector(".loader-count")
      const fill = loader.querySelector(".loader-bar-fill")
      const inner = loader.querySelector(".loader-inner")
      const timeline = gsap.timeline({
        onComplete: () => setLoaded(true),
      })
      timeline
        .to(count, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(count.v)).padStart(3, "0")
            if (fill) fill.style.transform = `scaleX(${count.v / 100})`
          },
        })
        .to(inner, { yPercent: -110, duration: 0.6, ease: "power3.inOut" }, "+=0.1")
        .to(loader, { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, "-=0.25")
    }, loaderRef)
    return () => ctx.revert()
  }, [])

  return (
    <main className="landing-page">
      {!loaded && (
        <div ref={loaderRef}>
          <Loader />
        </div>
      )}
      <ScrollProgress />
      <Navbar visible={loaded} />
      <Hero />
      <Marquee items={MARQUEE_A} className="marquee-a" />
      <CoordinationGap />
      <Resources />
      <Layer />
      <FeatureBento />
      <Impact />
      <FAQ />
      <Marquee items={MARQUEE_B} className="marquee-b" reverse speed={32} />
      <CTA />
      <Footer />
    </main>
  )
}

export default LandingPage
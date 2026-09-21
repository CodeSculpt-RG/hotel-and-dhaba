import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Menu, Pause, Play, X } from 'lucide-react'
import { drinks, menu, restaurant, reviews, specials, type MenuCategory } from './config/restaurant'

const nav = [
  ['Menu', '/food-menu'], ['Drinks', '/drinks'], ['About', '/about'], ['Catering', '/catering'],
  ['Private Parties', '/private-parties'], ['Specials', '/specials'], ['Reservations', '/reservations'],
]

function usePageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const label = nav.find(([, href]) => href === pathname)?.[0]
    document.title = label ? `${label} | Aman Dhaba` : 'Aman Dhaba | Authentic Indian Dhaba & Restaurant'
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
    canonical.href = window.location.href.split(/[?#]/)[0]
  }, [pathname])
}

function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    els.forEach((el) => observer.observe(el)); return () => observer.disconnect()
  })
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { const fn = () => setScrolled(scrollY > 50); fn(); addEventListener('scroll', fn, { passive: true }); return () => removeEventListener('scroll', fn) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  useEffect(() => { const fn = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', fn); return () => removeEventListener('keydown', fn) }, [])
  const solid = scrolled || pathname !== '/'
  return <header className={`site-header ${solid ? 'solid' : ''}`}>
    <div className="header-top">
      <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}<span className="sr-only">{open ? 'Close' : 'Open'} menu</span></button>
      <Link className="wordmark" to="/" aria-label="Aman Dhaba home"><span>AMAN</span><b>DHABA</b><small>EST. WITH HEART</small></Link>
      <div className="header-actions"><Link to="/reservations">Book a table</Link></div>
    </div>
    <nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([label, href]) => <NavLink key={href} to={href}>{label}</NavLink>)}<button className="order-link" disabled={!restaurant.orderUrl} title="Ordering link coming soon">Order online</button></nav>
    <nav id="mobile-nav" className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open}>
      <div className="mobile-nav-inner">{nav.map(([label, href], i) => <NavLink key={href} onClick={() => setOpen(false)} style={{ '--i': i } as React.CSSProperties} to={href}>{label}<ArrowRight /></NavLink>)}<span className="mobile-note">Order online — coming soon</span></div>
    </nav>
  </header>
}

function ButtonLink({ to, children, inverse = false }: { to: string; children: ReactNode; inverse?: boolean }) {
  return <Link className={`button ${inverse ? 'button-dark' : ''}`} to={to}>{children}<ArrowRight size={17} /></Link>
}

const slides = [
  { title: 'Authentic dhaba flavours', cta: 'Explore menu', href: '/food-menu', image: '/images/aman-dhaba/food/feast.webp' },
  { title: 'Catering for every celebration', cta: 'Explore catering', href: '/catering', image: '/images/aman-dhaba/events/celebration.webp' },
  { title: 'Your table is waiting', cta: 'Book a table', href: '/reservations', image: '/images/aman-dhaba/hero/hero.webp' },
]

function Carousel() {
  const [active, setActive] = useState(0), [playing, setPlaying] = useState(true)
  const touch = useRef(0)
  useEffect(() => { if (!playing) return; const id = setInterval(() => setActive((n) => (n + 1) % slides.length), 5500); return () => clearInterval(id) }, [playing])
  const move = (step: number) => { setActive((active + step + slides.length) % slides.length); setPlaying(false) }
  const end = (e: TouchEvent) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 45) move(dx > 0 ? -1 : 1) }
  return <section className="feature-carousel" aria-roledescription="carousel" aria-label="Aman Dhaba highlights" onTouchStart={(e) => touch.current = e.touches[0].clientX} onTouchEnd={end}>
    {slides.map((slide, i) => <article key={slide.title} className={`feature-slide ${i === active ? 'active' : ''}`} aria-hidden={i !== active}>
      <img src={slide.image} alt="" width="1920" height="960" loading={i === 0 ? 'eager' : 'lazy'} />
      <div className="media-shade" /><div className="slide-content"><p className="eyebrow">Aman Dhaba</p><h2>{slide.title}</h2><ButtonLink to={slide.href}>{slide.cta}</ButtonLink></div>
    </article>)}
    <button className="carousel-arrow prev" aria-label="Previous slide" onClick={() => move(-1)}><ArrowLeft /></button>
    <button className="carousel-arrow next" aria-label="Next slide" onClick={() => move(1)}><ArrowRight /></button>
    <div className="carousel-status"><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>{playing ? <Pause /> : <Play />}</button>{slides.map((s, i) => <button key={s.title} className={i === active ? 'active' : ''} onClick={() => { setActive(i); setPlaying(false) }} aria-label={`Show slide ${i + 1}`} />)}</div>
  </section>
}

function SplitSection({ label, title, text, image, to, cta, reverse = false, dark = false }: { label: string; title: string; text: string; image: string; to: string; cta: string; reverse?: boolean; dark?: boolean }) {
  return <section className={`split-section ${reverse ? 'reverse' : ''} ${dark ? 'dark' : ''}`}>
    <div className="split-media" data-reveal><img src={image} alt="" width="1920" height="1080" loading="lazy" /></div>
    <div className="split-copy" data-reveal><p className="eyebrow">{label}</p><h2>{title}</h2><p>{text}</p><ButtonLink to={to} inverse={!dark}>{cta}</ButtonLink></div>
  </section>
}

function Reviews() {
  const [active, setActive] = useState(0)
  return <section className="reviews image-section">
    <div className="media-shade" /><div className="review-card" data-reveal><p className="eyebrow">Kind words</p><h2>Reviews</h2><div className="stars" aria-label={`${reviews[active].rating} out of 5 stars`}>★★★★★</div><blockquote>“{reviews[active].text}”</blockquote><p className="review-author">{reviews[active].author}</p><p className="placeholder-label">{reviews[active].source}</p><div className="review-controls"><button aria-label="Previous review" onClick={() => setActive((active - 1 + reviews.length) % reviews.length)}><ArrowLeft /></button><span>{String(active + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span><button aria-label="Next review" onClick={() => setActive((active + 1) % reviews.length)}><ArrowRight /></button></div></div>
  </section>
}

function Footer() {
  const missing = 'Details coming soon'
  return <footer className="footer">
    <div className="footer-main"><div className="footer-brand"><Link className="wordmark" to="/"><span>AMAN</span><b>DHABA</b></Link><p>{restaurant.description}</p></div>
      <div><h2>Location</h2><p>{restaurant.address || missing}</p>{restaurant.googleMapsUrl && <a href={restaurant.googleMapsUrl}>Get directions</a>}</div>
      <div><h2>Hours</h2>{restaurant.hours.length ? restaurant.hours.map((h) => <p key={h}>{h}</p>) : <p>{missing}</p>}</div>
      <div><h2>Contact</h2><p>{restaurant.phone || missing}</p><p>{restaurant.email || ''}</p>{restaurant.instagramUrl ? <a href={restaurant.instagramUrl} aria-label="Instagram">Instagram</a> : <span className="social-disabled">Instagram — coming soon</span>}</div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Aman Dhaba</span><span>Made with warmth & spice</span></div>
  </footer>
}

function Home() {
  return <>
    <section className="hero"><img src="/images/aman-dhaba/hero/hero.webp" alt="A generous spread of North Indian dishes in a warmly lit dining room" width="1920" height="920" fetchPriority="high" /><div className="hero-shade" /><div className="hero-content"><p className="eyebrow">Welcome to Aman Dhaba</p><h1><span>Fire.</span> Flavour.<br />Heart.</h1><p className="hero-copy">Honest North Indian cooking, made for passing around the table.</p><ButtonLink to="/food-menu">Explore the menu</ButtonLink></div><a href="#welcome" className="scroll-cue">Scroll <span /></a></section>
    <section id="welcome" className="promo" data-reveal><p className="eyebrow">Aman Dhaba special</p><h2>Authentic flavours.<br /><em>Desi vibes.</em></h2><ButtonLink to="/food-menu" inverse>View our menu</ButtonLink></section>
    <Carousel />
    <SplitSection label="Catering" title="Authentic Indian catering" text="Bring the warmth and flavour of Aman Dhaba to weddings, birthdays, corporate events and family celebrations. Every menu is built for generous sharing." image="/images/aman-dhaba/food/feast.webp" to="/catering" cta="Explore catering" />
    <section className="story-break image-section"><div className="media-shade" /><h2 data-reveal>Where every meal<br /><em>becomes a memory</em></h2></section>
    <SplitSection label="Private parties" title="Celebrate the desi way" text="Gather your people for an evening of abundant food, warm light and effortless hosting. We shape the experience around your celebration." image="/images/aman-dhaba/events/celebration.webp" to="/private-parties" cta="Book your event" reverse dark />
    <section className="order-band"><div data-reveal><p className="eyebrow">Order online</p><h2>Aman Dhaba,<br />delivered to you</h2><p>Online ordering will be available here as soon as the official link is supplied.</p><button className="button button-disabled" disabled>Order now — coming soon</button></div></section>
    <Reviews />
    <section className="reservation-band" data-reveal><p className="eyebrow">Come hungry</p><h2>Your table is waiting</h2><p>Good food tastes better together. Plan your next gathering at Aman Dhaba.</p><ButtonLink to="/reservations" inverse>Book a table</ButtonLink></section>
  </>
}

function PageHero({ eyebrow, title, image = '/images/aman-dhaba/hero/hero.webp' }: { eyebrow: string; title: string; image?: string }) {
  return <section className="page-hero"><img src={image} alt="" width="1920" height="900" /><div className="media-shade" /><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div></section>
}

function MenuPage({ beverage = false }: { beverage?: boolean }) {
  const data = beverage ? drinks : menu
  return <><PageHero eyebrow={beverage ? 'Cool, bright & house-made' : 'From our kitchen'} title={beverage ? 'Drinks' : 'Food menu'} image={beverage ? '/images/aman-dhaba/hero/hero.webp' : '/images/aman-dhaba/food/feast.webp'} /><main className="menu-page"><div className="menu-intro" data-reveal><p className="eyebrow">{beverage ? 'Raise a glass' : 'Made to share'}</p><h2>{beverage ? 'Something refreshing' : 'Pass the plates'}</h2><p>{beverage ? 'House coolers, churned lassi and proper chai—thoughtfully made to sit alongside spice.' : 'Our sample menu celebrates live fire, slow cooking and the generosity of the Indian table. Items and prices are development content pending the final restaurant menu.'}</p></div><nav className="category-nav" aria-label="Menu categories">{data.map(({ category }) => <a key={category} href={`#${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</a>)}</nav><div className="menu-grid">{data.map((category) => <MenuCategoryBlock key={category.category} data={category} />)}</div><p className="menu-note">V — vegetarian · VE — vegan · GF — gluten-free. Please speak with the team about allergies before ordering.</p></main></>
}

function MenuCategoryBlock({ data }: { data: MenuCategory }) {
  return <section className="menu-category" id={data.category.toLowerCase().replaceAll(' ', '-')} data-reveal><h2>{data.category}</h2><div>{data.items.map((item) => <article className={item.featured ? 'featured' : ''} key={item.name}><div className="menu-item-title"><h3>{item.name}</h3><span>{item.price}</span></div><p>{item.description}</p>{item.dietaryTags && <small>{item.dietaryTags.join(' · ')}</small>}</article>)}</div></section>
}

function About() { return <><PageHero eyebrow="Our story" title="Rooted in the road" image="/images/aman-dhaba/story/tandoor.webp" /><section className="editorial intro-editorial"><p className="eyebrow">The Aman way</p><h2>Food that feels like a welcome</h2><p className="lead">Aman Dhaba is inspired by the lively roadside kitchens of North India—places where the fire is always on, the chai keeps coming and every guest is fed like family.</p></section><SplitSection label="At the heart of it" title="Flame, patience and instinct" text="Our cooking begins with whole spices, carefully sourced produce and the deep heat of the tandoor. Recipes honour familiar flavours while leaving room for the season and the cook’s hand." image="/images/aman-dhaba/story/tandoor.webp" to="/food-menu" cta="Taste the story" dark /><section className="values"><article><span>01</span><h3>Honest cooking</h3><p>Fresh ingredients, careful prep and flavours built from the ground up.</p></article><article><span>02</span><h3>Open-hearted service</h3><p>Attentive, relaxed hospitality that lets every table settle in.</p></article><article><span>03</span><h3>Made for gathering</h3><p>Generous dishes designed to travel across the table and bring people closer.</p></article></section></> }

function ServicePage({ type }: { type: 'catering' | 'private' | 'reservations' }) {
  const content = type === 'catering' ? { eyebrow: 'Feasts beyond our table', title: 'Catering', sub: 'Bring Aman Dhaba to your celebration', body: 'From intimate family lunches to full wedding feasts, our catering menus are designed around the way you want to gather. Choose a generous shared spread or work with us on a menu tailored to your occasion.', image: '/images/aman-dhaba/food/feast.webp', note: 'Catering enquiries' } : type === 'private' ? { eyebrow: 'Gather beautifully', title: 'Private parties', sub: 'Your occasion, the Aman way', body: 'Milestones deserve more than a room. We create warm, flavour-filled gatherings with flexible menus, attentive hosting and a setting that feels celebratory from the first welcome.', image: '/images/aman-dhaba/events/celebration.webp', note: 'Event enquiries' } : { eyebrow: 'Pull up a chair', title: 'Reservations', sub: 'There is always room at our table', body: 'Plan a relaxed dinner, a long family lunch or your next catch-up over chai. The official reservation link will appear here once it has been provided.', image: '/images/aman-dhaba/hero/hero.webp', note: 'Booking link coming soon' }
  return <><PageHero eyebrow={content.eyebrow} title={content.title} image={content.image} /><section className="service-content"><div data-reveal><p className="eyebrow">{content.title}</p><h2>{content.sub}</h2><p>{content.body}</p><button disabled className="button button-dark button-disabled">{content.note}</button></div><img src="/images/aman-dhaba/story/tandoor.webp" alt="Chef preparing naan beside a glowing tandoor" width="1920" height="1080" loading="lazy" /></section><section className="contact-cta" data-reveal><p className="eyebrow">Let’s plan it</p><h2>Details make the celebration</h2><p>Contact details will be added here when Aman Dhaba’s official business information is supplied.</p></section></>
}

function Specials() { return <><PageHero eyebrow="A little extra" title="Specials" image="/images/aman-dhaba/food/feast.webp" /><section className="specials-list">{specials.map((special, i) => <article key={special.title} className={i % 2 ? 'reverse' : ''} data-reveal><img src={special.image} alt="" width="1920" height="1080" /><div><p className="eyebrow">{special.day} · {special.time}</p><h2>{special.title}</h2><p>{special.description}</p><span className="availability">Sample special — confirm before publishing</span></div></article>)}</section></> }

function NotFound() { return <section className="not-found"><p className="eyebrow">404</p><h1>That table is empty</h1><p>The page you’re looking for isn’t on tonight’s menu.</p><ButtonLink to="/" inverse>Back home</ButtonLink></section> }

function App() {
  usePageMeta()
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><div id="main"><Routes><Route path="/" element={<Home />} /><Route path="/food-menu" element={<MenuPage />} /><Route path="/drinks" element={<MenuPage beverage />} /><Route path="/about" element={<About />} /><Route path="/catering" element={<ServicePage type="catering" />} /><Route path="/private-parties" element={<ServicePage type="private" />} /><Route path="/reservations" element={<ServicePage type="reservations" />} /><Route path="/specials" element={<Specials />} /><Route path="*" element={<NotFound />} /></Routes></div><Footer /><RevealObserver /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Restaurant', name: restaurant.restaurantName, servesCuisine: 'North Indian', description: restaurant.description }) }} /></>
}

export default App

// ─── Prime Tasks — Sections & UI primitives ────────────────────────────────

const { useState, useEffect, useRef } = React;

// ─── WhatsApp ───
const WA_NUMBER = '4915129778866';
const WA_DEFAULT_TEXT = 'Hallo Prime Tasks, ich interessiere mich für Ihre Leistungen und hätte gern ein unverbindliches Angebot.';
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_DEFAULT_TEXT)}`;

// Icons - minimal stroked icons, drawn fresh
const Icon = {
  Sparkle: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v6M12 15v6M3 12h6M15 12h6" strokeLinecap="round"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>,
  Wrench: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8a2.8 2.8 0 0 1-4-4l8-8 1.7-2.7zM6 18l-2 2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Drill: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10v6H3zM13 9l4-2v8l-4-2M17 8l3-1v6l-3-1M8 14v3a2 2 0 0 0 2 2h2" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  Roller: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="14" height="6" rx="1"/><path d="M17 8h3M11 11v2H8v8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Arrow: () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  WhatsApp: () => <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M16.001 3C8.83 3 3 8.83 3 16c0 2.31.6 4.49 1.66 6.39L3 29l6.84-1.61A12.93 12.93 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16 3zm0 23.5a10.5 10.5 0 0 1-5.36-1.47l-.38-.22-4.06.96.97-3.95-.25-.41A10.5 10.5 0 1 1 26.5 16c0 5.8-4.7 10.5-10.5 10.5zm5.74-7.86c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.24-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.55-1.85-1.73-2.16-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.62-.52-.54-.71-.55-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.27c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.85-.76 2.11-1.49.26-.73.26-1.35.18-1.49-.08-.13-.29-.21-.6-.37z"/></svg>,
  Phone: () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Star: () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2l3 6.5 7 .9-5.2 4.8 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.4l7-.9z"/></svg>,
};

// ─── Brand mark ───
function BrandMark({ logoStyle }) {
  return (
    <div className="brand">
      <img className="brand-logo" src="uploads/logo-mark.png" alt="Prime Tasks GmbH" width="40" height="40" />
      <span>Prime Tasks <span className="gmbh">GmbH</span></span>
    </div>
  );
}

// ─── Navigation ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const { c, lang, setLang } = useI18n();

  const links = [
    ['#leistungen', c.nav.leistungen],
    ['#kostenrechner', c.nav.kostenrechner],
    ['#ablauf', c.nav.ablauf],
    ['#referenzen', c.nav.ueberblick],
    ['#kontakt', c.nav.kontakt],
  ];
  const langSwitch = (
    <div className="lang-switch" role="group" aria-label="Sprache / Language">
      <button className={lang === 'de' ? 'active' : ''} aria-pressed={lang === 'de'} onClick={() => setLang('de')}>DE</button>
      <button className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
    </div>
  );

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`} data-screen-label="Navigation">
      <div className="container nav-inner">
        <BrandMark logoStyle="monogram" />
        <ul className="nav-links">
          {links.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}
        </ul>
        <div className="nav-cta">
          {langSwitch}
          <a href="tel:+4915129778866" className="btn btn-ghost"><Icon.Phone/> +49 1512 9778866</a>
          <a href="#kontakt" className="btn btn-accent">{c.nav.cta}</a>
        </div>
        <button
          className="nav-burger"
          aria-label="Menü"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span/><span/><span/>
        </button>
      </div>

      <div className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
        <ul>
          {links.map(([href, label]) => (
            <li key={href}><a href={href} onClick={() => setMenuOpen(false)}>{label}</a></li>
          ))}
        </ul>
        <div className="nav-mobile-actions">
          {langSwitch}
          <a href="tel:+4915129778866" className="btn btn-ghost" onClick={() => setMenuOpen(false)}><Icon.Phone/> +49 1512 9778866</a>
          <a href="#kontakt" className="btn btn-accent" onClick={() => setMenuOpen(false)}>{c.nav.cta}</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ───
function Hero({ heroVariant }) {
  const { c } = useI18n();
  return (
    <header className="hero" data-screen-label="Hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{c.hero.eyebrow}</span>
          <h1 style={{marginTop: 18}}>
            {c.hero.h1a}<span style={{color:'var(--accent)'}}>{c.hero.h1accent}</span><br/>
            {c.hero.h1b}
          </h1>
          <p className="hero-lead">{c.hero.lead}</p>
          <div className="hero-ctas">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-whats">
              <Icon.WhatsApp/> {c.hero.ctaWhats}
            </a>
            <a href="#kostenrechner" className="btn btn-ghost">
              {c.hero.ctaCalc} <Icon.Arrow/>
            </a>
          </div>
          <div className="hero-pills">
            <span className="pill"><span className="dot"/>{c.hero.pills[0]}</span>
            <span className="pill"><span className="dot b"/>{c.hero.pills[1]}</span>
            <span className="pill"><span className="dot g"/>{c.hero.pills[2]}</span>
          </div>
          <div className="hero-meta">
            {c.hero.stats.map((s, i) => (
              <div key={i} className="stat"><div className="num">{s.num}</div><div className="lbl">{s.lbl}</div></div>
            ))}
          </div>
        </div>

        <div className="hero-display">
          <img
            className="hero-img"
            src="uploads/photos/hero.jpg"
            alt={c.hero.imgAlt}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="placeholder">
            <div className="top">
              <span>IMG · hero</span>
              <span>4:5</span>
            </div>
            <div className="center">Team bei der Arbeit<br/><span style={{fontSize:11,letterSpacing:'.1em',opacity:.7}}>(echtes Foto einsetzen)</span></div>
            <div className="top" style={{justifyContent:'flex-end'}}><span>3000×3750</span></div>
          </div>
          <div className="hero-callout">{c.hero.callout}</div>
        </div>
      </div>
    </header>
  );
}

// ─── Services ───
const SERVICE_ICONS = [
  { icon: <Icon.Sparkle/>, iconClass: 'accent' },
  { icon: <Icon.Wrench/>,  iconClass: '' },
  { icon: <Icon.Drill/>,   iconClass: 'dark' },
  { icon: <Icon.Roller/>,  iconClass: 'green' },
];

function Services() {
  const { c } = useI18n();
  return (
    <section id="leistungen" data-screen-label="Leistungen">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{c.services.eyebrow}</span>
            <h2>{c.services.h2a}<br/>{c.services.h2b}</h2>
          </div>
          <div className="lead">
            <p>{c.services.lead}</p>
          </div>
        </div>
        <div className="services-grid">
          {c.services.items.map((s, i) => (
            <article key={i} className="service">
              <div className="service-num">{String(i + 1).padStart(2, '0')} / 04</div>
              <div className={`service-icon ${SERVICE_ICONS[i].iconClass}`}>{SERVICE_ICONS[i].icon}</div>
              <h3>{s.title}</h3>
              <ul className="service-list">
                {s.list.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <a href="#kontakt" className="service-cta">
                {c.services.cta} <span className="arr"><Icon.Arrow/></span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ───
function Process() {
  const { c } = useI18n();
  return (
    <section id="ablauf" data-screen-label="Ablauf" style={{padding: 0, paddingBottom: 'clamp(60px, 9vw, 120px)'}}>
      <div className="process">
        <span className="eyebrow">{c.process.eyebrow}</span>
        <h2 style={{marginTop: 16, maxWidth: '18ch'}}>
          {c.process.h2}
        </h2>
        <div className="process-steps">
          {c.process.steps.map((s, i) => (
            <div key={i} className="step">
              <span className="num">{s.num}</span>
              <h3>{s.h3}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Leistungs-Überblick (Icons) ───
const svgP = { viewBox: '0 0 24 24', width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const OVERVIEW = [
  { cat: 'Reinigung', ic: 'accent', label: 'Gebäudereinigung',
    icon: <svg {...svgP}><path d="M9 9h5v10a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2z"/><path d="M9 9V6h4M13 6V4h-3"/><path d="M16.5 5.5h3M16.5 8h3M19.5 4l1.5-.4M19.5 9.5l1.5 .4"/></svg> },
  { cat: 'Reinigung', ic: 'accent', label: 'Umzüge',
    icon: <svg {...svgP}><path d="M3 8h18v11H3z"/><path d="M3 8l2-4h14l2 4"/><path d="M12 4v15"/></svg> },
  { cat: 'Reinigung', ic: 'accent', label: 'Entrümpelung',
    icon: <svg {...svgP}><path d="M4 7h16M6 7l1 13h10l1-13M9 7V4h6v3M10 11v6M14 11v6"/></svg> },
  { cat: 'Notdienst', ic: '', label: 'Rohr- & Kanalreinigung',
    icon: <svg {...svgP}><path d="M12 3c-2 3-4 5-4 7a4 4 0 0 0 8 0c0-2-2-4-4-7z"/><path d="M5 20h14M8 17l-1 3M16 17l1 3"/></svg> },
  { cat: 'Notdienst', ic: '', label: 'Schimmelentfernung',
    icon: <svg {...svgP}><path d="M12 3l7 3v5c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg> },
  { cat: 'Notdienst', ic: '', label: 'Bautrocknung',
    icon: <svg {...svgP}><path d="M3 8h12a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3 12h16a2.5 2.5 0 1 1-2.5 2.5"/><path d="M3 16h9a2 2 0 1 1-2 2"/></svg> },
  { cat: 'Einbau', ic: 'dark', label: 'Fenster & Türen',
    icon: <svg {...svgP}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/></svg> },
  { cat: 'Einbau', ic: 'dark', label: 'Möbel & Regale',
    icon: <svg {...svgP}><path d="M14.5 4.5l5 5-2 2-5-5z"/><path d="M12.5 8.5l-8 8-1.5 4 4-1.5 8-8"/></svg> },
  { cat: 'Einbau', ic: 'dark', label: 'Trockenbau',
    icon: <svg {...svgP}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 12h18M9 5v7M15 12v7M6 12V5M18 12V5M6 19v-7M12 19v-7"/></svg> },
  { cat: 'Renovierung', ic: 'green', label: 'Malerarbeiten',
    icon: <svg {...svgP}><rect x="3" y="5" width="14" height="6" rx="1"/><path d="M17 8h3M11 11v2H8v8"/></svg> },
  { cat: 'Böden', ic: 'green', label: 'Laminat, Vinyl & PVC',
    icon: <svg {...svgP}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 9.7v4.6M9 14.3V19"/></svg> },
  { cat: 'Böden', ic: 'green', label: 'Fertigparkett (schwimmend)',
    icon: <svg {...svgP}><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 10l6-6M3 16l12-12M9 20l9-9M15 20l4-4"/></svg> },
];

function Gallery() {
  const { c } = useI18n();
  return (
    <section id="referenzen" data-screen-label="Leistungs-Überblick">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{c.overview.eyebrow}</span>
            <h2>{c.overview.h2a}<br/>{c.overview.h2b}</h2>
          </div>
          <div className="lead">
            <p>{c.overview.lead}</p>
          </div>
        </div>
        <div className="icon-grid">
          {OVERVIEW.map((s, i) => (
            <div key={i} className="icon-tile">
              <div className={`ic ${s.ic}`}>{s.icon}</div>
              <div>
                <div className="t-cat">{c.overview.cats[s.cat]}</div>
                <div className="t-label">{c.overview.labels[i]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Values ───
function Values() {
  const { c } = useI18n();
  return (
    <section data-screen-label="Werte" style={{paddingTop: 0}}>
      <div className="container">
        <div className="values">
          {c.values.map((v, i) => (
            <div key={i} className="value">
              <div className="k">{v.k}</div>
              <p>{v.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───
function CTA() {
  return (
    <section id="kontakt" data-screen-label="Kontakt CTA">
      <div className="container">
        <div className="cta-banner">
          <div>
            <span className="eyebrow" style={{color:'rgba(255,255,255,.7)'}}>Jetzt anfragen</span>
            <h2 style={{marginTop: 18}}>Schreiben Sie uns —<br/>am liebsten per WhatsApp.</h2>
            <p>
              Schicken Sie ein paar Fotos und eine kurze Beschreibung. Wir antworten
              werktags innerhalb von 4 Stunden mit einem konkreten Festpreis und Termin.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <a href="https://wa.me/4915129778866" className="btn btn-whats">
                <Icon.WhatsApp/> WhatsApp öffnen
              </a>
              <a href="mailto:info@primetasks.de" className="btn btn-ghost" style={{borderColor:'rgba(255,255,255,.25)', color:'#fff'}}>
                E-Mail schreiben
              </a>
            </div>
          </div>
          <div className="cta-card">
            <span className="label">Direktkontakt</span>
            <div className="phone">+49 1512 9778866</div>
            <a href="tel:+4915129778866" className="btn btn-primary">
              <Icon.Phone/> Jetzt anrufen
            </a>
            <a href="https://wa.me/4915129778866" className="btn btn-whats">
              <Icon.WhatsApp/> WhatsApp-Chat
            </a>
            <div className="hours">
              <span>Mo–Fr 7:00–20:00</span>
              <span>Sa 9:00–16:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  const { c } = useI18n();
  return (
    <footer data-screen-label="Footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <BrandMark logoStyle="monogram" />
            <p style={{marginTop:16, color:'var(--ink-2)', fontSize:14, maxWidth:'32ch'}}>
              {c.footer.tagline}
            </p>
          </div>
          <div>
            <h4>{c.footer.h4Leistungen}</h4>
            <ul>
              {c.footer.leistungenLinks.map((l, i) => (
                <li key={i}><a href="#leistungen">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{c.footer.h4Unternehmen}</h4>
            <ul>
              <li><a href="#ablauf">{c.footer.unternehmenLinks[0]}</a></li>
              <li><a href="#referenzen">{c.footer.unternehmenLinks[1]}</a></li>
              <li><a href="#kontakt">{c.footer.unternehmenLinks[2]}</a></li>
            </ul>
          </div>
          <div>
            <h4>{c.footer.h4Kontakt}</h4>
            <ul>
              <li>+49 1512 9778866</li>
              <li>info@primetasks.de</li>
              <li>{c.footer.region}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{c.footer.copyright}</span>
          <span className="footer-legal">
            <a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Datenschutz</a>
          </span>
          <span className="footer-credit">
            {c.footer.designedBy} <a href="https://amano.agency" target="_blank" rel="noopener">Amano Agency</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ───
function WhatsFab() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener" className="whats-fab" aria-label="WhatsApp">
      <Icon.WhatsApp/>
    </a>
  );
}

Object.assign(window, {
  Nav, Hero, Services, Process, Gallery, Values, CTA, Footer, WhatsFab, Icon, BrandMark,
});

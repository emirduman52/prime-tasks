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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} data-screen-label="Navigation">
      <div className="container nav-inner">
        <BrandMark logoStyle="monogram" />
        <ul className="nav-links">
          <li><a href="#leistungen">Leistungen</a></li>
          <li><a href="#kostenrechner">Kostenrechner</a></li>
          <li><a href="#ablauf">Ablauf</a></li>
          <li><a href="#referenzen">Überblick</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
        </ul>
        <div className="nav-cta">
          <a href="tel:+4915129778866" className="btn btn-ghost"><Icon.Phone/> +49 1512 9778866</a>
          <a href="#kontakt" className="btn btn-accent">Angebot anfragen</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ───
function Hero({ heroVariant }) {
  return (
    <header className="hero" data-screen-label="Hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Handwerk &amp; Service für Privathaushalte · Region München</span>
          <h1 style={{marginTop: 18}}>
            Alles aus <span style={{color:'var(--accent)'}}>einer Hand.</span><br/>
            Fachgerecht &amp; termintreu.
          </h1>
          <p className="hero-lead">
            Prime Tasks ist Ihr flexibler Rundum&#8209;Service für Privathaushalte —
            von der Grundreinigung bis zur kompletten Renovierung. Ein Anruf, ein Team,
            ein fester Termin.
          </p>
          <div className="hero-ctas">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-whats">
              <Icon.WhatsApp/> Per WhatsApp anfragen
            </a>
            <a href="#kostenrechner" className="btn btn-ghost">
              Kosten berechnen <Icon.Arrow/>
            </a>
          </div>
          <div className="hero-pills">
            <span className="pill"><span className="dot"/>Schnell vor Ort</span>
            <span className="pill"><span className="dot b"/>Sicher &amp; versichert</span>
            <span className="pill"><span className="dot g"/>Zuverlässig &amp; termintreu</span>
          </div>
          <div className="hero-meta">
            <div className="stat"><div className="num">24h</div><div className="lbl">Notdienst-Reaktion</div></div>
            <div className="stat"><div className="num">4+</div><div className="lbl">Leistungs&shy;bereiche</div></div>
            <div className="stat"><div className="num">100%</div><div className="lbl">Festpreis-Garantie</div></div>
          </div>
        </div>

        <div className="hero-display">
          <img
            className="hero-img"
            src="uploads/photos/hero.jpg"
            alt="Handwerker von Prime Tasks bei der Arbeit"
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
          <div className="hero-callout">Jetzt verfügbar</div>
        </div>
      </div>
    </header>
  );
}

// ─── Services ───
const SERVICES = [
  {
    n: '01',
    icon: <Icon.Sparkle/>,
    iconClass: 'accent',
    title: 'Haus & Reinigung',
    items: ['Gebäude- & Grundreinigung', 'Teppichreinigung', 'Hausmeisterdienste', 'Umzüge & Entrümpelung', 'Müllentsorgung'],
  },
  {
    n: '02',
    icon: <Icon.Wrench/>,
    iconClass: '',
    title: 'Notdienst & Sanierung',
    items: ['Rohr- & Kanalreinigung', 'Schimmelentfernung', 'Bautrocknung bei Wasserschaden'],
  },
  {
    n: '03',
    icon: <Icon.Drill/>,
    iconClass: 'dark',
    title: 'Einbau & Montage',
    items: ['Fenster, Türen & Zargen', 'Regale & Möbelaufbau', 'Trockenbau', 'Kabelverlegung (ohne Anschluss)', 'Betonbohren & -schneiden'],
  },
  {
    n: '04',
    icon: <Icon.Roller/>,
    iconClass: 'green',
    title: 'Renovierung & Böden',
    items: ['Malerarbeiten', 'Teppich-, Laminat- & PVC-Böden', 'Fertigparkett (schwimmend)', 'Holz- & Bautenschutz'],
  },
];

function Services() {
  return (
    <section id="leistungen" data-screen-label="Leistungen">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Was wir machen</span>
            <h2>Vier Bereiche.<br/>Ein verlässlicher Ansprechpartner.</h2>
          </div>
          <div className="lead">
            <p>
              Statt für jedes Gewerk einen neuen Handwerker zu suchen, koordinieren wir
              alles intern. Das spart Zeit, Wege und Missverständnisse.
            </p>
          </div>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <article key={s.n} className="service">
              <div className="service-num">{s.n} / 04</div>
              <div className={`service-icon ${s.iconClass}`}>{s.icon}</div>
              <h3>{s.title}</h3>
              <ul className="service-list">
                {s.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <a href="#kontakt" className="service-cta">
                Anfragen <span className="arr"><Icon.Arrow/></span>
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
  return (
    <section id="ablauf" data-screen-label="Ablauf" style={{padding: 0, paddingBottom: 'clamp(60px, 9vw, 120px)'}}>
      <div className="process">
        <span className="eyebrow">So arbeiten wir</span>
        <h2 style={{marginTop: 16, maxWidth: '18ch'}}>
          Drei Schritte. Kein Papierkrieg.
        </h2>
        <div className="process-steps">
          <div className="step">
            <span className="num">01 · ANFRAGE</span>
            <h3>Per WhatsApp oder Anruf</h3>
            <p>Sie schicken uns Fotos und beschreiben kurz das Problem. Antwort meist innerhalb von 4 Stunden — werktags wie am Wochenende.</p>
          </div>
          <div className="step">
            <span className="num">02 · TERMIN</span>
            <h3>Festpreis &amp; fester Termin</h3>
            <p>Sie bekommen einen klaren Festpreis und einen konkreten Termin. Keine Stundenzettel, keine Überraschungen.</p>
          </div>
          <div className="step">
            <span className="num">03 · ERLEDIGT</span>
            <h3>Fachgerecht ausgeführt</h3>
            <p>Unser festes Team arbeitet sauber, hinterlässt nichts und übergibt erst, wenn Sie zufrieden sind.</p>
          </div>
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
  return (
    <section id="referenzen" data-screen-label="Leistungs-Überblick">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Alles auf einen Blick</span>
            <h2>Unser komplettes<br/>Leistungsspektrum.</h2>
          </div>
          <div className="lead">
            <p>
              Vom kurzen Einsatz bis zur kompletten Wohnungsrenovierung —
              für all das ist Prime Tasks Ihr fester Ansprechpartner.
            </p>
          </div>
        </div>
        <div className="icon-grid">
          {OVERVIEW.map((s, i) => (
            <div key={i} className="icon-tile">
              <div className={`ic ${s.ic}`}>{s.icon}</div>
              <div>
                <div className="t-cat">{s.cat}</div>
                <div className="t-label">{s.label}</div>
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
  return (
    <section data-screen-label="Werte" style={{paddingTop: 0}}>
      <div className="container">
        <div className="values">
          <div className="value">
            <div className="k">Schnell</div>
            <p>Notdienst-Reaktion innerhalb von 24 Stunden. Akute Wasserschäden? Meist in unter 2 Stunden vor Ort im Münchner Stadtgebiet.</p>
          </div>
          <div className="value">
            <div className="k">Sicher</div>
            <p>Voll versichert, mit Festpreis-Garantie und ordentlicher Rechnung. Keine versteckten Kosten, keine Bargeld-Forderungen vor Ort.</p>
          </div>
          <div className="value">
            <div className="k">Zuverlässig</div>
            <p>Wir kommen zum vereinbarten Termin — pünktlich. Falls einmal etwas dazwischenkommt, melden wir uns rechtzeitig vorher.</p>
          </div>
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
  return (
    <footer data-screen-label="Footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <BrandMark logoStyle="monogram" />
            <p style={{marginTop:16, color:'var(--ink-2)', fontSize:14, maxWidth:'32ch'}}>
              Ihr Rundum-Service für Privathaushalte — für Haus und Wohnung, schnell, sicher und zuverlässig.
            </p>
          </div>
          <div>
            <h4>Leistungen</h4>
            <ul>
              <li><a href="#leistungen">Haus &amp; Reinigung</a></li>
              <li><a href="#leistungen">Reparatur-Notdienst</a></li>
              <li><a href="#leistungen">Montage</a></li>
              <li><a href="#leistungen">Renovierung</a></li>
            </ul>
          </div>
          <div>
            <h4>Unternehmen</h4>
            <ul>
              <li><a href="#ablauf">Ablauf</a></li>
              <li><a href="#referenzen">Überblick</a></li>
              <li><a href="#kontakt">Kontakt</a></li>
              <li><a href="#">Karriere</a></li>
            </ul>
          </div>
          <div>
            <h4>Kontakt</h4>
            <ul>
              <li>+49 1512 9778866</li>
              <li>info@primetasks.de</li>
              <li>München &amp; Umgebung</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Prime Tasks GmbH</span>
          <span className="footer-legal">
            <a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Datenschutz</a>
          </span>
          <span className="footer-credit">
            Designed by <a href="https://amano.agency" target="_blank" rel="noopener">Amano Agency</a>
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

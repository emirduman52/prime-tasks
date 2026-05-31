// ─── Prime Tasks — Sections & UI primitives ────────────────────────────────

const { useState, useEffect, useRef } = React;

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
          <li><a href="#referenzen">Referenzen</a></li>
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
            <a href="https://wa.me/4915129778866" className="btn btn-whats">
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
            src="uploads/photos/reinigung.jpg"
            alt="Handwerker bei der Arbeit"
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
    items: ['Grundreinigung', 'Umzüge', 'Entrümpelung & Entsorgung'],
  },
  {
    n: '02',
    icon: <Icon.Wrench/>,
    iconClass: '',
    title: 'Reparatur-Notdienst',
    items: ['Abflussreinigung', 'Schimmelbeseitigung', 'Reparatur von Armaturen & WCs'],
  },
  {
    n: '03',
    icon: <Icon.Drill/>,
    iconClass: 'dark',
    title: 'Montage',
    items: ['Möbelaufbau', 'Reparatur von Rolläden', 'Reparatur von Fenstern'],
  },
  {
    n: '04',
    icon: <Icon.Roller/>,
    iconClass: 'green',
    title: 'Renovierung',
    items: ['Malerarbeiten', 'Fliesenlegung', 'Bodenverlegung'],
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
            <p>Sie schicken uns Fotos und beschreiben kurz das Problem. Antwort meist innerhalb von 2 Stunden — werktags wie am Wochenende.</p>
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

// ─── Gallery ───
function Gallery() {
  const tiles = [
    { cls: 't1', cat: 'Reinigung', cap: 'Grundreinigung · 80 m² Altbau', alt: '',
      img: 'uploads/photos/reinigung.jpg' },
    { cls: 't2 alt', cat: 'Notdienst', cap: 'Abfluss-Sanierung · Küchenzeile', alt: 'alt',
      img: 'uploads/photos/notdienst.jpg' },
    { cls: 't3', cat: 'Montage', cap: 'Einbauküche · 6 Schränke', alt: '',
      img: 'uploads/photos/montage-kueche.jpg' },
    { cls: 't4 dark', cat: 'Renovierung', cap: 'Wandbeschichtung · 3-Zimmer-Wohnung', alt: 'dark',
      img: 'uploads/photos/renovierung.jpg' },
    { cls: 't5', cat: 'Montage', cap: 'Fensterreparatur · Holzrahmen', alt: '',
      img: 'uploads/photos/fenster.jpg' },
  ];
  return (
    <section id="referenzen" data-screen-label="Referenzen">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Beispielhafte Bilder</span>
            <h2>Eindrücke aus<br/>unserem Leistungsspektrum.</h2>
          </div>
          <div className="lead">
            <p>
              Ein kleiner Ausschnitt unserer Leistungen — vom kurzen Einsatz
              bis zur kompletten Wohnungsrenovierung. Beispielhafte Bilder.
            </p>
          </div>
        </div>
        <div className="gallery-grid">
          {tiles.map((t, i) => (
            <div key={i} className={`tile ${t.cls}`}>
              {t.img && (
                <img
                  className="tile-img"
                  src={t.img}
                  alt={t.cap}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <div className="ph">
                <span className="cat">{t.cat}</span>
                <div>{t.cap}</div>
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
              werktags innerhalb von 2 Stunden mit einem konkreten Festpreis und Termin.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <a href="https://wa.me/4915129778866" className="btn btn-whats">
                <Icon.WhatsApp/> WhatsApp öffnen
              </a>
              <a href="mailto:hallo@primetasks.de" className="btn btn-ghost" style={{borderColor:'rgba(255,255,255,.25)', color:'#fff'}}>
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
              <li><a href="#referenzen">Referenzen</a></li>
              <li><a href="#kontakt">Kontakt</a></li>
              <li><a href="#">Karriere</a></li>
            </ul>
          </div>
          <div>
            <h4>Kontakt</h4>
            <ul>
              <li>+49 1512 9778866</li>
              <li>hallo@primetasks.de</li>
              <li>München &amp; Umgebung</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Prime Tasks GmbH</span>
          <span>Impressum · Datenschutz · AGB</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ───
function WhatsFab() {
  return (
    <a href="https://wa.me/4915129778866" className="whats-fab" aria-label="WhatsApp">
      <Icon.WhatsApp/>
    </a>
  );
}

Object.assign(window, {
  Nav, Hero, Services, Process, Gallery, Values, CTA, Footer, WhatsFab, Icon, BrandMark,
});

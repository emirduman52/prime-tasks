// ─── Prime Tasks — WhatsApp Widget ────────────────────────────────────────
// Replaces the form. People drop in service + description + (optional) name,
// hit the WhatsApp button and continue the conversation in the app —
// where they can attach photos, voice notes etc. natively.

function WhatsAppChatWidget() {
  const { c, lang } = useI18n();
  const [service, setService] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const serviceOptions = [
    { value: '', label: c.wa.servicePlaceholder },
    ...c.wa.options.map((o) => ({ value: o, label: o })),
  ];

  // Listen for prefill from calculator (service id + message)
  useEffect(() => {
    const applyPrefill = () => {
      try {
        const raw = sessionStorage.getItem('pt-prefill');
        if (!raw) return;
        const p = JSON.parse(raw);
        if (p.service) setService(p.service);
        if (p.message) setMessage(p.message);
        sessionStorage.removeItem('pt-prefill');
      } catch (e) {}
    };
    applyPrefill();
    window.addEventListener('pt-prefill', applyPrefill);
    return () => window.removeEventListener('pt-prefill', applyPrefill);
  }, []);

  // Compose the actual WhatsApp message
  const wishMsg = c.wa.wishDefault.replace(/^…\s*/, '');
  const lines = [];
  if (name.trim()) lines.push(c.wa.greetHello(name.trim()));
  else lines.push(c.wa.greetDefault);
  if (service) lines.push(`\n${c.wa.leistungPrefix} ${service}`);
  if (message.trim()) lines.push(`\n${message.trim()}`);
  if (!service && !message.trim()) lines.push(`\n${wishMsg}`);
  const composed = lines.join('\n').trim();

  const wa = `https://wa.me/4915129778866?text=${encodeURIComponent(composed)}`;

  // ── time hint (just "today" relative)
  const now = new Date();
  const time = now.toLocaleTimeString(lang === 'de' ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <section id="kontakt" data-screen-label="WhatsApp Kontakt">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{c.wa.eyebrow}</span>
            <h2>{c.wa.h2a}<br/>{c.wa.h2b}</h2>
          </div>
          <div className="lead">
            <p>{c.wa.lead}</p>
          </div>
        </div>

        <div className="wa-widget">
          {/* LEFT — composer */}
          <div className="wa-compose">
            <div className="wa-compose-head">
              <div className="wa-avatar">
                <img className="wa-avatar-img" src="uploads/logo-mark.png" alt="Prime Tasks GmbH" />
                <span className="wa-online" aria-label="online"></span>
              </div>
              <div>
                <strong>{c.wa.composeName}</strong>
                <span>{c.wa.composeStatus}</span>
              </div>
            </div>

            <div className="wa-fields">
              <div className="wa-field">
                <label htmlFor="wa-service">{c.wa.serviceLabel}</label>
                <select id="wa-service" value={service} onChange={(e) => setService(e.target.value)}>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="wa-field">
                <label htmlFor="wa-name">{c.wa.nameLabel} <em>{c.wa.nameOptional}</em></label>
                <input
                  id="wa-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={c.wa.namePlaceholder}
                />
              </div>
              <div className="wa-field">
                <label htmlFor="wa-msg">{c.wa.msgLabel}</label>
                <textarea
                  id="wa-msg"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={c.wa.msgPlaceholder}
                />
              </div>
            </div>

            <div className="wa-photo-hint">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <circle cx="9" cy="11" r="2"/>
                <path d="M21 17l-5-5-9 8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{c.wa.photoHint}</span>
            </div>

            <a href={wa} target="_blank" rel="noopener" className="btn btn-whats wa-cta">
              <Icon.WhatsApp/> {c.wa.cta}
            </a>

            <div className="wa-fallback">
              {c.wa.fallbackPre} <a href="tel:+4915129778866">{c.wa.callLink}</a>
              · <a href="mailto:info@primetasks.de">{c.wa.emailLink}</a>
            </div>
          </div>

          {/* RIGHT — live chat preview */}
          <aside className="wa-preview" aria-label="Chat">
            <header className="wa-preview-head">
              <button className="wa-back" aria-hidden="true">‹</button>
              <div className="wa-avatar small">
                <img className="wa-avatar-img" src="uploads/logo-mark.png" alt="Prime Tasks GmbH" />
              </div>
              <div className="wa-head-meta">
                <strong>Prime Tasks GmbH</strong>
                <span>{c.wa.previewOnline}</span>
              </div>
              <div className="wa-icons">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17 10.5V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3.5l4 4v-11z"/></svg>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.49 9.49A6.65 6.65 0 0 0 14.94 6c-2.93 0-5.66 1.59-7 4.05a.5.5 0 0 0 .43.75H10c.2 0 .38-.12.46-.31.62-1.5 2.06-2.49 3.7-2.49 2.21 0 4 1.79 4 4 0 1.64-.99 3.08-2.49 3.7-.19.08-.31.26-.31.46v1.62a.5.5 0 0 0 .75.43c2.46-1.34 4.05-4.07 4.05-7a6.65 6.65 0 0 0-1.51-4.21M11 17h2v2h-2z"/></svg>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/></svg>
              </div>
            </header>

            <div className="wa-preview-body">
              {/* Pre-canned incoming bubble */}
              <div className="wa-bubble wa-in">
                <p>{c.wa.bubbleIn1}</p>
                <p>{c.wa.bubbleIn2}</p>
                <span className="wa-time">{time}</span>
              </div>

              {/* Outgoing bubble — live updates */}
              <div className="wa-bubble wa-out">
                {name.trim() ? <p>{c.wa.greetHello(name.trim())}</p> : <p>{c.wa.greetDefault}</p>}
                {service && <p style={{marginTop:6}}><strong>{c.wa.leistungPrefix}</strong> {service}</p>}
                {message.trim()
                  ? <p style={{marginTop:6, whiteSpace:'pre-wrap'}}>{message.trim()}</p>
                  : (!service && <p style={{marginTop:6, opacity:.6, fontStyle:'italic'}}>{c.wa.wishDefault}</p>)
                }
                <span className="wa-time">
                  {time}
                  <svg viewBox="0 0 16 16" width="16" height="11" style={{marginLeft:4, verticalAlign:'middle'}}>
                    <path d="M.5 7.5L4 11l5-5M7 11l5-5M10 9.5L12 11l3.5-3.5" fill="none" stroke="#9aa6b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <footer className="wa-preview-foot">
              <span className="wa-mock-input">📎  {c.wa.mockInput}</span>
              <button className="wa-mic" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.08A7 7 0 0 0 19 11"/></svg>
              </button>
            </footer>
          </aside>
        </div>
      </div>
    </section>
  );
}

window.WhatsAppChatWidget = WhatsAppChatWidget;

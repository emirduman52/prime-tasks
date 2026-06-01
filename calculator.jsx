// ─── Prime Tasks — Kostenrechner ──────────────────────────────────────────
// Configurable price estimator. Ranges are based on typical München market
// rates (2026, ungefährer Richtwert) — easy to tune in PRICING below.

const PRICING = {
  // Each task defines: a base price range, optional per-unit multiplier,
  // a unit, and input config (min/max/step/default/label).
  reinigung: {
    label: 'Haus & Reinigung',
    icon: 'sparkle',
    tasks: {
      grund: {
        label: 'Grundreinigung',
        unit: 'm²',
        per: { min: 4, max: 7 },
        base: { min: 0, max: 0 },
        input: { min: 20, max: 300, step: 5, def: 60, label: 'Wohnfläche' },
      },
      umzug: {
        label: 'Umzug (Helfer & Transport)',
        unit: 'h',
        per: { min: 90, max: 130 }, // 2 Helfer + Transporter
        base: { min: 60, max: 100 }, // Anfahrt
        input: { min: 2, max: 12, step: 1, def: 4, label: 'Einsatzdauer' },
      },
      entruempelung: {
        label: 'Entrümpelung & Entsorgung',
        unit: 'm³',
        per: { min: 80, max: 130 },
        base: { min: 50, max: 80 },
        input: { min: 1, max: 40, step: 1, def: 6, label: 'Volumen' },
      },
    },
  },
  notdienst: {
    label: 'Reparatur-Notdienst',
    icon: 'wrench',
    tasks: {
      abfluss: {
        label: 'Abflussreinigung',
        unit: 'Pauschale',
        per: { min: 0, max: 0 },
        base: { min: 90, max: 180 },
        input: null,
      },
      schimmel: {
        label: 'Schimmelbeseitigung',
        unit: 'm²',
        per: { min: 25, max: 60 },
        base: { min: 80, max: 120 },
        input: { min: 1, max: 30, step: 1, def: 3, label: 'Befallene Fläche' },
      },
      armatur: {
        label: 'Reparatur Armaturen / WC',
        unit: 'Stück',
        per: { min: 70, max: 180 },
        base: { min: 60, max: 80 },
        input: { min: 1, max: 5, step: 1, def: 1, label: 'Anzahl' },
      },
    },
  },
  montage: {
    label: 'Montage',
    icon: 'drill',
    tasks: {
      moebel: {
        label: 'Möbelaufbau',
        unit: 'Möbelstück',
        per: { min: 30, max: 60 },
        base: { min: 40, max: 60 },
        input: { min: 1, max: 15, step: 1, def: 2, label: 'Möbelstücke' },
      },
      rolladen: {
        label: 'Rollläden-Reparatur',
        unit: 'Stück',
        per: { min: 80, max: 220 },
        base: { min: 60, max: 80 },
        input: { min: 1, max: 10, step: 1, def: 1, label: 'Anzahl Rollläden' },
      },
      fenster: {
        label: 'Fenster-Reparatur',
        unit: 'Stück',
        per: { min: 60, max: 180 },
        base: { min: 60, max: 80 },
        input: { min: 1, max: 10, step: 1, def: 1, label: 'Anzahl Fenster' },
      },
    },
  },
  renovierung: {
    label: 'Renovierung',
    icon: 'roller',
    tasks: {
      maler: {
        label: 'Malerarbeiten (Wand & Decke)',
        unit: 'm² Wandfläche',
        per: { min: 8, max: 18 },
        base: { min: 80, max: 120 },
        input: { min: 10, max: 400, step: 5, def: 80, label: 'Wandfläche' },
      },
      vinyl: {
        label: 'Vinylboden verlegen (ohne Material)',
        unit: 'm²',
        per: { min: 18, max: 35 },
        base: { min: 80, max: 120 },
        input: { min: 5, max: 200, step: 5, def: 30, label: 'Bodenfläche' },
      },
      laminat: {
        label: 'Laminat verlegen (ohne Material)',
        unit: 'm²',
        per: { min: 15, max: 30 },
        base: { min: 80, max: 120 },
        input: { min: 5, max: 200, step: 5, def: 30, label: 'Bodenfläche' },
      },
    },
  },
};

const URGENCIES = [
  { id: 'normal', label: 'Regulär', sub: 'Innerhalb 1 Woche', mult: 1.0 },
  { id: 'express', label: 'Express', sub: '24h–48h', mult: 1.2 },
];

const fmt = (n) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(n));
const eur = (n) => `${fmt(n)} €`;

function calcLine(task, qty) {
  if (!task.input) {
    return {
      min: task.base.min,
      max: task.base.max,
    };
  }
  return {
    min: task.base.min + task.per.min * qty,
    max: task.base.max + task.per.max * qty,
  };
}

function CalcIcon({ kind }) {
  if (kind === 'sparkle') return <Icon.Sparkle/>;
  if (kind === 'wrench')  return <Icon.Wrench/>;
  if (kind === 'drill')   return <Icon.Drill/>;
  return <Icon.Roller/>;
}

function Calculator() {
  const [catId, setCatId] = useState('reinigung');
  const [taskId, setTaskId] = useState('grund');
  const [qty, setQty] = useState(PRICING.reinigung.tasks.grund.input.def);
  const [urgency, setUrgency] = useState('normal');
  const [extras, setExtras] = useState({ wochenende: false, etage: false });
  const [submitted, setSubmitted] = useState(false);

  const cat = PRICING[catId];
  // Guard against stale taskId from a previous category — the useEffect that
  // resets taskId runs AFTER render, so we resolve a safe key inline.
  const safeTaskId = cat.tasks[taskId] ? taskId : Object.keys(cat.tasks)[0];
  const task = cat.tasks[safeTaskId];
  const urg = URGENCIES.find(u => u.id === urgency);

  // when category changes, reset task to first one (keeps state in sync)
  useEffect(() => {
    const firstTaskId = Object.keys(cat.tasks)[0];
    if (!cat.tasks[taskId]) setTaskId(firstTaskId);
  }, [catId]);

  // when task changes, reset qty to default
  useEffect(() => {
    if (task && task.input) setQty(task.input.def);
  }, [safeTaskId]);

  const line = calcLine(task, qty);
  const urgencyMult = urg.mult;
  const extrasFlat = (extras.wochenende ? 60 : 0) + (extras.etage ? 40 : 0);

  const totalMin = line.min * urgencyMult + extrasFlat;
  const totalMax = line.max * urgencyMult + extrasFlat;

  const whatsAppText = encodeURIComponent(
    `Hallo Prime Tasks, ich hätte gern ein Angebot:\n\n` +
    `Leistung: ${cat.label} — ${task.label}\n` +
    (task.input ? `${task.input.label}: ${qty} ${task.unit}\n` : `Umfang: ${task.unit}\n`) +
    `Dringlichkeit: ${urg.label} (${urg.sub})\n` +
    (extras.wochenende ? `Zeitfenster: Wochenende/Abend\n` : '') +
    (extras.etage ? `Zugang: höhere Etage ohne Aufzug\n` : '') +
    `\nUngefährer Richtwert vom Rechner: ${eur(totalMin)} – ${eur(totalMax)}\n` +
    `\nBitte um Rückmeldung mit Festpreis und Termin. Danke!`
  );

  const taskList = Object.entries(cat.tasks);

  return (
    <section id="kostenrechner" data-screen-label="Kostenrechner">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Was kostet's?</span>
            <h2>Sofort-Richtwert.<br/>Ohne Anmeldung.</h2>
          </div>
          <div className="lead">
            <p>
              Wählen Sie Leistung und Umfang — Sie bekommen sofort einen ungefähren
              Preisrahmen. Der Festpreis kommt nach kurzer Foto-Anfrage per WhatsApp.
            </p>
          </div>
        </div>

        <div className="calc">
          {/* LEFT: configurator */}
          <div className="calc-form">
            {/* Category tabs */}
            <div className="calc-tabs" role="tablist">
              {Object.entries(PRICING).map(([k, c]) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={catId === k}
                  className={`calc-tab ${catId === k ? 'active' : ''}`}
                  onClick={() => setCatId(k)}
                >
                  <span className="calc-tab-icon"><CalcIcon kind={c.icon}/></span>
                  <span className="calc-tab-label">{c.label}</span>
                </button>
              ))}
            </div>

            {/* Task picker */}
            <div className="calc-field">
              <label className="calc-label">Konkrete Leistung</label>
              <div className="calc-segmented">
                {taskList.map(([k, t]) => (
                  <button
                    key={k}
                    className={`calc-seg ${safeTaskId === k ? 'active' : ''}`}
                    onClick={() => setTaskId(k)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity (if applicable) */}
            {task.input && (
              <div className="calc-field">
                <div className="calc-label-row">
                  <label className="calc-label">{task.input.label}</label>
                  <span className="calc-qty-display">
                    <strong>{qty}</strong> {task.unit}
                  </span>
                </div>
                <input
                  type="range"
                  className="calc-range"
                  min={task.input.min}
                  max={task.input.max}
                  step={task.input.step}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                />
                <div className="calc-range-meta">
                  <span>{task.input.min} {task.unit}</span>
                  <span>{task.input.max} {task.unit}</span>
                </div>
              </div>
            )}

            {!task.input && (
              <div className="calc-field calc-flat">
                <label className="calc-label">Pauschale</label>
                <p className="calc-hint">
                  Diese Leistung wird zum Festbetrag abgerechnet — Materialkosten
                  bei Bedarf zusätzlich.
                </p>
              </div>
            )}

            {/* Urgency */}
            <div className="calc-field">
              <label className="calc-label">Dringlichkeit</label>
              <div className="calc-urgency">
                {URGENCIES.map((u) => (
                  <button
                    key={u.id}
                    className={`calc-urg ${urgency === u.id ? 'active' : ''}`}
                    onClick={() => setUrgency(u.id)}
                  >
                    <strong>{u.label}</strong>
                    <span>{u.sub}</span>
                    <em>{u.mult === 1 ? 'inkl.' : `+${Math.round((u.mult-1)*100)}%`}</em>
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="calc-field">
              <label className="calc-label">Zusatz</label>
              <div className="calc-extras">
                <label className={`calc-check ${extras.wochenende ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={extras.wochenende}
                    onChange={(e) => setExtras({...extras, wochenende: e.target.checked})}
                  />
                  <span>Wochenend- / Abendtermin</span>
                  <em>+60 €</em>
                </label>
                <label className={`calc-check ${extras.etage ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={extras.etage}
                    onChange={(e) => setExtras({...extras, etage: e.target.checked})}
                  />
                  <span>4. Etage+ ohne Aufzug</span>
                  <em>+40 €</em>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: summary */}
          <aside className="calc-summary">
            <div className="calc-sum-head">
              <span className="eyebrow">Ihr Richtwert</span>
              <h3 style={{fontSize:'15px', marginTop:8, fontWeight:500, color:'rgba(255,255,255,.7)'}}>
                {cat.label} · {task.label}
              </h3>
            </div>

            <div className="calc-price">
              <div className="calc-price-range">
                <span className="calc-price-num">{fmt(totalMin)}</span>
                <span className="calc-price-sep">–</span>
                <span className="calc-price-num">{fmt(totalMax)}</span>
                <span className="calc-price-cur">€</span>
              </div>
              <span className="calc-price-sub">inkl. MwSt. · ungefährer Richtwert</span>
            </div>

            <div className="calc-breakdown">
              <div className="calc-bd-row">
                <span>
                  {task.label}
                  {task.input && <em> · {qty} {task.unit}</em>}
                </span>
                <span>{eur(line.min)} – {eur(line.max)}</span>
              </div>
              {urgencyMult !== 1 && (
                <div className="calc-bd-row">
                  <span>{urg.label} ({urg.sub})</span>
                  <span>×{urgencyMult.toFixed(2)}</span>
                </div>
              )}
              {extras.wochenende && (
                <div className="calc-bd-row">
                  <span>Wochenend-Aufschlag</span>
                  <span>+60 €</span>
                </div>
              )}
              {extras.etage && (
                <div className="calc-bd-row">
                  <span>Etage-Aufschlag</span>
                  <span>+40 €</span>
                </div>
              )}
            </div>

            <div className="calc-actions">
              <a
                href={`https://wa.me/4915129778866?text=${whatsAppText}`}
                target="_blank"
                rel="noopener"
                className="btn btn-whats"
                style={{width:'100%', justifyContent:'center'}}
                onClick={() => setSubmitted(true)}
              >
                <Icon.WhatsApp/> Per WhatsApp anfragen
              </a>
              <a
                href="tel:+4915129778866"
                className="btn"
                style={{width:'100%', justifyContent:'center', background:'rgba(255,255,255,.08)', color:'#fff', border:'1px solid rgba(255,255,255,.18)'}}
              >
                <Icon.Phone/> Lieber anrufen
              </a>
            </div>

            <p className="calc-disclaimer">
              <Icon.Check/> Ungefährer Richtwert auf Basis typischer Aufträge. Materialkosten,
              Anfahrten außerhalb München und Sonderfälle werden separat ausgewiesen. Verbindlicher
              Festpreis nach Foto-Anfrage.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

window.Calculator = Calculator;

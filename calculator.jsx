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
        label: 'Gebäude- & Grundreinigung',
        unit: 'm²',
        per: { min: 4, max: 7 },
        base: { min: 0, max: 0 },
        input: { min: 20, max: 300, step: 5, def: 60, label: 'Wohnfläche' },
      },
      teppich: {
        label: 'Teppichreinigung',
        unit: 'm²',
        per: { min: 5, max: 9 },
        base: { min: 40, max: 60 },
        input: { min: 5, max: 120, step: 1, def: 20, label: 'Teppichfläche' },
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
    label: 'Notdienst & Sanierung',
    icon: 'wrench',
    tasks: {
      abfluss: {
        label: 'Rohr- & Kanalreinigung',
        unit: 'Pauschale',
        per: { min: 0, max: 0 },
        base: { min: 90, max: 180 },
        input: null,
      },
      schimmel: {
        label: 'Schimmelentfernung',
        unit: 'm²',
        per: { min: 25, max: 60 },
        base: { min: 80, max: 120 },
        input: { min: 1, max: 30, step: 1, def: 3, label: 'Befallene Fläche' },
      },
      trocknung: {
        label: 'Bautrocknung (Wasserschaden)',
        unit: 'Tag',
        per: { min: 40, max: 70 }, // Gerät/Tag
        base: { min: 120, max: 200 }, // Anfahrt & Aufbau
        input: { min: 1, max: 30, step: 1, def: 5, label: 'Trocknungsdauer' },
      },
    },
  },
  montage: {
    label: 'Einbau & Montage',
    icon: 'drill',
    tasks: {
      moebel: {
        label: 'Möbel & Regale aufbauen',
        unit: 'Möbelstück',
        per: { min: 30, max: 60 },
        base: { min: 40, max: 60 },
        input: { min: 1, max: 15, step: 1, def: 2, label: 'Möbelstücke' },
      },
      fenster: {
        label: 'Fenster / Türen einbauen',
        unit: 'Stück',
        per: { min: 120, max: 350 },
        base: { min: 80, max: 120 },
        input: { min: 1, max: 10, step: 1, def: 1, label: 'Anzahl' },
      },
      trockenbau: {
        label: 'Trockenbau (Wand / Decke)',
        unit: 'm²',
        per: { min: 35, max: 70 },
        base: { min: 100, max: 150 },
        input: { min: 2, max: 100, step: 1, def: 12, label: 'Fläche' },
      },
    },
  },
  renovierung: {
    label: 'Renovierung & Böden',
    icon: 'roller',
    tasks: {
      maler: {
        label: 'Malerarbeiten (Wand & Decke)',
        unit: 'm² Wandfläche',
        per: { min: 8, max: 18 },
        base: { min: 80, max: 120 },
        input: { min: 10, max: 400, step: 5, def: 80, label: 'Wandfläche' },
      },
      boden: {
        label: 'Boden verlegen (Laminat, Vinyl, PVC)',
        unit: 'm²',
        per: { min: 15, max: 35 },
        base: { min: 80, max: 120 },
        input: { min: 5, max: 200, step: 5, def: 30, label: 'Bodenfläche' },
      },
      parkett: {
        label: 'Fertigparkett schwimmend verlegen (ohne Material)',
        unit: 'm²',
        per: { min: 20, max: 40 },
        base: { min: 80, max: 120 },
        input: { min: 5, max: 200, step: 5, def: 30, label: 'Bodenfläche' },
      },
    },
  },
};

const URGENCIES = [
  { id: 'normal', mult: 1.0 },
  { id: 'express', mult: 1.2 },
];

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

  const { c, lang } = useI18n();
  const cc = c.calc;
  const nf = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', { maximumFractionDigits: 0 });
  const fmt = (n) => nf.format(Math.round(n));
  const eur = (n) => `${fmt(n)} €`;

  const cat = PRICING[catId];
  // Guard against stale taskId from a previous category — the useEffect that
  // resets taskId runs AFTER render, so we resolve a safe key inline.
  const safeTaskId = cat.tasks[taskId] ? taskId : Object.keys(cat.tasks)[0];
  const task = cat.tasks[safeTaskId];
  const urgIdx = URGENCIES.findIndex(u => u.id === urgency);
  const urg = URGENCIES[urgIdx];
  // translated labels for current category/task/urgency
  const catT = cc.cats[catId];
  const taskT = catT.tasks[safeTaskId];
  const urgT = cc.urgencies[urgIdx];

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

  const w = cc.wa;
  const whatsAppText = encodeURIComponent(
    `${w.greeting}\n\n` +
    `${w.leistung}: ${catT.label} — ${taskT.label}\n` +
    (task.input ? `${taskT.inputLabel}: ${qty} ${taskT.unit}\n` : `${w.umfang}: ${taskT.unit}\n`) +
    `${w.dringlichkeit}: ${urgT.label} (${urgT.sub})\n` +
    (extras.wochenende ? `${w.zeitfenster}\n` : '') +
    (extras.etage ? `${w.zugang}\n` : '') +
    `\n${w.richtwert}: ${eur(totalMin)} – ${eur(totalMax)}\n` +
    `\n${w.schluss}`
  );

  const taskList = Object.entries(cat.tasks);

  return (
    <section id="kostenrechner" data-screen-label="Kostenrechner">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{cc.eyebrow}</span>
            <h2>{cc.h2a}<br/>{cc.h2b}</h2>
          </div>
          <div className="lead">
            <p>{cc.lead}</p>
          </div>
        </div>

        <div className="calc">
          {/* LEFT: configurator */}
          <div className="calc-form">
            {/* Category tabs */}
            <div className="calc-tabs" role="tablist">
              {Object.entries(PRICING).map(([k, cdef]) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={catId === k}
                  className={`calc-tab ${catId === k ? 'active' : ''}`}
                  onClick={() => setCatId(k)}
                >
                  <span className="calc-tab-icon"><CalcIcon kind={cdef.icon}/></span>
                  <span className="calc-tab-label">{cc.cats[k].label}</span>
                </button>
              ))}
            </div>

            {/* Task picker */}
            <div className="calc-field">
              <label className="calc-label">{cc.taskLabel}</label>
              <div className="calc-segmented">
                {taskList.map(([k]) => (
                  <button
                    key={k}
                    className={`calc-seg ${safeTaskId === k ? 'active' : ''}`}
                    onClick={() => setTaskId(k)}
                  >
                    {catT.tasks[k].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity (if applicable) */}
            {task.input && (
              <div className="calc-field">
                <div className="calc-label-row">
                  <label className="calc-label">{taskT.inputLabel}</label>
                  <span className="calc-qty-display">
                    <strong>{qty}</strong> {taskT.unit}
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
                  <span>{task.input.min} {taskT.unit}</span>
                  <span>{task.input.max} {taskT.unit}</span>
                </div>
              </div>
            )}

            {!task.input && (
              <div className="calc-field calc-flat">
                <label className="calc-label">{cc.flatLabel}</label>
                <p className="calc-hint">{cc.flatHint}</p>
              </div>
            )}

            {/* Urgency */}
            <div className="calc-field">
              <label className="calc-label">{cc.urgencyLabel}</label>
              <div className="calc-urgency">
                {URGENCIES.map((u, i) => (
                  <button
                    key={u.id}
                    className={`calc-urg ${urgency === u.id ? 'active' : ''}`}
                    onClick={() => setUrgency(u.id)}
                  >
                    <strong>{cc.urgencies[i].label}</strong>
                    <span>{cc.urgencies[i].sub}</span>
                    <em>{u.mult === 1 ? cc.inkl : `+${Math.round((u.mult-1)*100)}%`}</em>
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="calc-field">
              <label className="calc-label">{cc.extrasLabel}</label>
              <div className="calc-extras">
                <label className={`calc-check ${extras.wochenende ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={extras.wochenende}
                    onChange={(e) => setExtras({...extras, wochenende: e.target.checked})}
                  />
                  <span>{cc.extraWeekend}</span>
                  <em>+60 €</em>
                </label>
                <label className={`calc-check ${extras.etage ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={extras.etage}
                    onChange={(e) => setExtras({...extras, etage: e.target.checked})}
                  />
                  <span>{cc.extraFloor}</span>
                  <em>+40 €</em>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: summary */}
          <aside className="calc-summary">
            <div className="calc-sum-head">
              <span className="eyebrow">{cc.summaryEyebrow}</span>
              <h3 style={{fontSize:'15px', marginTop:8, fontWeight:500, color:'rgba(255,255,255,.7)'}}>
                {catT.label} · {taskT.label}
              </h3>
            </div>

            <div className="calc-price">
              <div className="calc-price-range">
                <span className="calc-price-num">{fmt(totalMin)}</span>
                <span className="calc-price-sep">–</span>
                <span className="calc-price-num">{fmt(totalMax)}</span>
                <span className="calc-price-cur">€</span>
              </div>
              <span className="calc-price-sub">{cc.priceSub}</span>
            </div>

            <div className="calc-breakdown">
              <div className="calc-bd-row">
                <span>
                  {taskT.label}
                  {task.input && <em> · {qty} {taskT.unit}</em>}
                </span>
                <span>{eur(line.min)} – {eur(line.max)}</span>
              </div>
              {urgencyMult !== 1 && (
                <div className="calc-bd-row">
                  <span>{urgT.label} ({urgT.sub})</span>
                  <span>×{urgencyMult.toFixed(2)}</span>
                </div>
              )}
              {extras.wochenende && (
                <div className="calc-bd-row">
                  <span>{cc.weekendSurcharge}</span>
                  <span>+60 €</span>
                </div>
              )}
              {extras.etage && (
                <div className="calc-bd-row">
                  <span>{cc.floorSurcharge}</span>
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
                <Icon.WhatsApp/> {cc.ctaWhats}
              </a>
              <a
                href="tel:+4915129778866"
                className="btn"
                style={{width:'100%', justifyContent:'center', background:'rgba(255,255,255,.08)', color:'#fff', border:'1px solid rgba(255,255,255,.18)'}}
              >
                <Icon.Phone/> {cc.ctaCall}
              </a>
            </div>

            <p className="calc-disclaimer">
              <Icon.Check/> {cc.disclaimer}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

window.Calculator = Calculator;

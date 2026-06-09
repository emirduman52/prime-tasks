// ─── Prime Tasks — i18n (DE/EN) ───────────────────────────────────────────
// Zentrales Übersetzungs-Wörterbuch + React-Context. Wird als ERSTES geladen.
// Komponenten holen den Text über  const { c, lang, setLang } = useI18n();

const STR = {
  de: {
    nav: { leistungen: 'Leistungen', kostenrechner: 'Kostenrechner', ablauf: 'Ablauf', ueberblick: 'Überblick', kontakt: 'Kontakt', cta: 'Angebot anfragen' },
    hero: {
      eyebrow: 'Handwerk & Service für Privathaushalte · Region München',
      h1a: 'Alles aus ', h1accent: 'einer Hand.', h1b: 'Fachgerecht & termintreu.',
      lead: 'Prime Tasks ist Ihr flexibler Rundum‑Service für Privathaushalte — von der Grundreinigung bis zur kompletten Renovierung. Ein Anruf, ein Team, ein fester Termin.',
      ctaWhats: 'Per WhatsApp anfragen', ctaCalc: 'Kosten berechnen',
      pills: ['Schnell vor Ort', 'Sicher & versichert', 'Zuverlässig & termintreu'],
      stats: [{ num: '24h', lbl: 'Notdienst-Reaktion' }, { num: '4+', lbl: 'Leistungs­bereiche' }, { num: '100%', lbl: 'Festpreis-Garantie' }],
      callout: 'Jetzt verfügbar', imgAlt: 'Handwerker von Prime Tasks bei der Arbeit',
    },
    services: {
      eyebrow: 'Was wir machen', h2a: 'Vier Bereiche.', h2b: 'Ein verlässlicher Ansprechpartner.',
      lead: 'Statt für jede Arbeit einen neuen Handwerker zu suchen, koordinieren wir alles intern. Das spart Zeit, Wege und Missverständnisse. Gerade für die jüngere Generation mit wenig Zeit: kein Telefon-Marathon, keine Handwerkersuche — eine kurze Nachricht per WhatsApp genügt, um den Rest kümmern wir uns.',
      cta: 'Anfragen',
      items: [
        { title: 'Haus & Reinigung', list: ['Gebäude- & Grundreinigung', 'Teppichreinigung', 'Hausmeisterdienste', 'Umzüge & Entrümpelung', 'Müllentsorgung'] },
        { title: 'Notdienst & Sanierung', list: ['Rohr- & Kanalreinigung', 'Schimmelentfernung', 'Bautrocknung bei Wasserschaden'] },
        { title: 'Einbau & Montage', list: ['Fenster, Türen & Zargen', 'Regale & Möbelaufbau', 'Trockenbau', 'Kabelverlegung (ohne Anschluss)', 'Betonbohren & -schneiden'] },
        { title: 'Renovierung & Böden', list: ['Malerarbeiten', 'Teppich-, Laminat- & PVC-Böden', 'Fertigparkett (schwimmend)', 'Holz- & Bautenschutz'] },
      ],
    },
    calc: {
      eyebrow: "Was kostet's?", h2a: 'Sofort-Richtwert.', h2b: 'Ohne Anmeldung.',
      lead: 'Wählen Sie Leistung und Umfang — Sie bekommen sofort einen ungefähren Preisrahmen. Der Festpreis kommt nach kurzer Foto-Anfrage per WhatsApp.',
      taskLabel: 'Konkrete Leistung', flatLabel: 'Pauschale',
      flatHint: 'Diese Leistung wird zum Festbetrag abgerechnet — Materialkosten bei Bedarf zusätzlich.',
      urgencyLabel: 'Dringlichkeit', extrasLabel: 'Zusatz',
      extraWeekend: 'Wochenend- / Abendtermin', extraFloor: '4. Etage+ ohne Aufzug',
      summaryEyebrow: 'Ihr Richtwert', priceSub: 'inkl. MwSt. · ungefährer Richtwert',
      weekendSurcharge: 'Wochenend-Aufschlag', floorSurcharge: 'Etage-Aufschlag',
      ctaWhats: 'Per WhatsApp anfragen', ctaCall: 'Lieber anrufen',
      inkl: 'inkl.',
      disclaimer: 'Ungefährer Richtwert auf Basis typischer Aufträge. Materialkosten, Anfahrten außerhalb München und Sonderfälle werden separat ausgewiesen. Verbindlicher Festpreis nach Foto-Anfrage.',
      urgencies: [{ label: 'Regulär', sub: 'Innerhalb 1 Woche' }, { label: 'Express', sub: '24h–48h' }],
      cats: {
        reinigung: { label: 'Haus & Reinigung', tasks: {
          grund: { label: 'Gebäude- & Grundreinigung', unit: 'm²', inputLabel: 'Wohnfläche' },
          teppich: { label: 'Teppichreinigung', unit: 'm²', inputLabel: 'Teppichfläche' },
          umzug: { label: 'Umzug (Helfer & Transport)', unit: 'h', inputLabel: 'Einsatzdauer' },
          entruempelung: { label: 'Entrümpelung & Entsorgung', unit: 'm³', inputLabel: 'Volumen' },
        } },
        notdienst: { label: 'Notdienst & Sanierung', tasks: {
          abfluss: { label: 'Rohr- & Kanalreinigung', unit: 'Pauschale' },
          schimmel: { label: 'Schimmelentfernung', unit: 'm²', inputLabel: 'Befallene Fläche' },
          trocknung: { label: 'Bautrocknung (Wasserschaden)', unit: 'Tag', inputLabel: 'Trocknungsdauer' },
        } },
        montage: { label: 'Einbau & Montage', tasks: {
          moebel: { label: 'Möbel & Regale aufbauen', unit: 'Möbelstück', inputLabel: 'Möbelstücke' },
          fenster: { label: 'Fenster / Türen einbauen', unit: 'Stück', inputLabel: 'Anzahl' },
          trockenbau: { label: 'Trockenbau (Wand / Decke)', unit: 'm²', inputLabel: 'Fläche' },
        } },
        renovierung: { label: 'Renovierung & Böden', tasks: {
          maler: { label: 'Malerarbeiten (Wand & Decke)', unit: 'm² Wandfläche', inputLabel: 'Wandfläche' },
          boden: { label: 'Boden verlegen (Laminat, Vinyl, PVC)', unit: 'm²', inputLabel: 'Bodenfläche' },
          parkett: { label: 'Fertigparkett schwimmend verlegen (ohne Material)', unit: 'm²', inputLabel: 'Bodenfläche' },
        } },
      },
      wa: { greeting: 'Hallo Prime Tasks, ich hätte gern ein Angebot:', leistung: 'Leistung', umfang: 'Umfang', dringlichkeit: 'Dringlichkeit', zeitfenster: 'Zeitfenster: Wochenende/Abend', zugang: 'Zugang: höhere Etage ohne Aufzug', richtwert: 'Ungefährer Richtwert vom Rechner', schluss: 'Bitte um Rückmeldung mit Festpreis und Termin. Danke!' },
    },
    process: {
      eyebrow: 'So arbeiten wir', h2: 'Drei Schritte. Kein Papierkrieg.',
      steps: [
        { num: '01 · ANFRAGE', h3: 'Per WhatsApp oder Anruf', p: 'Sie schicken uns Fotos und beschreiben kurz das Problem. Antwort meist innerhalb von 4 Stunden — werktags wie am Wochenende.' },
        { num: '02 · TERMIN', h3: 'Festpreis & fester Termin', p: 'Sie bekommen einen klaren Festpreis und einen konkreten Termin. Keine Stundenzettel, keine Überraschungen.' },
        { num: '03 · ERLEDIGT', h3: 'Fachgerecht ausgeführt', p: 'Unser festes Team arbeitet sauber, hinterlässt nichts und übergibt erst, wenn Sie zufrieden sind.' },
      ],
    },
    overview: {
      eyebrow: 'Alles auf einen Blick', h2a: 'Unser komplettes', h2b: 'Leistungsspektrum.',
      lead: 'Vom kurzen Einsatz bis zur kompletten Wohnungsrenovierung — für all das ist Prime Tasks Ihr fester Ansprechpartner.',
      cats: { Reinigung: 'Reinigung', Notdienst: 'Notdienst', Einbau: 'Einbau', Renovierung: 'Renovierung', 'Böden': 'Böden' },
      labels: ['Gebäudereinigung', 'Umzüge', 'Entrümpelung', 'Rohr- & Kanalreinigung', 'Schimmelentfernung', 'Bautrocknung', 'Fenster & Türen', 'Möbel & Regale', 'Trockenbau', 'Malerarbeiten', 'Laminat, Vinyl & PVC', 'Fertigparkett (schwimmend)'],
    },
    values: [
      { k: 'Schnell', p: 'Antwort auf Anfragen meist innerhalb von 4 Stunden. Bei Notdienst und akuten Fällen sind wir in der Regel innerhalb von 24 Stunden vor Ort im Münchner Stadtgebiet.' },
      { k: 'Sicher', p: 'Voll versichert, mit Festpreis-Garantie und ordentlicher Rechnung. Keine versteckten Kosten, keine Bargeld-Forderungen vor Ort.' },
      { k: 'Zuverlässig', p: 'Wir kommen zum vereinbarten Termin — pünktlich. Falls einmal etwas dazwischenkommt, melden wir uns rechtzeitig vorher.' },
    ],
    wa: {
      eyebrow: 'Direkt schreiben', h2a: 'Antwort in unter 4 Stunden —', h2b: 'direkt per WhatsApp.',
      lead: 'Wählen Sie Ihre Leistung, schicken Sie ein paar Sätze und am liebsten ein Foto direkt im Chat. Wir antworten werktags innerhalb von vier Stunden mit Festpreis und Termin.',
      composeName: 'Prime Tasks GmbH', composeStatus: 'Antwortet meist innerhalb von 4 Stunden',
      serviceLabel: 'Leistung', servicePlaceholder: 'Worum geht es?',
      nameLabel: 'Ihr Name', nameOptional: '(optional)', namePlaceholder: 'z. B. Anna Berger',
      msgLabel: 'Kurze Beschreibung', msgPlaceholder: 'Was sollen wir machen? Größe, Zeitfenster, Adresse, Besonderheiten…',
      photoHint: 'Fotos hängen Sie nach dem Öffnen direkt im Chat an — schneller als jedes Formular.',
      cta: 'Auf WhatsApp öffnen', fallbackPre: 'Kein WhatsApp?', callLink: '+49 1512 9778866 anrufen', emailLink: 'E-Mail schreiben',
      previewOnline: 'online',
      bubbleIn1: 'Hallo & willkommen bei Prime Tasks! 👋', bubbleIn2: 'Schicken Sie uns Ihre Anfrage — am besten mit ein paar Fotos. Wir melden uns mit Festpreis und Termin zurück.',
      mockInput: 'Tippen Sie auf „Auf WhatsApp öffnen" …',
      greetHello: (n) => `Hallo, hier ist ${n}.`, greetDefault: 'Hallo Prime Tasks,', leistungPrefix: 'Leistung:', wishDefault: '… ich hätte gern ein Angebot.',
      options: ['Haus & Reinigung · Gebäudereinigung', 'Haus & Reinigung · Teppichreinigung', 'Haus & Reinigung · Hausmeisterdienst', 'Haus & Reinigung · Umzug', 'Haus & Reinigung · Entrümpelung', 'Notdienst · Rohr- & Kanalreinigung', 'Notdienst · Schimmelentfernung', 'Notdienst · Bautrocknung', 'Einbau · Fenster / Türen', 'Einbau · Möbel & Regale', 'Einbau · Trockenbau', 'Einbau · Kabelverlegung', 'Renovierung · Malerarbeiten', 'Böden · Laminat / Vinyl / PVC', 'Böden · Fertigparkett (schwimmend)', 'Böden · Holz- & Bautenschutz', 'Beratung / Sonstiges'],
    },
    footer: {
      tagline: 'Ihr Rundum-Service für Privathaushalte — für Haus und Wohnung, schnell, sicher und zuverlässig.',
      h4Leistungen: 'Leistungen', h4Unternehmen: 'Unternehmen', h4Kontakt: 'Kontakt',
      leistungenLinks: ['Haus & Reinigung', 'Notdienst & Sanierung', 'Einbau & Montage', 'Renovierung & Böden'],
      unternehmenLinks: ['Ablauf', 'Überblick', 'Kontakt'],
      region: 'München & Umgebung', copyright: '© 2026 Prime Tasks GmbH', designedBy: 'Designed by',
    },
  },

  en: {
    nav: { leistungen: 'Services', kostenrechner: 'Cost calculator', ablauf: 'How it works', ueberblick: 'Overview', kontakt: 'Contact', cta: 'Request a quote' },
    hero: {
      eyebrow: 'Trades & services for private households · Munich area',
      h1a: 'Everything from ', h1accent: 'one source.', h1b: 'Expert work, on schedule.',
      lead: 'Prime Tasks is your flexible all-round service for private households — from deep cleaning to a complete renovation. One call, one team, one fixed appointment.',
      ctaWhats: 'Ask via WhatsApp', ctaCalc: 'Calculate cost',
      pills: ['Fast on site', 'Insured & safe', 'Reliable & punctual'],
      stats: [{ num: '24h', lbl: 'Emergency response' }, { num: '4+', lbl: 'Service areas' }, { num: '100%', lbl: 'Fixed-price guarantee' }],
      callout: 'Available now', imgAlt: 'A Prime Tasks tradesperson at work',
    },
    services: {
      eyebrow: 'What we do', h2a: 'Four areas.', h2b: 'One reliable partner.',
      lead: 'Instead of hunting for a new tradesperson for every job, we coordinate everything in-house. That saves time, trips and misunderstandings. Especially handy for the younger generation with little time: no phone marathon, no searching for tradespeople — a short WhatsApp message is enough, and we take care of the rest.',
      cta: 'Enquire',
      items: [
        { title: 'Home & Cleaning', list: ['Building & deep cleaning', 'Carpet cleaning', 'Caretaker services', 'Removals & clearance', 'Waste disposal'] },
        { title: 'Emergency & Restoration', list: ['Pipe & drain cleaning', 'Mould removal', 'Structural drying after water damage'] },
        { title: 'Installation & Assembly', list: ['Windows, doors & frames', 'Shelves & furniture assembly', 'Drywall construction', 'Cable laying (without connection)', 'Concrete drilling & cutting'] },
        { title: 'Renovation & Flooring', list: ['Painting', 'Carpet, laminate & PVC floors', 'Engineered parquet (floating)', 'Wood & building protection'] },
      ],
    },
    calc: {
      eyebrow: 'What does it cost?', h2a: 'Instant estimate.', h2b: 'No sign-up.',
      lead: 'Pick a service and the scope — you get an approximate price range right away. The fixed price follows after a quick photo enquiry via WhatsApp.',
      taskLabel: 'Specific service', flatLabel: 'Flat rate',
      flatHint: 'This service is billed at a fixed rate — material costs added if required.',
      urgencyLabel: 'Urgency', extrasLabel: 'Extras',
      extraWeekend: 'Weekend / evening appointment', extraFloor: '4th floor+ without lift',
      summaryEyebrow: 'Your estimate', priceSub: 'incl. VAT · approximate estimate',
      weekendSurcharge: 'Weekend surcharge', floorSurcharge: 'Floor surcharge',
      ctaWhats: 'Ask via WhatsApp', ctaCall: 'Rather call us',
      inkl: 'incl.',
      disclaimer: 'Approximate estimate based on typical jobs. Material costs, travel outside Munich and special cases are shown separately. Binding fixed price after a photo enquiry.',
      urgencies: [{ label: 'Regular', sub: 'Within 1 week' }, { label: 'Express', sub: '24h–48h' }],
      cats: {
        reinigung: { label: 'Home & Cleaning', tasks: {
          grund: { label: 'Building & deep cleaning', unit: 'm²', inputLabel: 'Living area' },
          teppich: { label: 'Carpet cleaning', unit: 'm²', inputLabel: 'Carpet area' },
          umzug: { label: 'Removal (helpers & transport)', unit: 'h', inputLabel: 'Duration' },
          entruempelung: { label: 'Clearance & disposal', unit: 'm³', inputLabel: 'Volume' },
        } },
        notdienst: { label: 'Emergency & Restoration', tasks: {
          abfluss: { label: 'Pipe & drain cleaning', unit: 'flat rate' },
          schimmel: { label: 'Mould removal', unit: 'm²', inputLabel: 'Affected area' },
          trocknung: { label: 'Structural drying (water damage)', unit: 'day', inputLabel: 'Drying time' },
        } },
        montage: { label: 'Installation & Assembly', tasks: {
          moebel: { label: 'Assemble furniture & shelves', unit: 'item', inputLabel: 'Furniture pieces' },
          fenster: { label: 'Install windows / doors', unit: 'pcs', inputLabel: 'Quantity' },
          trockenbau: { label: 'Drywall (wall / ceiling)', unit: 'm²', inputLabel: 'Area' },
        } },
        renovierung: { label: 'Renovation & Flooring', tasks: {
          maler: { label: 'Painting (walls & ceiling)', unit: 'm² wall area', inputLabel: 'Wall area' },
          boden: { label: 'Lay flooring (laminate, vinyl, PVC)', unit: 'm²', inputLabel: 'Floor area' },
          parkett: { label: 'Engineered parquet, floating (excl. material)', unit: 'm²', inputLabel: 'Floor area' },
        } },
      },
      wa: { greeting: 'Hi Prime Tasks, I would like a quote:', leistung: 'Service', umfang: 'Scope', dringlichkeit: 'Urgency', zeitfenster: 'Time slot: weekend/evening', zugang: 'Access: upper floor without lift', richtwert: 'Approximate estimate from the calculator', schluss: 'Please get back to me with a fixed price and appointment. Thank you!' },
    },
    process: {
      eyebrow: 'How we work', h2: 'Three steps. No paperwork.',
      steps: [
        { num: '01 · REQUEST', h3: 'Via WhatsApp or phone', p: 'Send us photos and briefly describe the problem. Reply usually within 4 hours — weekdays and weekends.' },
        { num: '02 · APPOINTMENT', h3: 'Fixed price & fixed date', p: 'You get a clear fixed price and a concrete appointment. No timesheets, no surprises.' },
        { num: '03 · DONE', h3: 'Done properly', p: 'Our dedicated team works cleanly, leaves nothing behind and only hands over when you are satisfied.' },
      ],
    },
    overview: {
      eyebrow: 'Everything at a glance', h2a: 'Our complete', h2b: 'range of services.',
      lead: 'From a quick job to a complete home renovation — for all of it, Prime Tasks is your dedicated partner.',
      cats: { Reinigung: 'Cleaning', Notdienst: 'Emergency', Einbau: 'Installation', Renovierung: 'Renovation', 'Böden': 'Flooring' },
      labels: ['Building cleaning', 'Removals', 'Clearance', 'Pipe & drain cleaning', 'Mould removal', 'Structural drying', 'Windows & doors', 'Furniture & shelves', 'Drywall', 'Painting', 'Laminate, vinyl & PVC', 'Engineered parquet (floating)'],
    },
    values: [
      { k: 'Fast', p: 'Replies to enquiries usually within 4 hours. For emergencies and urgent cases we are normally on site within 24 hours in the Munich area.' },
      { k: 'Safe', p: 'Fully insured, with a fixed-price guarantee and a proper invoice. No hidden costs, no cash demands on site.' },
      { k: 'Reliable', p: 'We arrive at the agreed time — punctually. If something ever comes up, we let you know well in advance.' },
    ],
    wa: {
      eyebrow: 'Message us directly', h2a: 'A reply in under 4 hours —', h2b: 'straight via WhatsApp.',
      lead: 'Pick your service, send us a few sentences and ideally a photo right in the chat. On weekdays we reply within four hours with a fixed price and appointment.',
      composeName: 'Prime Tasks GmbH', composeStatus: 'Usually replies within 4 hours',
      serviceLabel: 'Service', servicePlaceholder: "What's it about?",
      nameLabel: 'Your name', nameOptional: '(optional)', namePlaceholder: 'e.g. Anna Berger',
      msgLabel: 'Short description', msgPlaceholder: 'What should we do? Size, time frame, address, special notes…',
      photoHint: 'Add photos directly in the chat after opening it — faster than any form.',
      cta: 'Open in WhatsApp', fallbackPre: 'No WhatsApp?', callLink: 'Call +49 1512 9778866', emailLink: 'Send an email',
      previewOnline: 'online',
      bubbleIn1: 'Hello & welcome to Prime Tasks! 👋', bubbleIn2: 'Send us your enquiry — ideally with a few photos. We will get back to you with a fixed price and appointment.',
      mockInput: 'Tap "Open in WhatsApp" …',
      greetHello: (n) => `Hello, this is ${n}.`, greetDefault: 'Hi Prime Tasks,', leistungPrefix: 'Service:', wishDefault: '… I would like a quote.',
      options: ['Home & Cleaning · Building cleaning', 'Home & Cleaning · Carpet cleaning', 'Home & Cleaning · Caretaker service', 'Home & Cleaning · Removal', 'Home & Cleaning · Clearance', 'Emergency · Pipe & drain cleaning', 'Emergency · Mould removal', 'Emergency · Structural drying', 'Installation · Windows / doors', 'Installation · Furniture & shelves', 'Installation · Drywall', 'Installation · Cable laying', 'Renovation · Painting', 'Flooring · Laminate / vinyl / PVC', 'Flooring · Engineered parquet (floating)', 'Flooring · Wood & building protection', 'Advice / Other'],
    },
    footer: {
      tagline: 'Your all-round service for private households — for house and flat, fast, safe and reliable.',
      h4Leistungen: 'Services', h4Unternehmen: 'Company', h4Kontakt: 'Contact',
      leistungenLinks: ['Home & Cleaning', 'Emergency & Restoration', 'Installation & Assembly', 'Renovation & Flooring'],
      unternehmenLinks: ['How it works', 'Overview', 'Contact'],
      region: 'Munich & surroundings', copyright: '© 2026 Prime Tasks GmbH', designedBy: 'Designed by',
    },
  },
};

const LangContext = React.createContext({ lang: 'de', c: STR.de, setLang: () => {} });
function useI18n() { return React.useContext(LangContext); }

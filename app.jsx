// ─── Prime Tasks — App shell + Tweaks ──────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "navy",
  "accent": "orange",
  "heroVariant": "split",
  "showFab": true,
  "dense": false,
  "headingFont": "Space Grotesk"
}/*EDITMODE-END*/;

const THEMES = {
  navy: {
    name: 'Navy (Original)',
    bg: '#f6f5f1', bg2: '#ffffff', ink: '#0e1a2b', ink2: '#4a5a72', ink3: '#8593a6',
    line: '#e3e1d8', brand: '#11305c', brand2: '#1b4789',
  },
  slate: {
    name: 'Modern Slate',
    bg: '#f3f4f6', bg2: '#ffffff', ink: '#0b0f17', ink2: '#3f4756', ink3: '#7d8696',
    line: '#e5e7eb', brand: '#0f172a', brand2: '#1e293b',
  },
  warm: {
    name: 'Warm Workshop',
    bg: '#faf6ee', bg2: '#ffffff', ink: '#1c1611', ink2: '#5a4d3e', ink3: '#9a8a76',
    line: '#ebe3d2', brand: '#2b1f12', brand2: '#3e2d1c',
  },
  cobalt: {
    name: 'Bright Cobalt',
    bg: '#f5f7fb', bg2: '#ffffff', ink: '#0a0f1e', ink2: '#3e4862', ink3: '#7c87a0',
    line: '#e1e5ee', brand: '#1d4ed8', brand2: '#2563eb',
  },
};

const ACCENTS = {
  orange: { name: 'Orange', value: '#e85d2c' },
  red:    { name: 'Rot',    value: '#d22f2f' },
  amber:  { name: 'Amber',  value: '#e6a312' },
  green:  { name: 'Grün',   value: '#1f8a5b' },
};

const HEADING_FONTS = [
  'Space Grotesk',
  'Manrope',
  'Bricolage Grotesque',
  'DM Serif Display',
];

// Inject any heading font on demand (lightweight)
function ensureFont(name) {
  const id = 'gf-' + name.replace(/\W+/g,'-');
  if (document.getElementById(id)) return;
  const l = document.createElement('link');
  l.id = id; l.rel = 'stylesheet';
  l.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(l);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme variables to <html>
  useEffect(() => {
    const root = document.documentElement;
    const theme = THEMES[t.theme] || THEMES.navy;
    const accent = ACCENTS[t.accent] || ACCENTS.orange;
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--bg-2', theme.bg2);
    root.style.setProperty('--ink', theme.ink);
    root.style.setProperty('--ink-2', theme.ink2);
    root.style.setProperty('--ink-3', theme.ink3);
    root.style.setProperty('--line', theme.line);
    root.style.setProperty('--brand', theme.brand);
    root.style.setProperty('--brand-2', theme.brand2);
    root.style.setProperty('--accent', accent.value);
    ensureFont(t.headingFont);
    root.style.setProperty('--font-display', `"${t.headingFont}", ui-sans-serif, system-ui, sans-serif`);
  }, [t.theme, t.accent, t.headingFont]);

  return (
    <>
      <Nav />
      <Hero heroVariant={t.heroVariant} />
      <Services />
      <Calculator />
      <Process />
      <Gallery />
      <Values />
      <WhatsAppChatWidget />
      <Footer />
      {t.showFab && <WhatsFab />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Farb-Thema" />
        <TweakSelect
          label="Theme"
          value={t.theme}
          options={Object.entries(THEMES).map(([k, v]) => ({value: k, label: v.name}))}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakColor
          label="Akzent"
          value={ACCENTS[t.accent].value}
          options={Object.values(ACCENTS).map(a => a.value)}
          onChange={(v) => {
            const key = Object.keys(ACCENTS).find(k => ACCENTS[k].value === v) || 'orange';
            setTweak('accent', key);
          }}
        />

        <TweakSection label="Typografie" />
        <TweakSelect
          label="Display-Font"
          value={t.headingFont}
          options={HEADING_FONTS}
          onChange={(v) => setTweak('headingFont', v)}
        />

        <TweakSection label="Layout" />
        <TweakToggle
          label="WhatsApp-Button (Float)"
          value={t.showFab}
          onChange={(v) => setTweak('showFab', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

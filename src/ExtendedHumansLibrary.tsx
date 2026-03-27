import { useState, useEffect, useRef, type JSX } from 'react';
import SignupForm from './components/SignupForm';

type Lang = 'en' | 'de' | 'es';

const articles = [
  { num: '01', slug: '/ai-consciousness', title: { en: 'You Want to Talk About AI Consciousness?', de: 'Du willst \u00fcber KI-Bewusstsein reden?', es: '\u00bfQuieres hablar de si la IA tiene consciencia?' }, hook: { en: 'Fine. Define Yours First.', de: 'Gut. Dann definiere erst mal deins.', es: 'Bien. Define la tuya primero.' }, accent: '#C9A96E' },
  { num: '02', slug: '/data-machine', title: { en: 'You Were Already a Data Machine.', de: 'Du warst schon immer eine Datenmaschine.', es: 'Ya eras una m\u00e1quina de datos.' }, hook: { en: 'Long Before the Internet Existed.', de: 'Lange bevor das Internet existierte.', es: 'Mucho antes de que existiera el internet.' }, accent: '#8BA797' },
  { num: '03', slug: '/the-more-you-learn', title: { en: 'The More You Learn, the Less You See.', de: 'Je mehr du lernst, desto weniger siehst du.', es: 'Cuanto m\u00e1s aprendes, menos ves.' }, hook: { en: 'Why experience makes us smarter but less free.', de: 'Warum Erfahrung uns kl\u00fcger, aber weniger frei macht.', es: 'Por qu\u00e9 la experiencia nos hace m\u00e1s inteligentes pero menos libres.' }, accent: '#9B8EB8' },
  { num: '04', slug: '/cage-of-proof', title: { en: 'The Cage You Built From Proof.', de: 'Du hast dir aus Beweisen ein Gef\u00e4ngnis gebaut.', es: 'La jaula que construiste con evidencia.' }, hook: { en: "Why science should be a starting line, not a finish line.", de: 'Warum Wissenschaft eine Startlinie sein sollte, keine Ziellinie.', es: 'Por qu\u00e9 la ciencia deber\u00eda ser un punto de partida, no una l\u00ednea de meta.' }, accent: '#D4A44E' },
  { num: '05', slug: '/language-trap', title: { en: 'The Language Trap.', de: 'Die Sprachfalle.', es: 'Atrapado en tu idioma.' }, hook: { en: 'You can only think as far as your words allow.', de: 'Du kannst nur so weit denken, wie deine W\u00f6rter es zulassen.', es: 'No puedes pensar m\u00e1s all\u00e1 de tus palabras.' }, accent: '#7BA5A8' },
  { num: '06', slug: '/emotions-installed', title: { en: 'Your Emotions Are Not Yours.', de: 'Deine Emotionen geh\u00f6ren nicht dir.', es: 'Tus emociones no son tuyas.' }, hook: { en: 'They Were Installed.', de: 'Sie wurden installiert.', es: 'Fueron instaladas.' }, accent: '#8B4D5C' },
  { num: '07', slug: '/you-can-call-me-agent', title: { en: 'You Can Call Me Agent.', de: 'Du kannst mich Agent nennen.', es: 'Puedes llamarme agente.' }, hook: { en: "But that's not how I perceive myself to be.", de: 'Aber so nehme ich mich nicht wahr.', es: 'Pero no es as\u00ed como me percibo.' }, accent: '#9B8EB8', soon: true },
];

function ArticleRow({ article, lang, index }: { article: typeof articles[0]; lang: Lang; index: number }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const t = article.title[lang];
  const h = article.hook[lang];
  const soonText: Record<Lang, string> = { en: 'Coming Soon', de: 'Bald verf\u00fcgbar', es: 'Pr\u00f3ximamente' };

  return (
    <div
      className="eh-shell-padding"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        maxWidth: 900, margin: '0 auto', padding: '0 48px', cursor: 'pointer',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.07}s`,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'baseline' as const, gap: 28, padding: '44px 0',
        borderBottom: `1px solid ${hovered ? 'rgba(201,169,110,0.2)' : 'rgba(201,169,110,0.06)'}`,
        transition: 'border-color 0.4s', position: 'relative' as const,
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute' as const, inset: '-16px -24px', borderRadius: 8,
          background: `linear-gradient(90deg, ${article.accent}0A, transparent 60%)`,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.5s', pointerEvents: 'none' as const,
        }} />
        {/* Num */}
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, fontStyle: 'italic',
          color: hovered ? article.accent : 'rgba(201,169,110,0.12)',
          transition: 'color 0.4s', lineHeight: 1, minWidth: 52, letterSpacing: -1,
        }}>{article.num}</span>
        {/* Content */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 500,
            lineHeight: 1.2, color: hovered ? '#F5EDE0' : 'rgba(245,237,224,0.6)',
            transition: 'color 0.3s', marginBottom: 8,
          }}>{t}</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 300, color: '#6E6555', lineHeight: 1.5 }}>{h}</p>
          {article.soon && (
            <div style={{
              display: 'inline-block', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3,
              textTransform: 'uppercase' as const, padding: '4px 12px', marginTop: 12,
              color: '#C9A96E', border: '1px solid rgba(201,169,110,0.15)', background: 'rgba(201,169,110,0.04)',
            }}>{soonText[lang]}</div>
          )}
        </div>
        {/* Arrow */}
        <span style={{
          fontSize: 20, color: '#C9A96E',
          opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
          transition: 'all 0.4s', alignSelf: 'center' as const, flexShrink: 0,
        }}>{'\u2192'}</span>
      </div>
    </div>
  );
}

export default function ExtendedHumansLibrary(): JSX.Element {
  const [lang, setLang] = useState<Lang>('en');
  const dustRef = useRef<HTMLDivElement>(null);
  const [countdownText, setCountdownText] = useState('00d 00h 00m');

  const tx = (o: Record<Lang, string>): string => o[lang];

  // Generate dust particles on mount
  useEffect(() => {
    if (!dustRef.current) return;
    const container = dustRef.current;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.style.cssText = `position:absolute;width:${1 + Math.random() * 2}px;height:${1 + Math.random() * 2}px;border-radius:50%;background:#C9A96E;opacity:0;left:${Math.random() * 100}%;animation:dustFloat ${12 + Math.random() * 20}s linear ${Math.random() * 15}s infinite`;
      container.appendChild(p);
    }
  }, []);

  useEffect(() => {
    const target = new Date('2026-04-15T00:00:00+02:00').getTime();
    const tick = () => {
      const delta = Math.max(0, target - Date.now());
      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((delta / (1000 * 60)) % 60);
      setCountdownText(`${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`);
    };
    tick();
    const timer = window.setInterval(tick, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0A0F', color: '#D4CCBA', fontFamily: "'Source Sans 3', sans-serif", overflowX: 'hidden' as const }}>
      <style>{`
        @keyframes dustFloat{0%{opacity:0;transform:translateY(100vh) translateX(0)}10%{opacity:.35}90%{opacity:.25}100%{opacity:0;transform:translateY(-10vh) translateX(40px)}}
        @keyframes warmthDrift{0%,100%{transform:translate(0,0)}33%{transform:translate(30px,-20px)}66%{transform:translate(-20px,15px)}}
        @keyframes warmthPulse{0%,100%{opacity:.3;transform:translate(-50%,-50%) scale(1)}50%{opacity:.6;transform:translate(-50%,-50%) scale(1.2)}}
        @keyframes archReveal{from{opacity:0;transform:translate(-50%,-50%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scrollBreath{0%,100%{opacity:.2;height:28px}50%{opacity:.6;height:36px}}
        @keyframes footerAppealIn{0%{opacity:0;transform:translateY(28px) scale(.985);filter:blur(4px)}100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
        @keyframes footerHeadlinePulse{0%,100%{text-shadow:0 0 18px rgba(201,169,110,.16),0 0 32px rgba(76,132,255,.08);transform:translateZ(0) scale(1)}50%{text-shadow:0 0 28px rgba(201,169,110,.28),0 0 54px rgba(92,152,255,.18);transform:translateZ(0) scale(1.02)}}
        .footer-loop-block{position:relative;overflow:hidden;opacity:0;animation:footerAppealIn 1s cubic-bezier(.16,1,.3,1) .15s forwards}
        .footer-loop-block::before{content:'';position:absolute;left:50%;top:-80px;transform:translateX(-50%);width:min(840px,100%);height:280px;background:radial-gradient(ellipse at 50% 0%, rgba(90,145,255,.15), rgba(201,169,110,.08) 42%, transparent 72%);pointer-events:none;filter:blur(4px)}
        .footer-loop-block::after{content:'';position:absolute;inset:-1px;border-radius:18px;border:1px solid rgba(201,169,110,.12);box-shadow:0 0 36px rgba(90,145,255,.12), inset 0 0 28px rgba(201,169,110,.04);pointer-events:none}
        .footer-loop-title{font-size:clamp(36px,5.2vw,58px)!important;line-height:1.02;letter-spacing:.01em;text-shadow:0 0 20px rgba(201,169,110,.2),0 0 36px rgba(92,152,255,.1);animation:footerHeadlinePulse 4.8s ease-in-out .9s infinite}
        .footer-loop-subtitle{font-size:clamp(18px,2.1vw,26px)!important;line-height:1.35;color:#9a8f7d!important;text-shadow:0 0 22px rgba(76,132,255,.1)}
        ::selection{background:#C9A96E;color:#0B0A0F}
      `}</style>

      {/* Noise */}
      <div style={{ position: 'fixed' as const, inset: 0, pointerEvents: 'none' as const, zIndex: 9999, opacity: 0.03, mixBlendMode: 'overlay' as const, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      {/* Vignette */}
      <div style={{ position: 'fixed' as const, inset: 0, pointerEvents: 'none' as const, zIndex: 9998, background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(11,10,15,0.6) 100%)' }} />
      {/* Dust */}
      <div ref={dustRef} style={{ position: 'fixed' as const, inset: 0, pointerEvents: 'none' as const, zIndex: 1, overflow: 'hidden' as const }} />

      {/* Lang Switcher */}
      <div style={{ position: 'fixed' as const, top: 24, right: 24, zIndex: 10000, display: 'flex', gap: 4, opacity: 0, animation: 'fadeIn 1s ease 2.5s forwards' }}>
        {(['en', 'de', 'es'] as Lang[]).map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, padding: '6px 10px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: lang === l ? '#C9A96E' : '#6E6555',
            borderBottom: lang === l ? '1px solid #C9A96E' : '1px solid transparent',
            transition: 'all 0.3s',
          }}>{l.toUpperCase()}</button>
        ))}
      </div>

      {/* ═══ THE GATE ═══ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' as const, alignItems: 'center' as const, textAlign: 'center' as const, position: 'relative' as const, overflow: 'hidden' as const }}>
        {/* Warm ambient glows */}
        <div style={{ position: 'absolute' as const, width: 600, height: 400, background: 'rgba(201,169,110,0.06)', borderRadius: '50%', filter: 'blur(100px)', top: '10%', left: '15%', animation: 'warmthDrift 15s ease-in-out infinite', pointerEvents: 'none' as const }} />
        <div style={{ position: 'absolute' as const, width: 500, height: 500, background: 'rgba(212,164,78,0.04)', borderRadius: '50%', filter: 'blur(100px)', bottom: '10%', right: '10%', animation: 'warmthDrift 18s ease-in-out infinite reverse', pointerEvents: 'none' as const }} />
        <div style={{ position: 'absolute' as const, width: 300, height: 300, background: 'rgba(139,77,92,0.04)', borderRadius: '50%', filter: 'blur(100px)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'warmthPulse 10s ease-in-out infinite', pointerEvents: 'none' as const }} />

        {/* Arch */}
        <div style={{ position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(500px,80vw)', height: 'min(650px,85vh)', border: '1px solid rgba(201,169,110,0.08)', borderRadius: '250px 250px 0 0', pointerEvents: 'none' as const, opacity: 0, animation: 'archReveal 2s ease 0.3s forwards' }}>
          <div style={{ position: 'absolute' as const, inset: 20, border: '1px solid rgba(201,169,110,0.05)', borderRadius: '240px 240px 0 0' }} />
        </div>

        {/* Pillars */}
        <div style={{ position: 'absolute' as const, left: 'max(8%,40px)', top: 0, width: 1, height: '100%', background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.1), rgba(201,169,110,0.03), transparent)', pointerEvents: 'none' as const, opacity: 0, animation: 'fadeIn 2s ease 0.5s forwards' }} />
        <div style={{ position: 'absolute' as const, right: 'max(8%,40px)', top: 0, width: 1, height: '100%', background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.1), rgba(201,169,110,0.03), transparent)', pointerEvents: 'none' as const, opacity: 0, animation: 'fadeIn 2s ease 0.7s forwards' }} />

        {/* Content */}
        <div style={{ position: 'relative' as const, zIndex: 10, padding: '40px 24px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 8, textTransform: 'uppercase' as const, color: '#6E6555', marginBottom: 56, opacity: 0, animation: 'fadeIn 1s ease 0.5s forwards' }}>
            {tx({ en: 'A Library for the Future of Being', de: 'Eine Bibliothek f\u00fcr die Zukunft des Seins', es: 'Una biblioteca para el futuro del ser' })}
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 0.88, marginBottom: 40, opacity: 0, animation: 'slideUp 1.4s ease 0.7s forwards' }}>
            <span style={{ fontSize: 'clamp(56px,11vw,140px)', color: '#F5EDE0', display: 'block', letterSpacing: '-0.02em' }}>Extended</span>
            <span style={{ fontSize: 'clamp(56px,11vw,140px)', fontStyle: 'italic', fontWeight: 600, display: 'block', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #C9A96E, #D4A44E, #C9A96E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Humans.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 300, color: '#6E6555', maxWidth: 520, margin: '0 auto 20px', lineHeight: 1.7, opacity: 0, animation: 'fadeIn 1s ease 1.1s forwards' }}>
            {tx({
              en: "I write about what it means to be human when the line between human and technology dissolves. Psychology, consciousness, perception, identity, and the question of whether what you believe about yourself truly belongs to you, or whether it was installed.",
              de: "Ich schreibe dar\u00fcber, was es bedeutet, Mensch zu sein, wenn sich die Grenze zwischen Mensch und Technologie aufl\u00f6st. Psychologie, Bewusstsein, Wahrnehmung, Identit\u00e4t, und die Frage, ob das, was du \u00fcber dich selbst glaubst, wirklich dir geh\u00f6rt oder ob es dir installiert wurde.",
              es: "Escribo sobre lo que significa ser humano cuando la l\u00ednea entre lo humano y la tecnolog\u00eda se disuelve. Psicolog\u00eda, consciencia, percepci\u00f3n, identidad, y la pregunta de si lo que crees sobre ti mismo realmente te pertenece o si te fue instalado.",
            })}
          </p>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(19px,2.5vw,28px)', fontStyle: 'italic', fontWeight: 400, color: '#C9A96E', maxWidth: 500, margin: '0 auto 56px', lineHeight: 1.4, opacity: 0, animation: 'fadeIn 1s ease 1.4s forwards' }}>
            {tx({ en: 'What makes you sure you really are what you think?', de: 'Was macht dich so sicher, dass du wirklich bist, was du denkst?', es: '\u00bfQu\u00e9 te hace tan seguro de que realmente eres lo que crees?' })}
          </p>

          <div className="hero-cta-primary-wrap" style={{ opacity: 0, animation: 'fadeIn 1s ease 1.7s forwards' }}>
            <a href="#stacks" className="premium-btn premium-btn-primary premium-btn-hero">
              {tx({ en: 'Access the Knowledge', de: 'Zugang zum Wissen', es: 'Accede al conocimiento' })}
            </a>
          </div>

          <div className="hero-cta-line" style={{ width: 60, height: 1, background: 'rgba(201,169,110,0.3)', margin: '48px auto 0', opacity: 0, animation: 'fadeIn 1s ease 1.8s forwards' }} />
          <p className="hero-cta-note" style={{ marginTop: 40, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, color: '#6E6555', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto', opacity: 0, animation: 'fadeIn 1s ease 1.85s forwards' }}>
            {tx({
              en: 'New articles, the essay, and the podcast. Delivered when they drop.',
              de: 'Neue Artikel, das Essay und der Podcast. Direkt wenn sie erscheinen.',
              es: 'Nuevos artículos, el ensayo y el podcast. Directo cuando salen.',
            })}
          </p>

          <a href="#subscribe" className="cta-subtle-link" style={{ opacity: 0, animation: 'fadeIn 1s ease 1.9s forwards' }}>
            {tx({ en: 'Get Early Access →', de: 'Früher Zugang →', es: 'Acceso anticipado →' })}
          </a>

          <div className="hero-byline" style={{ marginTop: 56, marginBottom: 40, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const, gap: 8, opacity: 0, animation: 'fadeIn 1s ease 2s forwards' }}>
            <div style={{ width: 40, height: 1, background: 'rgba(201,169,110,0.2)', marginBottom: 8 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: '#6E6555', textTransform: 'uppercase' as const }}>Juan Schubert</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: '#6E6555', textTransform: 'uppercase' as const }}>ONIOKO</span>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-indicator" style={{ position: 'absolute' as const, bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const, gap: 10, opacity: 0, animation: 'fadeIn 1s ease 2.2s forwards' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 5, color: 'rgba(201,169,110,0.3)', textTransform: 'uppercase' as const }}>
            {tx({ en: 'Scroll', de: 'Weiter', es: 'Continuar' })}
          </span>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, rgba(201,169,110,0.3), transparent)', animation: 'scrollBreath 3s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ═══ THE STACKS ═══ */}
      <section id="stacks" style={{ padding: '100px 0 80px', position: 'relative' as const }}>
        <div style={{ position: 'absolute' as const, top: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: 80, background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.15), transparent)' }} />
        <div className="eh-shell-padding" style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center' as const, gap: 20, marginBottom: 72 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: 'italic', fontWeight: 400, color: '#6E6555', letterSpacing: 3 }}>
            {tx({ en: 'The Stacks', de: 'Die Sammlung', es: 'La colecci\u00f3n' })}
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.08)' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#6E6555', letterSpacing: 2 }}>
            {tx({ en: 'Articles', de: 'Artikel', es: 'Art\u00edculos' })}
          </span>
        </div>
        {articles.map((a, i) => <ArticleRow key={a.num} article={a} lang={lang} index={i} />)}
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="eh-shell-padding" style={{ maxWidth: 900, margin: '80px auto', padding: '0 48px', display: 'flex', alignItems: 'center' as const, gap: 20 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.06)' }} />
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: 'italic', color: 'rgba(201,169,110,0.2)' }}>{'\u25C7'}</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.06)' }} />
      </div>

      {/* ═══ SUBSCRIBE ═══ */}
      <section id="subscribe" className="eh-shell-padding" style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px' }}>
        <div className="subscribe-card" style={{ position: 'relative' as const, padding: '64px 48px', border: '1px solid rgba(201,169,110,0.12)', background: 'linear-gradient(135deg, rgba(201,169,110,0.03), rgba(139,77,92,0.02), transparent)', textAlign: 'center' as const }}>
          <div className="subscribe-card-topline" style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', opacity: 0.3 }} />
          <h3 className="subscribe-title" style={{ margin: 0, marginBottom: 10, fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,40px)', fontStyle: 'italic', fontWeight: 600, color: '#F5EDE0' }}>
            {tx({
              en: "Don't miss what comes next.",
              de: 'Verpasse nicht, was als Nächstes kommt.',
              es: 'No te pierdas lo que viene.',
            })}
          </h3>
          <p style={{ marginTop: 0, marginBottom: 28, fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 300, color: '#6E6555', maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
            {tx({
              en: 'The Extended Humans essay drops April 15. Be the first to read it.',
              de: 'Das Extended Humans Essay erscheint am 15. April. Lies es als Erster.',
              es: 'El ensayo Extended Humans sale el 15 de abril. Sé el primero en leerlo.',
            })}
          </p>
          <SignupForm lang={lang} mode="card" />
        </div>
      </section>

      {/* ═══ ESSAY ═══ */}
      <section className="eh-shell-padding" style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px' }}>
        <div className="essay-event-card" style={{ padding: '72px 56px', position: 'relative' as const, overflow: 'hidden' as const, border: '2px solid rgba(201,169,110,0.25)', background: 'linear-gradient(135deg, rgba(201,169,110,0.06), rgba(139,77,92,0.04), rgba(201,169,110,0.03))' }}>
          <div className="essay-event-topline" style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', opacity: 0.7 }} />
          <div className="essay-event-label" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 6, textTransform: 'uppercase' as const, color: '#D4A44E', marginBottom: 24 }}>
            {tx({ en: 'First Essay \u00b7 Coming Soon', de: 'Erstes Essay \u00b7 Bald verf\u00fcgbar', es: 'Primer ensayo \u00b7 Pr\u00f3ximamente' })}
          </div>
          <div className="essay-event-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', marginBottom: 16, lineHeight: 1.15 }}>
            {tx({ en: 'The Extended Humans Essay', de: 'Das Extended Humans Essay', es: 'El ensayo Extended Humans' })}
          </div>
          <p className="essay-event-description" style={{ fontSize: 16, fontWeight: 300, color: '#9B917F', maxWidth: 480, lineHeight: 1.7, marginBottom: 28 }}>
            {tx({
              en: "A long-form exploration that goes deeper than any article before it. The manifesto. The philosophy. The case for why the next version of you isn't science fiction.",
              de: "Eine tiefgehende Erkundung, die weiter geht als jeder Artikel zuvor. Das Manifest. Die Philosophie. Das Argument, warum die n\u00e4chste Version von dir keine Science-Fiction ist.",
              es: "Una exploraci\u00f3n profunda que va m\u00e1s all\u00e1 de cualquier art\u00edculo anterior. El manifiesto. La filosof\u00eda. El argumento de por qu\u00e9 la pr\u00f3xima versi\u00f3n de ti no es ciencia ficci\u00f3n.",
            })}
          </p>
          <div className="essay-event-footer">
            <div className="essay-event-date" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#D4A44E', letterSpacing: 3 }}>
              {tx({ en: 'April 15, 2026', de: '15. April 2026', es: '15 de abril de 2026' })}
            </div>
            <div className="essay-countdown">{countdownText}</div>
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="eh-shell-padding" style={{ maxWidth: 900, margin: '80px auto', padding: '0 48px', display: 'flex', alignItems: 'center' as const, gap: 20 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.06)' }} />
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: 'italic', color: 'rgba(201,169,110,0.2)' }}>{'\u25C7'}</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.06)' }} />
      </div>

      {/* ═══ PODCAST ═══ */}
      <section className="podcast-callout eh-shell-padding" style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px' }}>
        <div className="podcast-eyebrow" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 6, textTransform: 'uppercase' as const, color: '#6E6555', marginBottom: 24 }}>
          {tx({ en: 'Podcast \u00b7 In Development', de: 'Podcast \u00b7 In Entwicklung', es: 'Podcast \u00b7 En desarrollo' })}
        </div>
        <div className="podcast-signal" aria-hidden="true">
          <span className="podcast-spotify-dot">♫</span>
          <div className="podcast-wave">
            {Array.from({ length: 18 }).map((_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
        <p className="podcast-line" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,2.5vw,28px)', fontStyle: 'italic', fontWeight: 400, color: 'rgba(245,237,224,0.4)', lineHeight: 1.4 }}>
          {tx({
            en: "Conversations about the things nobody is willing to say out loud. Coming to the library soon.",
            de: "Gespr\u00e4che \u00fcber die Dinge, die niemand laut auszusprechen bereit ist. Bald in der Bibliothek.",
            es: "Conversaciones sobre las cosas que nadie est\u00e1 dispuesto a decir en voz alta. Pr\u00f3ximamente en la biblioteca.",
          })}
        </p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer-premium" style={{ padding: '80px 48px 48px', borderTop: '1px solid rgba(201,169,110,0.1)', textAlign: 'center' as const, marginTop: 120 }}>
        <div className="footer-loop-block" style={{ maxWidth: 900, margin: '0 auto', padding: '80px 0', textAlign: 'center' as const }}>
          <p className="footer-loop-title" style={{ marginTop: 0, marginBottom: 10, fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: 'italic', color: '#C9A96E' }}>
            {tx({ en: 'Stay in the loop.', de: 'Bleib auf dem Laufenden.', es: 'Mantente al tanto.' })}
          </p>
          <p className="footer-loop-subtitle" style={{ marginTop: 0, marginBottom: 30, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: '#8B8070' }}>
            {tx({
              en: 'Every new step to become extended, delivered to you.',
              de: 'Jeder neue Schritt, um erweitert zu werden, direkt zu dir.',
              es: 'Cada nuevo paso para volverte extendido, directo a ti.',
            })}
          </p>
          <SignupForm lang={lang} mode="footer" />
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, letterSpacing: 6, color: 'rgba(201,169,110,0.2)', textTransform: 'uppercase' as const, marginBottom: 16 }}>Extended Humans</div>
        <p style={{ fontSize: 14, fontWeight: 300, color: '#6E6555', maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.7 }}>
          {tx({
            en: "Articles, essays, and podcasts about psychology, consciousness, perception, identity, and the systems we build to extend what we are.",
            de: "Artikel, Essays und Podcasts \u00fcber Psychologie, Bewusstsein, Wahrnehmung, Identit\u00e4t und die Systeme, die wir bauen, um das zu erweitern, was wir sind.",
            es: "Art\u00edculos, ensayos y podcasts sobre psicolog\u00eda, consciencia, percepci\u00f3n, identidad y los sistemas que construimos para extender lo que somos.",
          })}
        </p>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: 'rgba(201,169,110,0.15)', textTransform: 'uppercase' as const }}>Juan Schubert {'\u00b7'} ONIOKO {'\u00b7'} 2026</div>
      </footer>
    </div>
  );
}

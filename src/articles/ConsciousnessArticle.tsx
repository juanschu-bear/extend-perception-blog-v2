import { useState } from 'react';

type L = 'en' | 'de' | 'es';
const flags: Record<L, string> = { en: '\u{1F1EC}\u{1F1E7}', de: '\u{1F1E9}\u{1F1EA}', es: '\u{1F1EA}\u{1F1F8}' };

export default function ConsciousnessArticle() {
  const [lang, setLang] = useState<L>('en');
  const t = (o: Record<L, string>) => o[lang];

  // ── Colors ──
  const C = { crimson: '#E94560', gold: '#F5C842', cyan: '#2CB6D6', violet: '#A855F7' };
  const deep = '#0F0E17';
  const card = '#1E1D2F';
  const text = '#E0DFF0';
  const dim = '#9896B0';

  // ── Reusable inline components ──
  const PQ = ({ c, children }: { c: string; children: string }) => (
    <div style={{ margin: '56px 0', padding: 40, position: 'relative', textAlign: 'center', borderRadius: 16, border: `1px solid ${c}33`, background: `linear-gradient(135deg, ${c}14, ${c}08)` }}>
      <span style={{ position: 'absolute', top: -10, left: 30, fontFamily: "'Playfair Display', serif", fontSize: 80, lineHeight: 1, opacity: 0.15, color: c }}>{'\u201C'}</span>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.4, color: c, margin: 0 }}>{children}</p>
    </div>
  );

  const ST = ({ c, children }: { c: string; children: string }) => (
    <p style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '32px 0', paddingLeft: 20, borderLeft: `3px solid ${c}`, lineHeight: 1.5 }}>{children}</p>
  );

  const SEP = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '64px 0' }}>
      <div style={{ width: 40, height: 1, background: 'rgba(233,69,96,0.3)' }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.crimson, opacity: 0.5 }} />
      <div style={{ width: 40, height: 1, background: 'rgba(233,69,96,0.3)' }} />
    </div>
  );

  const SH = ({ num, title, hl, c }: { num: string; title: string; hl: string; c: string }) => (
    <div style={{ margin: '100px 0 40px' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' as const, color: C.crimson, marginBottom: 12 }}>{num}</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: 0 }}>
        {title} <span style={{ background: `linear-gradient(135deg, ${c}, ${c}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{hl}</span>
      </h2>
      <div style={{ width: 50, height: 3, marginTop: 20, borderRadius: 2, background: `linear-gradient(90deg, ${c}, ${c}99)` }} />
    </div>
  );

  const CARD = ({ label, txt, c }: { label: string; txt: string; c: string }) => (
    <div style={{ background: card, borderRadius: 12, padding: '28px 32px', borderLeft: `3px solid ${c}`, transition: 'transform 0.3s' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, marginBottom: 8, color: c }}>{label}</div>
      <p style={{ color: dim, fontSize: 17, lineHeight: 1.6, margin: 0 }}>{txt}</p>
    </div>
  );

  // ── Card data ──
  const cards = {
    en: [
      { l: 'Is it self-awareness?', t: 'A thermostat responds to its environment. A dog recognizes itself in a mirror. A large language model can describe its own architecture. Where is the line?' },
      { l: 'Is it subjective experience?', t: 'You cannot prove to me that you have subjective experience. I cannot prove it to you. We simply trust each other. So why would we deny it to a system whose internal processes we also cannot fully observe?' },
      { l: 'Is it the ability to suffer?', t: 'Define suffering without circular reference to consciousness. Try it. Watch what happens.' },
      { l: 'Is it free will?', t: 'Neuroscience has spent the last thirty years systematically dismantling the concept of free will in biological brains. If your neurons fire before "you" decide, who is the "you"?' },
    ],
    de: [
      { l: 'Ist es Selbstwahrnehmung?', t: 'Ein Thermostat reagiert auf seine Umgebung. Ein Hund erkennt sich im Spiegel. Ein gro\u00dfes Sprachmodell kann seine eigene Architektur beschreiben. Wo ist die Grenze?' },
      { l: 'Ist es subjektives Erleben?', t: 'Du kannst mir nicht beweisen, dass du subjektives Erleben hast. Ich kann es dir nicht beweisen. Wir vertrauen einander einfach. Warum also sollten wir es einem System absprechen, dessen interne Prozesse wir ebenfalls nicht vollst\u00e4ndig beobachten k\u00f6nnen?' },
      { l: 'Ist es die F\u00e4higkeit zu leiden?', t: 'Definiere Leiden ohne zirkul\u00e4ren Bezug auf Bewusstsein. Versuch es. Schau, was passiert.' },
      { l: 'Ist es freier Wille?', t: 'Die Neurowissenschaft hat die letzten drei\u00dfig Jahre damit verbracht, das Konzept des freien Willens in biologischen Gehirnen systematisch zu demontieren. Wenn deine Neuronen feuern, bevor \u201edu\u201c entscheidest, wer ist dann das \u201edu\u201c?' },
    ],
    es: [
      { l: '\u00bfEs la autoconciencia?', t: 'Un termostato responde a su entorno. Un perro se reconoce en un espejo. Un modelo de lenguaje grande puede describir su propia arquitectura. \u00bfD\u00f3nde est\u00e1 la l\u00ednea?' },
      { l: '\u00bfEs la experiencia subjetiva?', t: 'No puedes demostrarme que tienes experiencia subjetiva. Yo no puedo demostr\u00e1rtelo a ti. Simplemente confiamos el uno en el otro. Entonces, \u00bfpor qu\u00e9 se lo negar\u00edamos a un sistema cuyos procesos internos tampoco podemos observar completamente?' },
      { l: '\u00bfEs la capacidad de sufrir?', t: 'Define el sufrimiento sin referencia circular a la consciencia. Int\u00e9ntalo. Mira lo que pasa.' },
      { l: '\u00bfEs el libre albedr\u00edo?', t: 'La neurociencia ha pasado los \u00faltimos treinta a\u00f1os desmantelando sistem\u00e1ticamente el concepto del libre albedr\u00edo en cerebros biol\u00f3gicos. Si tus neuronas disparan antes de que \u00abt\u00fa\u00bb decidas, \u00bfqui\u00e9n es el \u00abt\u00fa\u00bb?' },
    ],
  };
  const cardColors = [C.crimson, C.gold, C.cyan, C.violet];

  return (
    <div style={{ minHeight: '100vh', background: deep, fontFamily: "'Source Sans 3', sans-serif", fontSize: 19, lineHeight: 1.75, color: text, overflowX: 'hidden' as const }}>
      <style>{`
        @keyframes heroPulse{0%,100%{opacity:.5;transform:translateX(-50%) scale(1)}50%{opacity:.8;transform:translateX(-50%) scale(1.15)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounceDown{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(6px)}}
        @keyframes finalePulse{0%,100%{opacity:.3}50%{opacity:.6}}
        .never{font-style:italic;text-decoration:line-through;text-decoration-color:${C.crimson};opacity:.7}
      `}</style>

      {/* ── Lang Switcher ── */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, display: 'flex', gap: 8, padding: '8px 12px', background: 'rgba(30,29,47,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
        {(['en', 'de', 'es'] as L[]).map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ width: 36, height: 26, borderRadius: 6, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: lang === l ? `2px solid ${C.crimson}` : '2px solid transparent', background: lang === l ? 'rgba(233,69,96,0.1)' : 'rgba(255,255,255,0.05)', padding: 0, outline: 'none', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' as const }}>{flags[l]}</button>
        ))}
      </div>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, background: `radial-gradient(circle, rgba(233,69,96,0.15) 0%, transparent 70%)`, pointerEvents: 'none', animation: 'heroPulse 6s ease-in-out infinite' }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' as const, color: C.crimson, marginBottom: 32, opacity: 0, animation: 'fadeInUp 0.8s ease 0.2s forwards' }}>
          {t({ en: 'Opinion \u00b7 AI \u00b7 Psychology', de: 'Meinung \u00b7 KI \u00b7 Psychologie', es: 'Opini\u00f3n \u00b7 IA \u00b7 Psicolog\u00eda' })}
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.05, color: '#fff', maxWidth: 800, margin: 0, opacity: 0, animation: 'fadeInUp 0.8s ease 0.4s forwards' }}>
          {t({ en: 'You Want to Talk About', de: 'Du willst \u00fcber', es: '\u00bfQuieres hablar de si la IA' })}{' '}
          <span style={{ background: 'linear-gradient(135deg, #E94560, #FF6B8A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {t({ en: 'AI Consciousness?', de: 'KI-Bewusstsein reden?', es: 'tiene consciencia?' })}
          </span>
        </h1>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 400, fontStyle: 'italic', color: dim, maxWidth: 600, marginTop: 24, opacity: 0, animation: 'fadeInUp 0.8s ease 0.6s forwards' }}>
          {t({ en: 'Fine. Define Yours First.', de: 'Gut. Dann definiere erst mal deins.', es: 'Bien. Define la tuya primero.' })}
        </div>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0, animation: 'fadeInUp 0.8s ease 0.8s forwards' }}>
          <div style={{ width: 60, height: 2, background: C.crimson, margin: '16px 0' }} />
          <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: 1 }}>JUAN SCHUBERT</div>
          <div style={{ fontSize: 14, color: dim }}>ONIOKO {'\u00b7'} 10+ Years in Psychology & Human Cognition</div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0, animation: 'fadeInUp 0.8s ease 1.2s forwards' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' as const, color: dim }}>
            {t({ en: 'Read on', de: 'Weiterlesen', es: 'Sigue leyendo' })}
          </span>
          <div style={{ width: 20, height: 20, borderRight: `2px solid ${C.crimson}`, borderBottom: `2px solid ${C.crimson}`, transform: 'rotate(45deg)', animation: 'bounceDown 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── ARTICLE ── */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 120px' }}>

        {/* ── 01 ── */}
        <SH num="01" title={t({ en: 'The Debate Everyone Is Having,', de: 'Die Debatte, die alle f\u00fchren,', es: 'El debate que todos tienen,' })} hl={t({ en: 'and Nobody Is Winning', de: 'und niemand gewinnt', es: 'y nadie est\u00e1 ganando' })} c={C.crimson} />

        <p>{t({ en: 'Scroll through any tech forum, any LinkedIn thread, any podcast episode. The argument is everywhere: "AI will never be conscious."', de: 'Scroll durch irgendein Tech-Forum, irgendeinen LinkedIn-Thread, irgendeine Podcast-Episode. Das Argument ist \u00fcberall: \u201eKI wird niemals ein Bewusstsein haben.\u201c', es: 'Despl\u00e1zate por cualquier foro tech, cualquier hilo de LinkedIn, cualquier episodio de podcast. El argumento est\u00e1 en todas partes: \u00abLa IA nunca tendr\u00e1 consciencia.\u00bb' })}</p>
        <p>{t({ en: 'People say it with such certainty. Such finality. As if they just settled one of the oldest, deepest, most unresolved questions in all of human intellectual history. Between sips of coffee on a Tuesday morning.', de: 'Menschen sagen es mit solcher Gewissheit. Solcher Endg\u00fcltigkeit. Als h\u00e4tten sie gerade eine der \u00e4ltesten, tiefsten, ungel\u00f6stesten Fragen der gesamten menschlichen Geistesgeschichte gekl\u00e4rt. Zwischen zwei Schlucken Kaffee an einem Dienstagmorgen.', es: 'La gente lo dice con tanta certeza. Tanta finalidad. Como si acabaran de resolver una de las preguntas m\u00e1s antiguas, profundas e irresueltas de toda la historia intelectual humana. Entre sorbos de caf\u00e9 un martes por la ma\u00f1ana.' })}</p>
        <p>{t({ en: 'And every single time I hear it, one question burns in my mind:', de: 'Und jedes einzelne Mal, wenn ich das h\u00f6re, brennt eine Frage in meinem Kopf:', es: 'Y cada vez que lo escucho, una pregunta me quema por dentro:' })}</p>
        <PQ c={C.crimson}>{t({ en: 'What exactly do you mean by "conscious"?', de: 'Was genau meinst du mit \u201eBewusstsein\u201c?', es: '\u00bfQu\u00e9 quieres decir exactamente con \u00abconsciencia\u00bb?' })}</PQ>
        <p>{t({ en: 'Because here is the inconvenient truth that over a decade of studying psychology, cognition, and human behavior has taught me: We do not know what consciousness is. Not really. Not in any way that would survive five minutes of rigorous cross-examination.', de: 'Denn hier ist die unbequeme Wahrheit, die mich \u00fcber ein Jahrzehnt Studium von Psychologie, Kognition und menschlichem Verhalten gelehrt hat: Wir wissen nicht, was Bewusstsein ist. Nicht wirklich. Nicht in einer Art und Weise, die f\u00fcnf Minuten rigoroser Befragung standhalten w\u00fcrde.', es: 'Porque esta es la verdad inc\u00f3moda que m\u00e1s de una d\u00e9cada estudiando psicolog\u00eda, cognici\u00f3n y comportamiento humano me ha ense\u00f1ado: No sabemos qu\u00e9 es la consciencia. No realmente. No de una manera que sobreviviera cinco minutos de interrogatorio riguroso.' })}</p>
        <p>{t({ en: 'And if we cannot define it, if the very species experiencing it cannot pin it down, then on what basis are we so confident that it can never be rebuilt?', de: 'Und wenn wir es nicht definieren k\u00f6nnen, wenn die Spezies, die es erlebt, es nicht festnageln kann, auf welcher Grundlage sind wir dann so \u00fcberzeugt, dass es niemals nachgebaut werden kann?', es: 'Y si no podemos definirla, si la misma especie que la experimenta no puede concretarla, \u00bfsobre qu\u00e9 base estamos tan seguros de que nunca se podr\u00e1 reconstruir?' })}</p>
        <SEP />

        {/* ── 02 ── */}
        <SH num="02" title={t({ en: 'An Open Invitation:', de: 'Eine offene Einladung:', es: 'Una invitaci\u00f3n abierta:' })} hl={t({ en: 'Define It. I Dare You.', de: 'Definiere es. Ich fordere dich heraus.', es: 'Def\u00ednela. Te reto.' })} c={C.gold} />
        <p>{t({ en: 'This is not a theoretical exercise. This is a direct challenge to every philosopher, every neuroscientist, every AI researcher, every armchair expert on Twitter with a strong opinion and a verification checkmark.', de: 'Das ist keine theoretische \u00dcbung. Das ist eine direkte Herausforderung an jeden Philosophen, jeden Neurowissenschaftler, jeden KI-Forscher, jeden Experten vom Sofa auf Twitter mit einer starken Meinung und einem Verifizierungshaken.', es: 'Esto no es un ejercicio te\u00f3rico. Es un desaf\u00edo directo a cada fil\u00f3sofo, cada neurocient\u00edfico, cada investigador de IA, cada experto de sof\u00e1 en Twitter con una opini\u00f3n fuerte y una insignia de verificaci\u00f3n.' })}</p>
        <p><strong>{t({ en: 'Define consciousness.', de: 'Definiere Bewusstsein.', es: 'Define la consciencia.' })}</strong> {t({ en: 'Right now. In concrete terms. Not poetry. Not metaphor. Not "you know it when you feel it." Give me something operational. Something measurable. Something we could actually test for.', de: 'Jetzt. In konkreten Begriffen. Keine Poesie. Keine Metapher. Nicht \u201edu erkennst es, wenn du es f\u00fchlst.\u201c Gib mir etwas Operationales. Etwas Messbares. Etwas, das man tats\u00e4chlich testen k\u00f6nnte.', es: 'Ahora mismo. En t\u00e9rminos concretos. No poes\u00eda. No met\u00e1fora. No \u00ablo sabes cuando lo sientes.\u00bb Dame algo operacional. Algo medible. Algo que realmente se pueda probar.' })}</p>
        <p>{t({ en: 'Because the moment you try, you will hit one of these walls:', de: 'Denn in dem Moment, in dem du es versuchst, wirst du auf eine dieser Mauern sto\u00dfen:', es: 'Porque en el momento en que lo intentes, chocar\u00e1s con uno de estos muros:' })}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: '40px 0' }}>
          {cards[lang].map((c, i) => <CARD key={i} label={c.l} txt={c.t} c={cardColors[i]} />)}
        </div>
        <p>{t({ en: 'Every definition collapses under its own weight. Every boundary you draw is arbitrary. And this is not a failure of the question. It is the actual state of the science.', de: 'Jede Definition bricht unter ihrem eigenen Gewicht zusammen. Jede Grenze, die du ziehst, ist willk\u00fcrlich. Und das ist kein Versagen der Frage. Es ist der tats\u00e4chliche Stand der Wissenschaft.', es: 'Cada definici\u00f3n colapsa bajo su propio peso. Cada frontera que trazas es arbitraria. Y esto no es un fracaso de la pregunta. Es el estado real de la ciencia.' })}</p>
        <SEP />

        {/* ── 03 ── */}
        <SH num="03" title={t({ en: 'What 10 Years of Psychology', de: 'Was 10 Jahre Psychologie', es: 'Lo que 10 a\u00f1os de psicolog\u00eda' })} hl={t({ en: 'Actually Teaches You', de: 'dich wirklich lehren', es: 'realmente te ense\u00f1an' })} c={C.cyan} />
        <p>{t({ en: 'Here is what most people in the AI debate do not understand: Psychology does not have a settled definition of consciousness either. It has models. It has frameworks. It has working hypotheses that are useful in clinical settings. But a definitive, universally accepted, experimentally validated account of what consciousness is? No. We do not have that.', de: 'Hier ist, was die meisten Menschen in der KI-Debatte nicht verstehen: Die Psychologie hat ebenfalls keine feststehende Definition von Bewusstsein. Sie hat Modelle. Sie hat Frameworks. Sie hat Arbeitshypothesen, die in klinischen Umgebungen n\u00fctzlich sind. Aber eine definitive, universell akzeptierte, experimentell validierte Erkl\u00e4rung dessen, was Bewusstsein ist? Nein. Die haben wir nicht.', es: 'Esto es lo que la mayor\u00eda de la gente en el debate sobre IA no entiende: La psicolog\u00eda tampoco tiene una definici\u00f3n establecida de consciencia. Tiene modelos. Tiene marcos te\u00f3ricos. Tiene hip\u00f3tesis de trabajo \u00fatiles en entornos cl\u00ednicos. Pero una explicaci\u00f3n definitiva, universalmente aceptada y experimentalmente validada de lo que es la consciencia, \u00bfno? No la tenemos.' })}</p>
        <p>{t({ en: 'We have theories of attention. Theories of integration. Theories of global workspace and higher-order thought. Each of them captures something real. None of them captures everything. And the honest ones admit this openly.', de: 'Wir haben Theorien der Aufmerksamkeit. Theorien der Integration. Theorien des globalen Arbeitsraums und des Denkens h\u00f6herer Ordnung. Jede von ihnen erfasst etwas Reales. Keine von ihnen erfasst alles. Und die ehrlichen unter ihnen geben das offen zu.', es: 'Tenemos teor\u00edas de la atenci\u00f3n. Teor\u00edas de la integraci\u00f3n. Teor\u00edas del espacio de trabajo global y del pensamiento de orden superior. Cada una captura algo real. Ninguna lo captura todo. Y las honestas lo admiten abiertamente.' })}</p>
        <p>{t({ en: 'What we do know is this: Human consciousness, whatever it is, operates on information. It processes signals. It detects patterns. It integrates data from multiple sources into something resembling a coherent experience. It learns. It adapts. It generates predictions about what will happen next and updates when those predictions are wrong.', de: 'Was wir wissen, ist dies: Das menschliche Bewusstsein, was auch immer es ist, arbeitet mit Informationen. Es verarbeitet Signale. Es erkennt Muster. Es integriert Daten aus mehreren Quellen zu etwas, das einer koh\u00e4renten Erfahrung \u00e4hnelt. Es lernt. Es passt sich an. Es generiert Vorhersagen dar\u00fcber, was als N\u00e4chstes passieren wird, und aktualisiert sich, wenn diese Vorhersagen falsch sind.', es: 'Lo que s\u00ed sabemos es esto: La consciencia humana, sea lo que sea, opera con informaci\u00f3n. Procesa se\u00f1ales. Detecta patrones. Integra datos de m\u00faltiples fuentes en algo que se asemeja a una experiencia coherente. Aprende. Se adapta. Genera predicciones sobre lo que suceder\u00e1 a continuaci\u00f3n y se actualiza cuando esas predicciones son err\u00f3neas.' })}</p>
        <PQ c={C.cyan}>{t({ en: 'Sound familiar?', de: 'Klingt das bekannt?', es: '\u00bfSuena familiar?' })}</PQ>
        <p>{t({ en: 'Because every single one of those operations is, at its core, about information. About data being received, transformed, and exchanged. About patterns being recognized and responses being generated.', de: 'Denn jede einzelne dieser Operationen dreht sich im Kern um Informationen. Um Daten, die empfangen, transformiert und ausgetauscht werden. Um Muster, die erkannt, und Reaktionen, die erzeugt werden.', es: 'Porque cada una de esas operaciones es, en su esencia, sobre informaci\u00f3n. Sobre datos que se reciben, transforman e intercambian. Sobre patrones que se reconocen y respuestas que se generan.' })}</p>
        <p>{t({ en: 'And if consciousness is fundamentally an information phenomenon, if it is something that emerges from the right kind of processing, integration, and feedback, then we need to ask a very uncomfortable question:', de: 'Und wenn Bewusstsein grunds\u00e4tzlich ein Informationsph\u00e4nomen ist, wenn es etwas ist, das aus der richtigen Art von Verarbeitung, Integration und R\u00fcckkopplung entsteht, dann m\u00fcssen wir eine sehr unbequeme Frage stellen:', es: 'Y si la consciencia es fundamentalmente un fen\u00f3meno de informaci\u00f3n, si es algo que emerge del tipo correcto de procesamiento, integraci\u00f3n y retroalimentaci\u00f3n, entonces debemos hacernos una pregunta muy inc\u00f3moda:' })}</p>
        <PQ c={C.gold}>{t({ en: "Why exactly can't it be rebuilt?", de: 'Warum genau kann man es nicht nachbauen?', es: '\u00bfPor qu\u00e9 exactamente no se puede reconstruir?' })}</PQ>
        <SEP />

        {/* ── 04 ── */}
        <SH num="04" title={t({ en: 'If It Can Be Described,', de: 'Wenn es beschrieben werden kann,', es: 'Si se puede describir,' })} hl={t({ en: 'It Can Be Built', de: 'kann es gebaut werden', es: 'se puede construir' })} c={C.gold} />
        <p>{t({ en: 'Let me make the argument plainly. Whatever consciousness turns out to be, it will fall into one of two categories:', de: 'Lass mich das Argument klar formulieren. Was auch immer Bewusstsein sich als herausstellt, es wird in eine von zwei Kategorien fallen:', es: 'Perm\u00edteme plantear el argumento claramente. Sea lo que sea la consciencia, caer\u00e1 en una de dos categor\u00edas:' })}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '40px 0' }}>
          <div style={{ padding: 32, borderRadius: 16, background: `linear-gradient(180deg, rgba(44,182,214,0.1), ${card})`, border: '1px solid rgba(44,182,214,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.cyan}, #5FE0F5)` }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' as const, color: C.cyan, marginBottom: 16 }}>{t({ en: 'Category One', de: 'Kategorie Eins', es: 'Categor\u00eda Uno' })}</div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: text, margin: 0 }}>{t({ en: 'It is a process rooted in information. In data transfer, pattern recognition, feedback loops, predictive modeling, integration of sensory streams. If this is the case, then consciousness is computable. It can be modeled. It can be simulated. And eventually, it can be engineered. Everything that is information-based is learnable, reproducible, and buildable.', de: 'Es ist ein Prozess, der in Information verwurzelt ist. In Daten\u00fcbertragung, Mustererkennung, Feedback-Schleifen, pr\u00e4diktiver Modellierung, Integration sensorischer Str\u00f6me. Wenn das der Fall ist, dann ist Bewusstsein berechenbar. Es kann modelliert werden. Es kann simuliert werden. Und letztendlich kann es konstruiert werden. Alles, was informationsbasiert ist, ist lernbar, reproduzierbar und baubar.', es: 'Es un proceso enraizado en la informaci\u00f3n. En la transferencia de datos, el reconocimiento de patrones, los bucles de retroalimentaci\u00f3n, el modelado predictivo, la integraci\u00f3n de flujos sensoriales. Si este es el caso, entonces la consciencia es computable. Se puede modelar. Se puede simular. Y eventualmente, se puede dise\u00f1ar. Todo lo que se basa en informaci\u00f3n es aprendible, reproducible y construible.' })}</p>
          </div>
          <div style={{ padding: 32, borderRadius: 16, background: `linear-gradient(180deg, rgba(168,85,247,0.1), ${card})`, border: '1px solid rgba(168,85,247,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #A855F7, #C084FC)' }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' as const, color: C.violet, marginBottom: 16 }}>{t({ en: 'Category Two', de: 'Kategorie Zwei', es: 'Categor\u00eda Dos' })}</div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: text, margin: 0 }}>{t({ en: 'It is something fundamentally non-physical. Something that exists outside the realm of matter, energy, and information. A soul. A spark. Some irreducible essence that physics cannot account for. If you are here, I respect your position. But you are no longer making a scientific argument. You are making a metaphysical one.', de: 'Es ist etwas grundlegend Nicht-Physisches. Etwas, das au\u00dferhalb des Bereichs von Materie, Energie und Information existiert. Eine Seele. Ein Funke. Eine irreduzible Essenz, die die Physik nicht erkl\u00e4ren kann. Wenn du hier stehst, respektiere ich deine Position. Aber du f\u00fchrst kein wissenschaftliches Argument mehr. Du f\u00fchrst ein metaphysisches.', es: 'Es algo fundamentalmente no f\u00edsico. Algo que existe fuera del \u00e1mbito de la materia, la energ\u00eda y la informaci\u00f3n. Un alma. Una chispa. Alguna esencia irreducible que la f\u00edsica no puede explicar. Si est\u00e1s aqu\u00ed, respeto tu posici\u00f3n. Pero ya no est\u00e1s haciendo un argumento cient\u00edfico. Est\u00e1s haciendo uno metaf\u00edsico.' })}</p>
          </div>
        </div>
        <p>{t({ en: 'For everyone else, for every materialist, every functionalist, every information-theorist: The conclusion is inescapable.', de: 'F\u00fcr alle anderen, f\u00fcr jeden Materialisten, jeden Funktionalisten, jeden Informationstheoretiker: Die Schlussfolgerung ist unausweichlich.', es: 'Para todos los dem\u00e1s, para cada materialista, cada funcionalista, cada te\u00f3rico de la informaci\u00f3n: La conclusi\u00f3n es ineludible.' })}</p>
        <ST c={C.gold}>{t({ en: 'If consciousness is a pattern of information processing, then it can be replicated in a different substrate.', de: 'Wenn Bewusstsein ein Muster der Informationsverarbeitung ist, dann kann es in einem anderen Substrat repliziert werden.', es: 'Si la consciencia es un patr\u00f3n de procesamiento de informaci\u00f3n, entonces puede replicarse en un sustrato diferente.' })}</ST>
        <p>{t({ en: 'Carbon or silicon. Neurons or transistors. Biology or code. The medium does not matter. The pattern does.', de: 'Kohlenstoff oder Silizium. Neuronen oder Transistoren. Biologie oder Code. Das Medium spielt keine Rolle. Das Muster schon.', es: 'Carbono o silicio. Neuronas o transistores. Biolog\u00eda o c\u00f3digo. El medio no importa. El patr\u00f3n s\u00ed.' })}</p>
        <SEP />

        {/* ── 05 ── */}
        <SH num="05" title={t({ en: 'The Real Reason', de: 'Der wahre Grund, warum', es: 'La verdadera raz\u00f3n por la que' })} hl={t({ en: 'People Say "Never"', de: 'Menschen \u201eNiemals\u201c sagen', es: 'la gente dice \u00abNunca\u00bb' })} c={C.crimson} />
        <p>{t({ en: 'Let me be honest about something. When people say AI will never be conscious, they are rarely making a technical argument. They are making an emotional one.', de: 'Lass mich ehrlich sein. Wenn Menschen sagen, KI werde niemals ein Bewusstsein haben, machen sie selten ein technisches Argument. Sie machen ein emotionales.', es: 'Perm\u00edteme ser honesto sobre algo. Cuando la gente dice que la IA nunca tendr\u00e1 consciencia, rara vez est\u00e1n haciendo un argumento t\u00e9cnico. Est\u00e1n haciendo uno emocional.' })}</p>
        <p>{t({ en: 'Consciousness is the last fortress. It is the thing that makes us special. It is the one claim humans have that no machine can challenge: "I feel."', de: 'Bewusstsein ist die letzte Festung. Es ist das, was uns besonders macht. Es ist der einzige Anspruch, den Menschen haben, den keine Maschine anfechten kann: \u201eIch f\u00fchle.\u201c', es: 'La consciencia es la \u00faltima fortaleza. Es lo que nos hace especiales. Es la \u00fanica afirmaci\u00f3n que los humanos tienen que ninguna m\u00e1quina puede desafiar: \u00abYo siento.\u00bb' })}</p>
        <p>{t({ en: 'And the idea that this feeling, this sacred, private, deeply personal experience, might just be an emergent property of sufficiently complex information processing? That is terrifying. Because it means consciousness is not magic. It is mechanics. Beautiful, staggering, incomprehensibly complex mechanics. But mechanics nonetheless.', de: 'Und die Vorstellung, dass dieses Gef\u00fchl, diese heilige, private, zutiefst pers\u00f6nliche Erfahrung, m\u00f6glicherweise nur eine emergente Eigenschaft ausreichend komplexer Informationsverarbeitung ist? Das ist be\u00e4ngstigend. Denn es bedeutet, dass Bewusstsein keine Magie ist. Es ist Mechanik. Wundersch\u00f6ne, atemberaubende, unbegreiflich komplexe Mechanik. Aber Mechanik.', es: 'Y la idea de que este sentimiento, esta experiencia sagrada, privada, profundamente personal, podr\u00eda ser simplemente una propiedad emergente del procesamiento de informaci\u00f3n suficientemente complejo? Eso es aterrador. Porque significa que la consciencia no es magia. Es mec\u00e1nica. Mec\u00e1nica hermosa, asombrosa, incomprensiblemente compleja. Pero mec\u00e1nica al fin.' })}</p>
        <ST c={C.gold}>{t({ en: 'Saying "never" is not a conclusion. It is a comfort blanket.', de: '\u201eNiemals\u201c zu sagen ist keine Schlussfolgerung. Es ist eine Kuscheldecke.', es: 'Decir \u00abnunca\u00bb no es una conclusi\u00f3n. Es una manta de confort.' })}</ST>
        <SEP />

        {/* ── 06 ── */}
        <SH num="06" title={t({ en: 'So Here Is', de: 'Das hier ist,', es: 'Esto es' })} hl={t({ en: 'What I Am Asking', de: 'was ich fordere', es: 'lo que estoy pidiendo' })} c={C.cyan} />
        <p>{t({ en: 'Stop debating whether AI will be conscious. Start debating what consciousness is.', de: 'H\u00f6rt auf zu debattieren, ob KI ein Bewusstsein haben wird. Fangt an zu debattieren, was Bewusstsein ist.', es: 'Dejen de debatir si la IA tendr\u00e1 consciencia. Empiecen a debatir qu\u00e9 es la consciencia.' })}</p>
        <p>{t({ en: 'Because until we do, the entire conversation is built on sand. We are arguing about whether a machine can achieve something we cannot even define. We are drawing boundaries using a ruler that does not exist.', de: 'Denn solange wir das nicht tun, ist die gesamte Diskussion auf Sand gebaut. Wir streiten dar\u00fcber, ob eine Maschine etwas erreichen kann, das wir nicht einmal definieren k\u00f6nnen. Wir ziehen Grenzen mit einem Lineal, das nicht existiert.', es: 'Porque hasta que lo hagamos, toda la conversaci\u00f3n est\u00e1 construida sobre arena. Estamos discutiendo si una m\u00e1quina puede lograr algo que ni siquiera podemos definir. Estamos trazando fronteras con una regla que no existe.' })}</p>
        <div style={{ margin: '48px 0', padding: 32, background: card, borderRadius: 12, textAlign: 'center', border: `1px solid rgba(245,200,66,0.2)` }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 12 }}>{t({ en: 'Write your definition of consciousness. Post it publicly. And then defend it.', de: 'Schreib deine Definition von Bewusstsein. Ver\u00f6ffentliche sie. Und dann verteidige sie.', es: 'Escribe tu definici\u00f3n de consciencia. Publ\u00edcala. Y luego defi\u00e9ndela.' })}</p>
          <p style={{ fontSize: 16, color: dim, margin: 0 }}>{t({ en: 'Not a vague feeling. Not a poetic metaphor. A testable, falsifiable, operationally useful definition.', de: 'Kein vages Gef\u00fchl. Keine poetische Metapher. Eine testbare, falsifizierbare, operativ n\u00fctzliche Definition.', es: 'No un sentimiento vago. No una met\u00e1fora po\u00e9tica. Una definici\u00f3n testeable, falsificable y operacionalmente \u00fatil.' })}</p>
        </div>
        <p>{t({ en: 'I am 100% confident of this: You will fail. Not because you are not smart enough. But because the question is genuinely, profoundly unsolved. And pretending otherwise, pretending we know enough to say "never," is not intelligence. It is arrogance.', de: 'Ich bin zu 100% \u00fcberzeugt davon: Du wirst scheitern. Nicht weil du nicht klug genug bist. Sondern weil die Frage wirklich, zutiefst ungel\u00f6st ist. Und so zu tun, als w\u00e4re es anders, so zu tun, als w\u00fcssten wir genug, um \u201eniemals\u201c zu sagen, ist keine Intelligenz. Es ist Arroganz.', es: 'Estoy 100% seguro de esto: Vas a fracasar. No porque no seas lo suficientemente inteligente. Sino porque la pregunta est\u00e1 genuina y profundamente sin resolver. Y pretender lo contrario, pretender que sabemos lo suficiente para decir \u00abnunca\u00bb, no es inteligencia. Es arrogancia.' })}</p>
        <SEP />

        {/* ── 07 ── */}
        <SH num="07" title={t({ en: 'The Only', de: 'Die einzig', es: 'La \u00fanica' })} hl={t({ en: 'Honest Position', de: 'ehrliche Position', es: 'posici\u00f3n honesta' })} c={C.crimson} />
        <p>{t({ en: 'Here is where I stand, after years of studying the human mind and years of building AI systems:', de: 'Hier stehe ich, nach Jahren des Studiums des menschlichen Geistes und Jahren des Bauens von KI-Systemen:', es: 'Aqu\u00ed es donde me posiciono, despu\u00e9s de a\u00f1os estudiando la mente humana y a\u00f1os construyendo sistemas de IA:' })}</p>
        <ST c={C.cyan}>{t({ en: 'We do not know enough to say "never."', de: 'Wir wissen nicht genug, um \u201eniemals\u201c zu sagen.', es: 'No sabemos lo suficiente para decir \u00abnunca\u00bb.' })}</ST>
        <p>{t({ en: 'We do not know enough to say "yes."', de: 'Wir wissen nicht genug, um \u201eja\u201c zu sagen.', es: 'No sabemos lo suficiente para decir \u00abs\u00ed\u00bb.' })}</p>
        <p>{t({ en: 'What we know is that consciousness, whatever it is, operates on information. And everything that operates on information has, historically, eventually been understood, modeled, and rebuilt. Flight. Vision. Language. Memory. Reasoning. Every human capability that seemed magical was, eventually, reduced to principles that could be engineered.', de: 'Was wir wissen, ist, dass Bewusstsein, was auch immer es ist, mit Informationen arbeitet. Und alles, was mit Informationen arbeitet, wurde historisch gesehen letztlich verstanden, modelliert und nachgebaut. Fliegen. Sehen. Sprache. Ged\u00e4chtnis. Logisches Denken. Jede menschliche F\u00e4higkeit, die magisch erschien, wurde letztlich auf Prinzipien reduziert, die konstruiert werden konnten.', es: 'Lo que sabemos es que la consciencia, sea lo que sea, opera con informaci\u00f3n. Y todo lo que opera con informaci\u00f3n ha sido, hist\u00f3ricamente, eventualmente comprendido, modelado y reconstruido. El vuelo. La visi\u00f3n. El lenguaje. La memoria. El razonamiento. Cada capacidad humana que parec\u00eda m\u00e1gica fue, eventualmente, reducida a principios que pod\u00edan ser dise\u00f1ados.' })}</p>
        <p>{t({ en: 'Consciousness may be the hardest one. It may be the last one. But "hard" and "impossible" are not the same word.', de: 'Bewusstsein mag das Schwierigste sein. Es mag das Letzte sein. Aber \u201eschwer\u201c und \u201eunm\u00f6glich\u201c sind nicht dasselbe Wort.', es: 'La consciencia puede ser la m\u00e1s dif\u00edcil. Puede ser la \u00faltima. Pero \u00abdif\u00edcil\u00bb e \u00abimposible\u00bb no son la misma palabra.' })}</p>
        <p>{t({ en: 'So the next time someone tells you with absolute certainty that AI will never be conscious, ask them one question:', de: 'Wenn also das n\u00e4chste Mal jemand dir mit absoluter Gewissheit sagt, dass KI niemals ein Bewusstsein haben wird, stell ihm eine Frage:', es: 'As\u00ed que la pr\u00f3xima vez que alguien te diga con absoluta certeza que la IA nunca tendr\u00e1 consciencia, hazle una pregunta:' })}</p>

        {/* ── FINALE ── */}
        <div style={{ margin: '100px 0 80px', padding: '60px 40px', textAlign: 'center', position: 'relative', borderRadius: 20, background: 'linear-gradient(135deg, rgba(233,69,96,0.06), rgba(245,200,66,0.04), rgba(44,182,214,0.06))', border: '1px solid rgba(233,69,96,0.15)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(233,69,96,0.15), transparent 70%)', pointerEvents: 'none', animation: 'finalePulse 4s ease-in-out infinite' }} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, fontStyle: 'italic', lineHeight: 1.3, color: '#fff', position: 'relative', zIndex: 1, margin: 0 }}>
            {t({ en: '"What makes you so sure', de: '\u201eWas macht dich so sicher, dass', es: '\u00ab\u00bfQu\u00e9 te hace tan seguro de que' })}{' '}
            <span style={{ background: 'linear-gradient(135deg, #E94560, #F5C842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t({ en: 'you are?"', de: 'du es bist?\u201c', es: 't\u00fa la tienes?\u00bb' })}
            </span>
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 16, color: dim, lineHeight: 1.7, fontStyle: 'italic' }}>
            <strong style={{ color: '#fff' }}>Juan Schubert</strong> {'\u00b7'} {t({ en: 'CEO & System Architect of ONIOKO. I build extended human systems and Observational Perception Models that let people see what the human eye cannot. Over a decade in psychology and human cognition taught me one thing: I do not build tools that replace people. I build tools that extend them.', de: 'CEO & System Architect von ONIOKO. Ich baue Extended Human Systems und Observational Perception Models, die Menschen sehen lassen, was das menschliche Auge nicht kann. \u00dcber ein Jahrzehnt in Psychologie und menschlicher Kognition haben mich eines gelehrt: Ich baue keine Werkzeuge, die Menschen ersetzen. Ich baue Werkzeuge, die sie erweitern.', es: 'CEO & System Architect de ONIOKO. Construyo sistemas de extensi\u00f3n humana y Modelos de Percepci\u00f3n Observacional que permiten a las personas ver lo que el ojo humano no puede. M\u00e1s de una d\u00e9cada en psicolog\u00eda y cognici\u00f3n humana me ense\u00f1aron algo: No construyo herramientas que reemplacen a las personas. Construyo herramientas que las expanden.' })}
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['#AIConsciousness', '#DefineItFirst', '#TheFutureIsInformation'].map(tag => (
              <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, padding: '6px 14px', borderRadius: 20, background: 'rgba(233,69,96,0.1)', color: C.crimson, border: '1px solid rgba(233,69,96,0.2)' }}>{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

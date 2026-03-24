import { useState } from 'react';

type Lang = 'en' | 'de' | 'es';

const flags = { en: '🇬🇧', de: '🇩🇪', es: '🇪🇸' };

const colors = {
  deep: '#0F0E17',
  card: '#1E1D2F',
  text: '#E0DFF0',
  dim: '#9896B0',
  crimson: '#E94560',
  gold: '#F5C842',
  cyan: '#2CB6D6',
  violet: '#A855F7',
  green: '#34D399',
  amber: '#F59E0B',
  rose: '#FB7185',
  teal: '#14B8A6',
};

function L(obj, lang) { return obj[lang] || obj.en; }

/* ── Pullquote ── */
function PQ({ text, color }) {
  return (
    <div style={{
      margin: '56px 0', padding: '40px', position: 'relative', textAlign: 'center',
      borderRadius: 16, border: `1px solid ${color}33`,
      background: `linear-gradient(135deg, ${color}14, ${color}08)`,
    }}>
      <span style={{
        position: 'absolute', top: -10, left: 30, fontFamily: "'Playfair Display', serif",
        fontSize: 80, lineHeight: 1, opacity: 0.15, color,
      }}>&ldquo;</span>
      <p style={{
        fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 28px)',
        fontWeight: 700, fontStyle: 'italic', lineHeight: 1.4, color, margin: 0,
      }}>{text}</p>
    </div>
  );
}

/* ── Statement ── */
function ST({ text, color }) {
  return (
    <p style={{
      fontSize: 22, fontWeight: 700, color: '#fff', margin: '32px 0',
      paddingLeft: 20, borderLeft: `3px solid ${color}`, lineHeight: 1.5,
    }}>{text}</p>
  );
}

/* ── Separator ── */
function Sep() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '64px 0' }}>
      <div style={{ width: 40, height: 1, background: `${colors.gold}4D` }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.gold, opacity: 0.5 }} />
      <div style={{ width: 40, height: 1, background: `${colors.gold}4D` }} />
    </div>
  );
}

/* ── Section Header ── */
function SH({ num, title, highlight, color }) {
  return (
    <div style={{ marginTop: 100, marginBottom: 40 }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: colors.gold, marginBottom: 12 }}>{num}</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: 0 }}>
        {title}{' '}<span style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{highlight}</span>
      </h2>
      <div style={{ width: 50, height: 3, marginTop: 20, borderRadius: 2, background: `linear-gradient(90deg, ${color}, ${color}99)` }} />
    </div>
  );
}

/* ── Challenge Card ── */
function Card({ label, text, color }) {
  return (
    <div style={{
      background: colors.card, borderRadius: 12, padding: '28px 32px',
      borderLeft: `3px solid ${color}`, marginBottom: 20,
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, marginBottom: 8, color }}>{label}</div>
      <p style={{ color: colors.dim, fontSize: 17, lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  );
}

/* ── Two Column ── */
function TwoCol({ leftTitle, leftText, leftColor, rightTitle, rightText, rightColor }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '40px 0' }}>
      <div style={{ padding: 32, borderRadius: 16, background: `linear-gradient(180deg, ${leftColor}1A, ${colors.card})`, border: `1px solid ${leftColor}26`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${leftColor}, ${leftColor}99)` }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: leftColor, marginBottom: 16 }}>{leftTitle}</div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: colors.text, margin: 0 }}>{leftText}</p>
      </div>
      <div style={{ padding: 32, borderRadius: 16, background: `linear-gradient(180deg, ${rightColor}1A, ${colors.card})`, border: `1px solid ${rightColor}26`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${rightColor}, ${rightColor}99)` }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: rightColor, marginBottom: 16 }}>{rightTitle}</div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: colors.text, margin: 0 }}>{rightText}</p>
      </div>
    </div>
  );
}

/* ── Timeline ── */
function Timeline({ items }) {
  const timeColors = [colors.gold, colors.cyan, colors.violet, colors.green];
  return (
    <div style={{ margin: '48px 0', position: 'relative', paddingLeft: 32 }}>
      <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${colors.gold}, ${colors.cyan}, ${colors.violet}, ${colors.green})`, borderRadius: 1 }} />
      {items.map((item, i) => (
        <div key={i} style={{ position: 'relative', marginBottom: i < items.length - 1 ? 36 : 0 }}>
          <div style={{ position: 'absolute', left: -28, top: 8, width: 12, height: 12, borderRadius: '50%', border: `2px solid ${timeColors[i]}`, background: colors.deep }} />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: timeColors[i], marginBottom: 4 }}>{item.label}</div>
          <div style={{ fontSize: 17, color: colors.text, lineHeight: 1.65 }}>{item.text}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Insight Strip ── */
function Insight({ icon, title, text, color }) {
  return (
    <div style={{ margin: '48px 0', padding: '24px 32px', borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 20, background: `linear-gradient(135deg, ${color}14, ${color}08)`, border: `1px solid ${color}26` }}>
      <span style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{icon}</span>
      <div style={{ fontSize: 17, lineHeight: 1.65, color: colors.text }}><strong style={{ color: '#fff' }}>{title}</strong> {text}</div>
    </div>
  );
}

/* ══════════════════════════════ CONTENT DATA ══════════════════════════════ */
const content = {
  s1: {
    title: { en: 'The Most Dangerous Sentence', de: 'Der gefährlichste Satz', es: 'La frase más peligrosa' },
    hl: { en: 'in Modern Culture', de: 'der modernen Kultur', es: 'de la cultura moderna' },
    p1: {
      en: 'There is a sentence that shuts down more human potential than any insult, any rejection, any failure ever could. It sounds reasonable. It sounds intelligent. It sounds like the kind of thing a smart person would say:',
      de: 'Es gibt einen Satz, der mehr menschliches Potenzial zerstört als jede Beleidigung, jede Ablehnung, jedes Scheitern es jemals könnte. Er klingt vernünftig. Er klingt intelligent. Er klingt nach etwas, das ein kluger Mensch sagen würde:',
      es: 'Hay una frase que destruye más potencial humano que cualquier insulto, cualquier rechazo, cualquier fracaso. Suena razonable. Suena inteligente. Suena como algo que diría una persona inteligente:',
    },
    pq: { en: '"Studies have shown..."', de: '„Studien haben gezeigt..."', es: '«Los estudios han demostrado...»' },
    p2: {
      en: 'The moment those three words land in a conversation, something remarkable happens. People stop thinking. They stop questioning. They stop exploring. The sentence becomes a wall, and everyone on the hearing end of it sits down obediently in front of that wall and accepts it as the boundary of what is possible.',
      de: 'In dem Moment, in dem diese drei Wörter fallen, passiert etwas Bemerkenswertes. Menschen hören auf zu denken. Sie hören auf zu hinterfragen. Sie hören auf zu erkunden. Der Satz wird zur Mauer, und jeder, der ihn hört, setzt sich gehorsam vor diese Mauer und akzeptiert sie als Grenze des Möglichen.',
      es: 'En el momento en que esas palabras aparecen en una conversación, sucede algo notable. La gente deja de pensar. Deja de cuestionar. Deja de explorar. La frase se convierte en un muro, y todos los que la escuchan se sientan obedientemente frente a ese muro y lo aceptan como el límite de lo posible.',
    },
    p3: {
      en: 'But here is a question almost nobody asks: What exactly did those studies prove? Even the best ones, with tens of thousands of participants, rigorous methodology, and peer-reviewed results, they documented what happened. They measured where we are right now. They captured the current state of human performance, knowledge, or behavior at one point in history. And that is valuable. But it is not the same as proving where the ceiling is. A study measures what is. We somehow turned that into a verdict on what can be.',
      de: 'Aber hier ist die Frage, die fast niemand stellt: Was genau haben diese Studien bewiesen? Selbst die besten, mit Zehntausenden von Teilnehmern, rigoroser Methodik und geprüften Ergebnissen: Sie haben dokumentiert, was passiert ist. Sie haben gemessen, wo wir gerade stehen. Sie haben den aktuellen Stand menschlicher Leistung, menschlichen Wissens oder Verhaltens zu einem bestimmten Zeitpunkt der Geschichte festgehalten. Und das ist wertvoll. Aber es ist nicht dasselbe wie zu beweisen, wo die Obergrenze liegt. Eine Studie misst, was ist. Wir haben daraus ein Urteil gemacht über das, was sein kann.',
      es: 'Pero hay una pregunta que casi nadie hace: ¿Qué exactamente demostraron esos estudios? Incluso los mejores, con decenas de miles de participantes, metodología rigurosa y resultados revisados por pares: Documentaron lo que ocurrió. Midieron dónde estamos ahora mismo. Capturaron el estado actual del rendimiento, conocimiento o comportamiento humano en un punto de la historia. Y eso es valioso. Pero no es lo mismo que demostrar dónde está el techo. Un estudio mide lo que es. Nosotros lo convertimos en un veredicto sobre lo que puede ser.',
    },
    st: {
      en: 'A study measures where we have been. We turned it into a wall around where we are allowed to go.',
      de: 'Eine Studie misst, wo wir waren. Wir haben daraus eine Mauer gemacht um das, wo wir hin dürfen.',
      es: 'Un estudio mide dónde hemos estado. Nosotros lo convertimos en un muro alrededor de adónde se nos permite ir.',
    },
  },
  s2: {
    title: { en: 'Science Is a Map.', de: 'Wissenschaft ist eine Landkarte.', es: 'La ciencia es un mapa.' },
    hl: { en: 'You Confused It for the Territory.', de: 'Du hast sie mit dem Gebiet verwechselt.', es: 'Tú lo confundiste con el territorio.' },
    p1: {
      en: 'Let me be clear about something before anyone calls this anti-science. It is not. Science is one of the most extraordinary achievements of the human mind. The scientific method, the discipline of testing, measuring, and falsifying, has given us everything from medicine to spaceflight. I am not questioning its value. I am questioning what we do with it. Because there is a difference between treating a scientific finding as information and treating it as law. Between saying "this is what we have observed so far" and saying "this is what is possible." Between using knowledge as a map and using it as a wall.',
      de: 'Bevor jemand das hier als wissenschaftsfeindlich bezeichnet: Das ist es nicht. Die Wissenschaft ist eine der außergewöhnlichsten Errungenschaften des menschlichen Geistes. Ich stelle nicht ihren Wert infrage. Ich stelle infrage, was wir damit machen. Denn es gibt einen Unterschied zwischen einer wissenschaftlichen Erkenntnis als Information und als Gesetz. Zwischen Wissen als Landkarte und Wissen als Mauer.',
      es: 'Antes de que alguien llame a esto anticientífico: No lo es. La ciencia es uno de los logros más extraordinarios de la mente humana. No cuestiono su valor. Cuestiono lo que hacemos con ella. Porque hay una diferencia entre tratar un hallazgo científico como información y tratarlo como ley. Entre usar el conocimiento como un mapa y usarlo como un muro.',
    },
    colL: {
      en: '"Studies show that humans can only maintain about 150 meaningful relationships." So we stop trying to connect more deeply. "Research suggests IQ is largely genetic." So we stop pushing our cognitive limits. "Evidence indicates that most startups fail." So we do not start. The finding becomes the boundary. The map becomes the cage.',
      de: '„Studien zeigen, dass Menschen nur etwa 150 bedeutsame Beziehungen pflegen können." Also hören wir auf, uns tiefer zu verbinden. „Forschung legt nahe, dass IQ größtenteils genetisch ist." Also hören wir auf, unsere kognitiven Grenzen zu verschieben. „Evidenz zeigt, dass die meisten Startups scheitern." Also fangen wir gar nicht erst an. Die Erkenntnis wird zur Grenze. Die Landkarte wird zum Käfig.',
      es: '«Los estudios muestran que los humanos solo pueden mantener unas 150 relaciones significativas.» Así que dejamos de intentar conectar más profundamente. «La investigación sugiere que el CI es mayormente genético.» Así que dejamos de empujar nuestros límites cognitivos. «La evidencia indica que la mayoría de las startups fracasan.» Así que no empezamos. El hallazgo se convierte en frontera. El mapa se convierte en jaula.',
    },
    colR: {
      en: '"Studies show 150 relationships. Interesting. What if we built tools that changed that dynamic?" "IQ is partly genetic. Okay. What about the part that is not?" "Most startups fail. Good. Now I know what patterns to avoid." The finding becomes fuel. The map becomes a launchpad.',
      de: '„Studien zeigen 150 Beziehungen. Interessant. Was, wenn wir Werkzeuge bauen, die diese Dynamik verändern?" „IQ ist teilweise genetisch. Okay. Was ist mit dem Teil, der es nicht ist?" „Die meisten Startups scheitern. Gut. Jetzt weiß ich, welche Muster ich vermeiden sollte." Die Erkenntnis wird zum Treibstoff. Die Landkarte wird zum Startplatz.',
      es: '«Los estudios muestran 150 relaciones. Interesante. ¿Y si construimos herramientas que cambien esa dinámica?» «El CI es parcialmente genético. Bien. ¿Qué pasa con la parte que no lo es?» «La mayoría de las startups fracasan. Bien. Ahora sé qué patrones evitar.» El hallazgo se convierte en combustible. El mapa se convierte en plataforma de lanzamiento.',
    },
    colLT: { en: 'Science as a Wall', de: 'Wissenschaft als Mauer', es: 'Ciencia como muro' },
    colRT: { en: 'Science as a Starting Line', de: 'Wissenschaft als Startlinie', es: 'Ciencia como punto de partida' },
  },
  s3: {
    title: { en: 'The Gatekeepers', de: 'Die Torwächter,', es: 'Los guardianes' },
    hl: { en: 'You Never Elected', de: 'die niemand gewählt hat', es: 'que nadie eligió' },
    cards: {
      en: [
        { l: 'The University Label', t: 'A finding is taken seriously if it comes from an institution with the right name on the building. The same insight, published by someone without a PhD, is dismissed as opinion. We do not evaluate the idea. We evaluate the letterhead.' },
        { l: 'The Peer Review Label', t: 'Peer review is valuable. But it is also a system where established experts judge new ideas by the standards of existing knowledge. By design, it is conservative. Breakthrough thinking, the kind that rewrites the rules, is structurally disadvantaged in a system built to validate incremental progress.' },
        { l: 'The Credential Label', t: 'You need a degree to be taken seriously. You need a title to be trusted. You need institutional backing to be heard. But credentials measure what you have learned within a system. They do not measure what you are capable of seeing beyond it.' },
        { l: 'The "Evidence-Based" Label', t: 'Evidence-based is not the same as truth-based. Evidence shows what has been measured. Truth includes what has not been measured yet. Every paradigm shift in history happened because someone pursued something that had no evidence supporting it. Until it did.' },
      ],
      de: [
        { l: 'Das Universitäts-Label', t: 'Eine Erkenntnis wird ernst genommen, wenn sie von einer Institution mit dem richtigen Namen kommt. Die gleiche Erkenntnis, veröffentlicht von jemandem ohne Doktortitel, wird als Meinung abgetan. Wir bewerten nicht die Idee. Wir bewerten den Briefkopf.' },
        { l: 'Das Peer-Review-Label', t: 'Peer Review ist wertvoll. Aber es ist auch ein System, in dem etablierte Experten neue Ideen nach den Standards bestehenden Wissens beurteilen. Bahnbrechendes Denken ist strukturell benachteiligt in einem System, das für schrittweisen Fortschritt gebaut wurde.' },
        { l: 'Das Titel-Label', t: 'Du brauchst einen Abschluss, um ernst genommen zu werden. Du brauchst einen Titel, um Vertrauen zu genießen. Aber Abschlüsse messen, was du innerhalb eines Systems gelernt hast. Sie messen nicht, was du jenseits davon sehen kannst.' },
        { l: 'Das „Evidenzbasiert"-Label', t: 'Evidenzbasiert ist nicht dasselbe wie wahrheitsbasiert. Evidenz zeigt, was gemessen wurde. Wahrheit beinhaltet auch, was noch nicht gemessen wurde. Jeder Paradigmenwechsel in der Geschichte geschah, weil jemand etwas verfolgte, für das es keine Evidenz gab. Bis es sie gab.' },
      ],
      es: [
        { l: 'La etiqueta universitaria', t: 'Un hallazgo se toma en serio si viene de una institución con el nombre correcto. La misma idea, publicada por alguien sin doctorado, se descarta como opinión. No evaluamos la idea. Evaluamos el membrete.' },
        { l: 'La etiqueta de revisión por pares', t: 'La revisión por pares es valiosa. Pero también es un sistema donde expertos establecidos juzgan nuevas ideas según los estándares del conocimiento existente. El pensamiento revolucionario está estructuralmente en desventaja en un sistema construido para validar el progreso incremental.' },
        { l: 'La etiqueta del título', t: 'Necesitas un título para ser tomado en serio. Necesitas credenciales para ser confiable. Pero las credenciales miden lo que aprendiste dentro de un sistema. No miden lo que eres capaz de ver más allá.' },
        { l: 'La etiqueta «basado en evidencia»', t: 'Basado en evidencia no es lo mismo que basado en verdad. La evidencia muestra lo que se ha medido. La verdad incluye lo que aún no se ha medido. Cada cambio de paradigma en la historia ocurrió porque alguien persiguió algo sin evidencia. Hasta que la hubo.' },
      ],
    },
    pq: {
      en: 'The most powerful prisons are the ones where the inmates believe they are free.',
      de: 'Die mächtigsten Gefängnisse sind die, in denen die Insassen glauben, sie seien frei.',
      es: 'Las prisiones más poderosas son aquellas donde los presos creen que son libres.',
    },
  },
  s4: {
    pq: {
      en: 'What is knowledge, if not information that enough people have agreed to believe?',
      de: 'Was ist Wissen, wenn nicht Information, der genug Menschen zugestimmt haben, sie zu glauben?',
      es: '¿Qué es el conocimiento, si no información con la que suficientes personas han acordado creer?',
    },
    timeline: {
      en: [
        { label: 'Consensus', text: '"Heavy objects fall faster than light ones." Accepted as absolute truth for nearly two millennia. Aristotle said it. That was enough.' },
        { label: 'Challenge', text: '"The human body is governed by exactly four humors: Blood, phlegm, yellow bile, and black bile." This was not folklore. It was medicine. Taught in the most prestigious universities in the world. For centuries.' },
        { label: 'Upheaval', text: '"Atoms are the smallest possible unit of matter." Established physics. Then we split one. Then we found quarks. Then we found quarks might not be the end either.' },
        { label: 'Today', text: '"AI will never be conscious." "Humans cannot exceed cognitive limits X, Y, Z." How many of today\'s certainties will be tomorrow\'s footnotes?' },
      ],
      de: [
        { label: 'Konsens', text: '„Schwere Objekte fallen schneller als leichte." Fast zwei Jahrtausende lang als absolute Wahrheit akzeptiert. Aristoteles hatte es gesagt. Das reichte.' },
        { label: 'Widerspruch', text: '„Der menschliche Körper wird von genau vier Körpersäften gesteuert: Blut, Schleim, gelbe und schwarze Galle." Das war keine Folklore. Das war Medizin. Gelehrt an den renommiertesten Universitäten der Welt. Jahrhundertelang.' },
        { label: 'Umbruch', text: '„Atome sind die kleinstmögliche Einheit der Materie." Etablierte Physik. Dann spalteten wir eines. Dann fanden wir Quarks. Dann stellte sich heraus, dass Quarks vielleicht auch nicht das Ende sind.' },
        { label: 'Heute', text: '„KI wird niemals ein Bewusstsein haben." „Menschen können kognitive Grenzen X, Y, Z nicht überschreiten." Wie viele der heutigen Gewissheiten werden morgen Fußnoten sein?' },
      ],
      es: [
        { label: 'Consenso', text: '«Los objetos pesados caen más rápido que los ligeros.» Aceptado como verdad absoluta durante casi dos milenios. Aristóteles lo dijo. Eso fue suficiente.' },
        { label: 'Desafío', text: '«El cuerpo humano está gobernado por exactamente cuatro humores: Sangre, flema, bilis amarilla y bilis negra.» Esto no era folclore. Era medicina. Enseñada en las universidades más prestigiosas del mundo. Durante siglos.' },
        { label: 'Transformación', text: '«Los átomos son la unidad más pequeña posible de la materia.» Física establecida. Luego dividimos uno. Luego encontramos quarks. Luego descubrimos que los quarks quizás tampoco son el final.' },
        { label: 'Hoy', text: '«La IA nunca tendrá consciencia.» «Los humanos no pueden superar los límites cognitivos X, Y, Z.» ¿Cuántas de las certezas de hoy serán las notas al pie de mañana?' },
      ],
    },
    st: {
      en: 'Knowledge is not what is true. Knowledge is what we have not yet proven wrong.',
      de: 'Wissen ist nicht, was wahr ist. Wissen ist, was wir noch nicht widerlegt haben.',
      es: 'El conocimiento no es lo que es verdad. El conocimiento es lo que aún no hemos demostrado que está equivocado.',
    },
  },
  s5: {
    pq: {
      en: 'You are not living at your limit. You are living at the limit of what has been measured so far. Those are very different places.',
      de: 'Du lebst nicht an deiner Grenze. Du lebst an der Grenze dessen, was bisher gemessen wurde. Das sind sehr verschiedene Orte.',
      es: 'No vives en tu límite. Vives en el límite de lo que se ha medido hasta ahora. Son lugares muy diferentes.',
    },
    p1: {
      en: 'The human body was "proven" incapable of running a mile in under four minutes. Until Roger Bannister did it. Then dozens of people did it within the same year. The limit was never physical. It was psychological. It was a belief, dressed up as a fact, treated as a wall. The ceiling is not where biology ends. The ceiling is where collective belief tells us to stop climbing.',
      de: 'Der menschliche Körper galt als „nachweislich" unfähig, eine Meile in unter vier Minuten zu laufen. Bis Roger Bannister es tat. Dann schafften es Dutzende im selben Jahr. Die Grenze war nie körperlich. Sie war psychologisch. Es war ein Glaube, verkleidet als Fakt, behandelt als Mauer. Die Decke ist nicht dort, wo die Biologie aufhört. Die Decke ist dort, wo der kollektive Glaube uns sagt, wir sollen aufhören zu klettern.',
      es: 'Se "demostró" que el cuerpo humano era incapaz de correr una milla en menos de cuatro minutos. Hasta que Roger Bannister lo hizo. Luego docenas de personas lo lograron en el mismo año. El límite nunca fue físico. Era psicológico. Era una creencia, disfrazada de hecho, tratada como un muro. El techo no está donde termina la biología. El techo está donde la creencia colectiva nos dice que dejemos de escalar.',
    },
  },
  s6: {
    pq: {
      en: 'What if the purpose of education was not to fill minds with what is known, but to free them for what is not?',
      de: 'Was, wenn der Zweck von Bildung nicht wäre, Köpfe mit dem zu füllen, was bekannt ist, sondern sie für das zu befreien, was es nicht ist?',
      es: '¿Y si el propósito de la educación no fuera llenar mentes con lo conocido, sino liberarlas para lo desconocido?',
    },
    st: {
      en: 'We do not lack potential. We lack permission. And the saddest part is: We are the ones withholding it from ourselves.',
      de: 'Es fehlt uns nicht an Potenzial. Es fehlt uns an Erlaubnis. Und das Traurigste daran: Wir sind es, die sie uns selbst vorenthalten.',
      es: 'No nos falta potencial. Nos falta permiso. Y lo más triste es: Somos nosotros quienes nos lo negamos.',
    },
  },
  s7: {
    st: {
      en: 'The map shows where others have walked. The territory is infinitely larger. And now, for the first time, you have tools that can help you explore it.',
      de: 'Die Karte zeigt, wo andere gelaufen sind. Das Gebiet ist unendlich größer. Und jetzt, zum ersten Mal, hast du Werkzeuge, die dir helfen können, es zu erkunden.',
      es: 'El mapa muestra dónde otros han caminado. El territorio es infinitamente más grande. Y ahora, por primera vez, tienes herramientas que pueden ayudarte a explorarlo.',
    },
  },
  s8: {
    pq: {
      en: 'You do not need permission to explore beyond the map. The map was always just a suggestion.',
      de: 'Du brauchst keine Erlaubnis, um über die Karte hinauszugehen. Die Karte war immer nur ein Vorschlag.',
      es: 'No necesitas permiso para explorar más allá del mapa. El mapa siempre fue solo una sugerencia.',
    },
    p1: {
      en: 'You do not need a degree to ask a revolutionary question. You do not need a study to test your own limits. You do not need institutional backing to think a thought that nobody has thought before. You need courage. You need the willingness to be wrong. And you need to stop waiting for someone in a lab coat to tell you what you are allowed to be.',
      de: 'Du brauchst keinen Abschluss, um eine revolutionäre Frage zu stellen. Du brauchst keine Studie, um deine eigenen Grenzen zu testen. Du brauchst keine institutionelle Rückendeckung, um einen Gedanken zu denken, den noch niemand gedacht hat. Du brauchst Mut. Du brauchst die Bereitschaft, falsch zu liegen. Und du musst aufhören, darauf zu warten, dass jemand im Laborkittel dir sagt, was du sein darfst.',
      es: 'No necesitas un título para hacer una pregunta revolucionaria. No necesitas un estudio para probar tus propios límites. No necesitas respaldo institucional para pensar un pensamiento que nadie ha pensado antes. Necesitas coraje. Necesitas la disposición a equivocarte. Y necesitas dejar de esperar a que alguien con bata de laboratorio te diga lo que tienes permiso de ser.',
    },
  },
  fin: {
    before: {
      en: 'Science tells you where the light has already fallen. Your job is to walk into the',
      de: 'Wissenschaft zeigt dir, wo das Licht bereits hingefallen ist. Deine Aufgabe ist es, ins',
      es: 'La ciencia te dice dónde ya ha caído la luz. Tu trabajo es caminar hacia la',
    },
    accent: {
      en: 'dark and make new light.',
      de: 'Dunkel zu gehen und neues Licht zu machen.',
      es: 'oscuridad y crear nueva luz.',
    },
  },
  bio: {
    en: 'CEO & System Architect of ONIOKO. I build extended human systems and Observational Perception Models that let people see what the human eye cannot. Over a decade in psychology and human cognition taught me one thing: I do not build tools that replace people. I build tools that extend them.',
    de: 'CEO & System Architect von ONIOKO. Ich baue Extended Human Systems und Observational Perception Models, die Menschen sehen lassen, was das menschliche Auge nicht kann. Über ein Jahrzehnt in Psychologie und menschlicher Kognition haben mich eines gelehrt: Ich baue keine Werkzeuge, die Menschen ersetzen. Ich baue Werkzeuge, die sie erweitern.',
    es: 'CEO & System Architect de ONIOKO. Construyo sistemas de extensión humana y Modelos de Percepción Observacional que permiten a las personas ver lo que el ojo humano no puede. Más de una década en psicología y cognición humana me enseñaron algo: No construyo herramientas que reemplacen a las personas. Construyo herramientas que las expanden.',
  },
};

const cardColors = [colors.gold, colors.cyan, colors.crimson, colors.violet];

/* ══════════════════════════════ MAIN COMPONENT ══════════════════════════════ */
export default function CageOfProof() {
  const [lang, setLang] = useState('en');

  const baseStyle = { fontFamily: "'Source Sans 3', sans-serif", fontSize: 19, lineHeight: 1.75, color: colors.text };
  const pStyle = { marginBottom: 24 };

  return (
    <div style={{ minHeight: '100vh', background: colors.deep, ...baseStyle }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap');
        @keyframes heroPulse { 0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); } 50% { opacity: 0.85; transform: translateX(-50%) scale(1.15); } }
        @keyframes bounceDown { 0%, 100% { transform: rotate(45deg) translateY(0); } 50% { transform: rotate(45deg) translateY(6px); } }
        @keyframes finalePulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
      `}</style>

      {/* ── Lang Switcher ── */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, display: 'flex', gap: 8, padding: '8px 12px', background: 'rgba(30,29,47,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
        {(['en', 'de', 'es']).map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{
            width: 36, height: 26, borderRadius: 6, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            border: lang === l ? `2px solid ${colors.gold}` : '2px solid transparent',
            background: lang === l ? `${colors.gold}1A` : 'rgba(255,255,255,0.05)',
          }}>{flags[l]}</button>
        ))}
      </div>

      {/* ── Hero ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, background: 'radial-gradient(circle, rgba(245,200,66,0.12) 0%, rgba(233,69,96,0.06) 40%, transparent 70%)', pointerEvents: 'none', animation: 'heroPulse 6s ease-in-out infinite' }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: colors.gold, marginBottom: 32 }}>
          {{ en: 'Opinion · Science · Belief · Human Potential', de: 'Meinung · Wissenschaft · Glaube · Menschliches Potenzial', es: 'Opinión · Ciencia · Creencia · Potencial Humano' }[lang]}
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 7vw, 76px)', fontWeight: 900, lineHeight: 1.05, color: '#fff', maxWidth: 850, margin: 0 }}>
          {{ en: 'The Cage You Built From ', de: 'Du hast dir aus Beweisen ein ', es: 'La jaula que construiste con ' }[lang]}
          <span style={{ background: 'linear-gradient(135deg, #F5C842, #FFD873)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {{ en: 'Proof.', de: 'Gefängnis gebaut.', es: 'evidencia.' }[lang]}
          </span>
        </h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 2.5vw, 26px)', fontStyle: 'italic', color: colors.dim, maxWidth: 640, marginTop: 28 }}>
          {{ en: 'Why science should be a starting line, not a finish line. And why we live so far beneath what we are capable of.', de: 'Warum Wissenschaft eine Startlinie sein sollte, keine Ziellinie. Und warum wir so weit unter dem leben, wozu wir fähig sind.', es: 'Por qué la ciencia debería ser un punto de partida, no una línea de meta. Y por qué vivimos tan lejos de lo que somos capaces.' }[lang]}
        </p>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, ${colors.gold}, ${colors.crimson})`, marginBottom: 16 }} />
          <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: 1 }}>JUAN SCHUBERT</div>
          <div style={{ fontSize: 14, color: colors.dim }}>ONIOKO · 10+ Years in Psychology & Human Cognition</div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: colors.dim }}>{{ en: 'Read on', de: 'Weiterlesen', es: 'Sigue leyendo' }[lang]}</span>
          <div style={{ width: 20, height: 20, borderRight: `2px solid ${colors.gold}`, borderBottom: `2px solid ${colors.gold}`, transform: 'rotate(45deg)', animation: 'bounceDown 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── Article ── */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 120px' }}>

        {/* 01 */}
        <SH num="01" title={L(content.s1.title, lang)} highlight={L(content.s1.hl, lang)} color={colors.gold} />
        <p style={pStyle}>{L(content.s1.p1, lang)}</p>
        <PQ text={L(content.s1.pq, lang)} color={colors.gold} />
        <p style={pStyle}>{L(content.s1.p2, lang)}</p>
        <p style={pStyle}>{L(content.s1.p3, lang)}</p>
        <ST text={L(content.s1.st, lang)} color={colors.gold} />
        <Sep />

        {/* 02 */}
        <SH num="02" title={L(content.s2.title, lang)} highlight={L(content.s2.hl, lang)} color={colors.cyan} />
        <p style={pStyle}>{L(content.s2.p1, lang)}</p>
        <TwoCol leftTitle={L(content.s2.colLT, lang)} leftText={L(content.s2.colL, lang)} leftColor={colors.crimson} rightTitle={L(content.s2.colRT, lang)} rightText={L(content.s2.colR, lang)} rightColor={colors.green} />
        <Sep />

        {/* 03 */}
        <SH num="03" title={L(content.s3.title, lang)} highlight={L(content.s3.hl, lang)} color={colors.crimson} />
        {content.s3.cards[lang].map((c, i) => <Card key={i} label={c.l} text={c.t} color={cardColors[i]} />)}
        <PQ text={L(content.s3.pq, lang)} color={colors.crimson} />
        <Sep />

        {/* 04 */}
        <SH num="04" title={{ en: 'Belief Is Not Knowledge.', de: 'Glaube ist nicht Wissen.', es: 'Creer no es saber.' }[lang]} highlight={{ en: 'But Neither Is Knowledge.', de: 'Aber Wissen auch nicht.', es: 'Pero saber tampoco.' }[lang]} color={colors.violet} />
        <PQ text={L(content.s4.pq, lang)} color={colors.violet} />
        <Timeline items={content.s4.timeline[lang]} />
        <ST text={L(content.s4.st, lang)} color={colors.violet} />
        <Sep />

        {/* 05 */}
        <SH num="05" title={{ en: 'How Far Behind', de: 'Wie weit hinter', es: '¿A qué distancia de' }[lang]} highlight={{ en: 'Your Potential Do You Live?', de: 'deinem Potenzial lebst du?', es: 'tu potencial estás viviendo?' }[lang]} color={colors.rose} />
        <PQ text={L(content.s5.pq, lang)} color={colors.rose} />
        <p style={pStyle}>{L(content.s5.p1, lang)}</p>
        <Insight icon="💡" title={{ en: 'The comfort trap:', de: 'Die Komfortfalle:', es: 'La trampa del confort:' }[lang]} text={{ en: 'There is a reason we accept these limits. Boundaries feel safe. If you believe you have reached your potential, you do not have to face the terrifying question of what would happen if you actually tried. "Science says so" is the most socially acceptable excuse for not pushing further.', de: 'Es gibt einen Grund, warum wir diese Grenzen akzeptieren. Grenzen fühlen sich sicher an. Wenn du glaubst, dein Potenzial erreicht zu haben, musst du dich nicht der beunruhigenden Frage stellen, was passieren würde, wenn du es wirklich versuchst. „Die Wissenschaft sagt es" ist die gesellschaftlich akzeptabelste Ausrede dafür, nicht weiterzugehen.', es: 'Hay una razón por la que aceptamos estos límites. Las fronteras se sienten seguras. Si crees que has alcanzado tu potencial, no tienes que enfrentar la aterradora pregunta de qué pasaría si realmente lo intentaras. «La ciencia lo dice» es la excusa socialmente más aceptable para no ir más lejos.' }[lang]} color={colors.rose} />
        <Sep />

        {/* 06 */}
        <SH num="06" title={{ en: 'What Would Change', de: 'Was würde sich ändern,', es: '¿Qué cambiaría' }[lang]} highlight={{ en: 'If We Taught Children Differently?', de: 'wenn wir Kinder anders unterrichten?', es: 'si enseñáramos a los niños de otra manera?' }[lang]} color={colors.green} />
        <PQ text={L(content.s6.pq, lang)} color={colors.green} />
        <ST text={L(content.s6.st, lang)} color={colors.green} />
        <Sep />

        {/* 07 */}
        <SH num="07" title={{ en: 'The Bridge', de: 'Die Brücke', es: 'El puente' }[lang]} highlight={{ en: 'Between Proof and Possibility', de: 'zwischen Beweis und Möglichkeit', es: 'entre la prueba y la posibilidad' }[lang]} color={colors.amber} />
        <Insight icon="🧭" title={{ en: 'The neutral value approach:', de: 'Der neutrale Wert:', es: 'El valor neutral:' }[lang]} text={{ en: 'When you encounter a scientific finding, try this: Receive it neutrally. "Interesting. This has been observed." Do not worship it. Do not reject it. Then ask: "What does this make possible that we have not tried yet?" That single shift, from proof as boundary to proof as starting line, changes everything.', de: 'Wenn du auf eine wissenschaftliche Erkenntnis triffst, versuch das: Nimm sie neutral auf. „Interessant. Das wurde beobachtet." Verehre es nicht. Lehne es nicht ab. Dann frag: „Was macht das möglich, das wir noch nicht versucht haben?" Diese eine Verschiebung, von Beweis als Grenze zu Beweis als Startlinie, verändert alles.', es: 'Cuando encuentres un hallazgo científico, prueba esto: Recíbelo neutralmente. «Interesante. Esto se ha observado.» No lo veneres. No lo rechaces. Luego pregunta: «¿Qué hace esto posible que aún no hemos intentado?» Ese único cambio, de prueba como frontera a prueba como punto de partida, lo cambia todo.' }[lang]} color={colors.gold} />
        <ST text={L(content.s7.st, lang)} color={colors.amber} />
        <Sep />

        {/* 08 */}
        <SH num="08" title={{ en: 'Permission', de: 'Die Erlaubnis,', es: 'El permiso' }[lang]} highlight={{ en: 'You Do Not Need', de: 'die du nicht brauchst', es: 'innecesario' }[lang]} color={colors.teal} />
        <PQ text={L(content.s8.pq, lang)} color={colors.teal} />
        <p style={pStyle}>{L(content.s8.p1, lang)}</p>

        {/* Finale */}
        <div style={{ margin: '100px 0 80px', padding: '60px 40px', textAlign: 'center', position: 'relative', borderRadius: 20, background: 'linear-gradient(135deg, rgba(245,200,66,0.06), rgba(233,69,96,0.04), rgba(168,85,247,0.06))', border: '1px solid rgba(245,200,66,0.15)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(245,200,66,0.12), transparent 70%)', pointerEvents: 'none', animation: 'finalePulse 4s ease-in-out infinite' }} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: 900, fontStyle: 'italic', lineHeight: 1.3, color: '#fff', position: 'relative', zIndex: 1, margin: 0 }}>
            {L(content.fin.before, lang)}{' '}<span style={{ background: 'linear-gradient(135deg, #F5C842, #E94560)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{L(content.fin.accent, lang)}</span>
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 16, color: colors.dim, lineHeight: 1.7, fontStyle: 'italic' }}><strong style={{ color: '#fff' }}>Juan Schubert</strong> · {L(content.bio, lang)}</p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['#TheCageOfProof', '#ScienceIsAMap', '#BeyondTheEvidence', '#HumanPotential'].map((tag) => (
              <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, padding: '6px 14px', borderRadius: 20, background: `${colors.gold}1A`, color: colors.gold, border: `1px solid ${colors.gold}33` }}>{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

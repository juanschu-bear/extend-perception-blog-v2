import { useMemo, useState, type JSX } from 'react'
import { createClient } from '@supabase/supabase-js'

type Lang = 'en' | 'de' | 'es'

type SignupFormProps = {
  lang: Lang
  compact?: boolean
}

type Status = 'idle' | 'success' | 'error' | 'loading'

const SUPABASE_URL = 'https://wofklmwbokdjoqlstjmy.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

const supabase = SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

const copy = {
  en: {
    name: 'Your name',
    email: 'Your email',
    submit: 'Get Early Access',
    compactSubmit: 'Join',
    success: "You're in.",
    error: 'Something went wrong. Try again.',
  },
  de: {
    name: 'Dein Name',
    email: 'Deine Email',
    submit: 'Früher Zugang',
    compactSubmit: 'Dabei sein',
    success: 'Du bist dabei.',
    error: 'Etwas ist schiefgelaufen. Versuch es erneut.',
  },
  es: {
    name: 'Tu nombre',
    email: 'Tu email',
    submit: 'Acceso anticipado',
    compactSubmit: 'Unirme',
    success: 'Estás dentro.',
    error: 'Algo salió mal. Inténtalo de nuevo.',
  },
} as const

export default function SignupForm({ lang, compact = false }: SignupFormProps): JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const t = useMemo(() => copy[lang], [lang])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'loading') return

    setStatus('loading')

    if (!supabase) {
      setStatus('error')
      return
    }

    const payload = {
      name: compact ? null : name.trim() || null,
      email: email.trim().toLowerCase(),
      lang,
    }

    const { error } = await supabase.from('eh_subscribers').insert(payload)

    if (error) {
      setStatus('error')
      return
    }

    setStatus('success')
    if (!compact) setName('')
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: compact ? 'row' : 'column', gap: 12, width: '100%' }}>
      {!compact && (
        <input
          type="text"
          className="signup-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.name}
          required
          style={inputStyle}
        />
      )}
      <input
        type="email"
        className="signup-input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={t.email}
        required
        style={{ ...inputStyle, flex: compact ? 1 : undefined }}
      />
      <button type="submit" className="signup-button" style={buttonStyle}>
        {status === 'loading' ? '...' : compact ? t.compactSubmit : t.submit}
      </button>
      {status === 'success' && <p style={feedbackSuccessStyle}>{t.success}</p>}
      {status === 'error' && <p style={feedbackErrorStyle}>{t.error}</p>}
    </form>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(201,169,110,0.2)',
  color: '#D4CCBA',
  padding: '12px 14px',
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: 15,
  outline: 'none',
}

const buttonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: '12px 24px',
  border: '1px solid rgba(201,169,110,0.25)',
  background: 'transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  letterSpacing: 3,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  textTransform: 'uppercase',
  color: '#C9A96E',
}

const feedbackSuccessStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: 1.2,
  color: '#C9A96E',
}

const feedbackErrorStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: 1.2,
  color: '#D98D8D',
}

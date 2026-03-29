import { useMemo, useState, type JSX } from 'react'
import { createClient } from '@supabase/supabase-js'

type Lang = 'en' | 'de' | 'es'
type Status = 'idle' | 'success' | 'error' | 'loading'

type SignupFormProps = {
  lang: Lang
  mode?: 'card' | 'footer'
}

const SUPABASE_URL = 'https://wofklmwbokdjoqlstjmy.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

const supabase = SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

const copy = {
  en: {
    name: 'Your name',
    email: 'Your email',
    joinLibrary: 'Get Early Access',
    join: 'Join',
    success: "You're in. Welcome to the library.",
    successHint: 'Please check your Promotions and Spam folder if you do not see the email in your inbox.',
    error: 'Something went wrong. Try again.',
  },
  de: {
    name: 'Dein Name',
    email: 'Deine Email',
    joinLibrary: 'Früher Zugang',
    join: 'Beitreten',
    success: 'Du bist dabei. Willkommen in der Bibliothek.',
    successHint: 'Bitte prüfe auch den Werbung- und Spam-Ordner, falls die E-Mail nicht im Posteingang ist.',
    error: 'Etwas ist schiefgelaufen. Versuch es erneut.',
  },
  es: {
    name: 'Tu nombre',
    email: 'Tu email',
    joinLibrary: 'Acceso anticipado',
    join: 'Unirte',
    success: 'Estás dentro. Bienvenido a la biblioteca.',
    successHint: 'Revisa también Promociones y Spam si el correo no aparece en tu bandeja principal.',
    error: 'Algo salió mal. Inténtalo de nuevo.',
  },
} as const

export default function SignupForm({ lang, mode = 'card' }: SignupFormProps): JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const t = useMemo(() => copy[lang], [lang])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'loading') return

    const cleanedName = name.trim()
    const cleanedEmail = email.trim().toLowerCase()
    if (!cleanedName || !cleanedEmail) {
      setStatus('error')
      return
    }

    setStatus('loading')

    if (!supabase) {
      setStatus('error')
      return
    }

    const payload = {
      name: cleanedName,
      email: cleanedEmail,
      lang,
    }

    const { error } = await supabase.from('eh_subscribers').insert(payload)
    if (error) {
      setStatus('error')
      return
    }

    setStatus('success')
    setName('')
    setEmail('')
  }

  if (status === 'success' && mode === 'card') {
    return (
      <div>
        <p className="signup-success">{t.success}</p>
        <p className="signup-success-note">{t.successHint}</p>
      </div>
    )
  }

  if (mode === 'footer') {
    return (
      <form onSubmit={handleSubmit} className="signup-form signup-form-footer">
        <div className="signup-footer-row">
          <input
            type="text"
            className="signup-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.name}
            required
          />
          <input
            type="email"
            className="signup-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.email}
            required
          />
          <button type="submit" className="premium-btn premium-btn-secondary premium-btn-small">
            {status === 'loading' ? '...' : t.join}
          </button>
        </div>
        {status === 'error' && <p className="signup-error">{t.error}</p>}
        {status === 'success' && (
          <>
            <p className="signup-success-inline">{t.success}</p>
            <p className="signup-success-note">{t.successHint}</p>
          </>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form signup-form-card">
      <div className="signup-fields signup-fields-card">
        <input
          type="text"
          className="signup-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.name}
          required
        />
        <input
          type="email"
          className="signup-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t.email}
          required
        />
      </div>

      <button type="submit" className="premium-btn premium-btn-primary premium-btn-small">
        {status === 'loading' ? '...' : mode === 'card' ? t.joinLibrary : t.join}
      </button>

      {status === 'error' && <p className="signup-error">{t.error}</p>}
      {status === 'success' && (
        <>
          <p className="signup-success-inline">{t.success}</p>
          <p className="signup-success-note">{t.successHint}</p>
        </>
      )}
    </form>
  )
}

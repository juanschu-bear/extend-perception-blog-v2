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
    joinLibrary: 'Join the Library',
    join: 'Join',
    success: "You're in. Welcome to the library.",
    error: 'Something went wrong. Try again.',
  },
  de: {
    name: 'Dein Name',
    email: 'Deine Email',
    joinLibrary: 'Der Bibliothek beitreten',
    join: 'Beitreten',
    success: 'Du bist dabei. Willkommen in der Bibliothek.',
    error: 'Etwas ist schiefgelaufen. Versuch es erneut.',
  },
  es: {
    name: 'Tu nombre',
    email: 'Tu email',
    joinLibrary: 'Unirte a la biblioteca',
    join: 'Unirte',
    success: 'Estás dentro. Bienvenido a la biblioteca.',
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
    setStatus('loading')

    if (!supabase) {
      setStatus('error')
      return
    }

    const payload = {
      name: name.trim() || null,
      email: email.trim().toLowerCase(),
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
    return <p className="signup-success">{t.success}</p>
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
          <button type="submit" className="premium-btn premium-btn-small">
            {status === 'loading' ? '...' : t.join}
          </button>
        </div>
        {status === 'error' && <p className="signup-error">{t.error}</p>}
        {status === 'success' && <p className="signup-success-inline">{t.success}</p>}
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

      <button type="submit" className="premium-btn premium-btn-small">
        {status === 'loading' ? '...' : mode === 'card' ? t.joinLibrary : t.join}
      </button>

      {status === 'error' && <p className="signup-error">{t.error}</p>}
      {status === 'success' && <p className="signup-success-inline">{t.success}</p>}
    </form>
  )
}

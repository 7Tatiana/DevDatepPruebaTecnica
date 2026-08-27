import { zodResolver } from '@hookform/resolvers/zod'
import { IconX } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { FieldErrors, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'
import { z } from 'zod'

type AuthMode = 'login' | 'register'
type Provider = 'facebook' | 'google' | 'email'

const socialProviders = [
  {
    id: 'facebook',
    label: 'Continuar con Facebook',
    icon: '/login/icono_fb.png',
    alt: 'Facebook',
  },
  {
    id: 'google',
    label: 'Continuar con Google',
    icon: '/login/icono_goggle.png',
    alt: 'Google',
  },
  {
    id: 'email',
    label: 'Continuar con Email',
    icon: '/login/icono_email.png',
    alt: 'Email',
  },
] as const satisfies readonly {
  id: Provider
  label: string
  icon: string
  alt: string
}[]

const credentialsSchema = z.object({
  email: z
    .string()
    .min(1, 'Ingresa tu correo electrónico.')
    .email('Ingresa un correo electrónico válido.'),
  password: z
    .string()
    .min(1, 'Ingresa tu contraseña.')
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
})

const socialEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Ingresa tu correo electrónico.')
    .email('Ingresa un correo electrónico válido.'),
})

type CredentialsFormValues = z.infer<typeof credentialsSchema>
type SocialEmailFormValues = z.infer<typeof socialEmailSchema>

const legalLinks = [
  'Condiciones del servicio',
  'Política de privacidad',
  'Política de cookies',
]

const handlePendingLegalLink = (label: string) => {
  console.info('Enlace legal pendiente de ruta real.', { label })
}

const getNameFromEmail = (email: string) => {
  const localPart = email.trim().split('@')[0] ?? ''
  const firstName = localPart.split(/[._-]/)[0] ?? 'Usuario'

  if (!firstName) {
    return 'Usuario'
  }

  return firstName.charAt(0).toUpperCase() + firstName.slice(1)
}

function Login() {
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  const {
    register: registerCredentials,
    handleSubmit: handleCredentialsSubmit,
    formState: {
      errors: credentialErrors,
      isSubmitting: isSubmittingCredentials,
    },
    reset: resetCredentials,
  } = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register: registerSocialEmail,
    handleSubmit: handleSocialEmailSubmit,
    formState: {
      errors: socialEmailErrors,
      isSubmitting: isSubmittingSocialEmail,
    },
    reset: resetSocialEmail,
  } = useForm<SocialEmailFormValues>({
    resolver: zodResolver(socialEmailSchema),
    defaultValues: {
      email: '',
    },
  })

  const selectedProviderLabel = useMemo(() => {
    return socialProviders.find((provider) => provider.id === selectedProvider)?.alt
  }, [selectedProvider])

  const closeProviderPanel = () => {
    setSelectedProvider(null)
    resetCredentials()
    resetSocialEmail()
  }

  const handleCredentials = async (values: CredentialsFormValues) => {
    setUserName(getNameFromEmail(values.email))
  }

  const handleSocialEmail = async (values: SocialEmailFormValues) => {
    setUserName(getNameFromEmail(values.email))
  }

  if (userName) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080009] px-6 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-6xl">Hola {userName}</h1>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080009] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/login/fondo-personas.webp')] bg-cover bg-center"
      />
      {
      <div aria-hidden="true" className="absolute inset-0 bg-[#120014]/50" />
      }
      {
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/login/efecto-cover-fondo.webp')] bg-cover bg-center opacity-200 mix-blend-multiply contrast-250"
      />
      }

      <section className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-7 sm:px-6">
        {selectedProvider === null ? (
          <AuthChoicePanel
            mode={authMode}
            onModeChange={setAuthMode}
            onProviderSelect={setSelectedProvider}
          />
        ) : selectedProvider === 'email' ? (
          <CredentialsPanel
            errors={credentialErrors}
            isSubmitting={isSubmittingCredentials}
            onBack={closeProviderPanel}
            onClose={closeProviderPanel}
            onSubmit={handleCredentialsSubmit(handleCredentials)}
            register={registerCredentials}
          />
        ) : (
          <SocialEmailPanel
            errors={socialEmailErrors}
            isSubmitting={isSubmittingSocialEmail}
            onBack={closeProviderPanel}
            onClose={closeProviderPanel}
            onSubmit={handleSocialEmailSubmit(handleSocialEmail)}
            provider={selectedProviderLabel ?? 'Facebook'}
            register={registerSocialEmail}
          />
        )}
      </section>
    </main>
  )
}

type AuthChoicePanelProps = {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
  onProviderSelect: (provider: Provider) => void
}

function AuthChoicePanel({ mode, onModeChange, onProviderSelect }: AuthChoicePanelProps) {
  const isLogin = mode === 'login'

  return (
    <div className="flex min-h-[611px] w-full max-w-[426px] flex-col rounded-[32px] border-[5px] border-[#9630ee] bg-[#101012] px-7 pb-8 pt-7 shadow-[14px_0_26px_rgba(151,48,238,0.5),0_0_18px_rgba(151,48,238,0.42)] sm:px-[42px]">
      <img
        src="/login/logo_original.png"
        alt="Arena FreeStyle"
        className="mx-auto h-[104px] w-auto object-contain drop-shadow-[0_0_1px_rgba(255,255,255,0.9)]"
      />

      <h1 className="mt-[20px] text-center text-[21px] font-bold leading-tight">
        Bienvenido a Arena FreeStyle
      </h1>

      <div className="mx-auto mt-[38px] w-full max-w-[333px]">
        <p className={`mb-[7px] text-[15px] ${isLogin ? 'font-bold' : 'font-normal'}`}>
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </p>

        <div className="space-y-3">
          {socialProviders.map((provider) => (
            <SocialButton
              key={provider.id}
              icon={provider.icon}
              label={provider.label}
              logoAlt={provider.alt}
              onClick={() => onProviderSelect(provider.id)}
            />
          ))}
        </div>
      </div>

      {isLogin ? (
        <button
          type="button"
          onClick={() => onProviderSelect('email')}
          className="mx-auto mt-[22px] h-[55px] w-full max-w-[253px] rounded-full bg-[#962fea] text-[23px] font-extrabold leading-none text-white shadow-[0_0_16px_rgba(150,47,234,0.22)] transition hover:bg-[#a43af2] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-px"
        >
          Ingresar
        </button>
      ) : null}

      <div className={`${isLogin ? 'mt-[18px]' : 'mt-[34px]'} text-center text-[16px] leading-6 text-white/90`}>
        {isLogin ? '¿Aún no tienes cuenta?' : '¿Ya tienes cuenta?'}
        <button
          type="button"
          onClick={() => onModeChange(isLogin ? 'register' : 'login')}
          className="ml-2 underline underline-offset-2 transition hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        >
          {isLogin ? 'Registrate' : 'Iniciar sesión'}
        </button>
      </div>

      {!isLogin ? (
        <LegalText className="mt-[34px]" />
      ) : null}
    </div>
  )
}

type SocialButtonProps = {
  icon: string
  label: string
  logoAlt: string
  onClick: () => void
}

function SocialButton({ icon, label, logoAlt, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[66px] w-full items-center rounded-full bg-[#f7f7f7] pl-6 pr-5 text-left text-[16px] font-extrabold text-[#070707] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] transition hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#9630ee] active:translate-y-px sm:text-[17px]"
    >
      <img src={icon} alt="" className="h-[34px] w-[34px] shrink-0 object-contain" />
      <span className="ml-5 min-w-0 truncate">{label}</span>
      <span className="sr-only"> con {logoAlt}</span>
    </button>
  )
}

type CredentialsPanelProps = {
  errors: FieldErrors<CredentialsFormValues>
  isSubmitting: boolean
  onBack: () => void
  onClose: () => void
  onSubmit: () => void
  register: UseFormRegister<CredentialsFormValues>
}

function CredentialsPanel({
  errors,
  isSubmitting,
  onBack,
  onClose,
  onSubmit,
  register,
}: CredentialsPanelProps) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="w-full max-w-[468px] rounded-[38px] border-[7px] border-[#9630ee] bg-[#101012] px-8 pb-8 pt-6 shadow-[14px_0_26px_rgba(151,48,238,0.5),0_0_18px_rgba(151,48,238,0.42)] sm:px-9"
    >
      <PanelHeader title="Continuar con Email" onClose={onClose} />

      <div className="mt-[36px] space-y-5">
        <TextField
          autoComplete="email"
          error={errors.email?.message}
          id="login-email"
          label="Correo electrónico"
          placeholder="name@gmail.com"
          registration={register('email')}
          type="email"
        />

        <TextField
          autoComplete="current-password"
          error={errors.password?.message}
          id="login-password"
          label="Contraseña"
          placeholder="••••••••"
          registration={register('password')}
          type="password"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 h-[42px] w-full rounded-full bg-[#962fea] text-[19px] font-medium text-white transition hover:bg-[#a43af2] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
      >
        Continuar
      </button>

      <BackButton onClick={onBack} />
      <LegalText className="mt-8" />
    </form>
  )
}

type SocialEmailPanelProps = {
  errors: FieldErrors<SocialEmailFormValues>
  isSubmitting: boolean
  onBack: () => void
  onClose: () => void
  onSubmit: () => void
  provider: string
  register: UseFormRegister<SocialEmailFormValues>
}

function SocialEmailPanel({
  errors,
  isSubmitting,
  onBack,
  onClose,
  onSubmit,
  provider,
  register,
}: SocialEmailPanelProps) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="w-full max-w-[468px] rounded-[38px] border-[7px] border-[#9630ee] bg-[#101012] px-8 pb-8 pt-6 shadow-[14px_0_26px_rgba(151,48,238,0.5),0_0_18px_rgba(151,48,238,0.42)] sm:px-9"
    >
      <PanelHeader title={`Continuar con ${provider}`} onClose={onClose} />

      <div className="mt-[56px]">
        <TextField
          autoComplete="email"
          error={errors.email?.message}
          id="social-email"
          label="Correo electrónico"
          placeholder="name@gmail.com"
          registration={register('email')}
          type="email"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-[22px] h-[42px] w-full rounded-full bg-[#962fea] text-[19px] font-medium text-white transition hover:bg-[#a43af2] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
      >
        Continuar
      </button>

      <BackButton onClick={onBack} />
      <LegalText className="mt-9" />
    </form>
  )
}

type PanelHeaderProps = {
  title: string
  onClose: () => void
}

function PanelHeader({ title, onClose }: PanelHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h2 className="text-[23px] font-bold leading-8 text-white sm:text-[24px]">
        {title}
      </h2>
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
      >
        <IconX aria-hidden="true" size={28} stroke={3.25} />
      </button>
    </div>
  )
}

type TextFieldProps = {
  autoComplete: string
  error?: string
  id: string
  label: string
  placeholder: string
  registration: UseFormRegisterReturn
  type: 'email' | 'password'
}

function TextField({
  autoComplete,
  error,
  id,
  label,
  placeholder,
  registration,
  type,
}: TextFieldProps) {
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="block text-[16px] leading-6 text-white/95">
        {label}
      </label>
      <input
        {...registration}
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className="mt-[20px] h-[76px] w-full rounded-full border-2 border-transparent bg-[#f6f6f6] px-[38px] text-[21px] text-[#151515] outline-none transition placeholder:text-[#7d7d83] focus:border-[#9630ee] focus:bg-white focus:ring-4 focus:ring-[#9630ee]/30"
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-2 px-4 text-sm font-medium text-[#ffb6da]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type BackButtonProps = {
  onClick: () => void
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-5 block text-[24px] leading-8 underline underline-offset-2 transition hover:text-white/80 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-px"
    >
      Volver
    </button>
  )
}

type LegalTextProps = {
  className?: string
}

function LegalText({ className = '' }: LegalTextProps) {
  return (
    <p className={`text-center text-[15px] leading-5 text-white/90 ${className}`}>
      Al continuar, aceptas las{' '}
      <button
        type="button"
        onClick={() => handlePendingLegalLink(legalLinks[0])}
        className="underline underline-offset-2 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {legalLinks[0]}
      </button>
      , la{' '}
      <button
        type="button"
        onClick={() => handlePendingLegalLink(legalLinks[1])}
        className="underline underline-offset-2 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {legalLinks[1]}
      </button>{' '}
      y la{' '}
      <button
        type="button"
        onClick={() => handlePendingLegalLink(legalLinks[2])}
        className="underline underline-offset-2 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {legalLinks[2]}
      </button>
      .
    </p>
  )
}

export default Login

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthChoicePanel, type AuthMode, type Provider, type SocialProvider } from './components/AuthChoicePanel'
import { CredentialsPanel, SocialEmailPanel } from './components/AuthFormPanels'
import {
  credentialsSchema,
  socialEmailSchema,
  type CredentialsFormValues,
  type SocialEmailFormValues,
} from './loginSchemas'

function Login() {
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
  ] as const satisfies readonly SocialProvider[]

  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)

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

  const selectedProviderLabel = socialProviders.find(
    (provider) => provider.id === selectedProvider,
  )?.alt

  const closeProviderPanel = () => {
    setSelectedProvider(null)
    resetCredentials()
    resetSocialEmail()
  }

  const handleAuthentication = async () => undefined

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080009] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/login/fondo-personas.webp')] bg-cover bg-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#120014]/50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/login/efecto-cover-fondo.webp')] bg-cover bg-center opacity-200 mix-blend-multiply contrast-250"
      />

      <section className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-7 sm:px-6">
        {selectedProvider === null ? (
          <AuthChoicePanel
            mode={authMode}
            onModeChange={setAuthMode}
            onProviderSelect={setSelectedProvider}
            providers={socialProviders}
          />
        ) : selectedProvider === 'email' ? (
          <CredentialsPanel
            errors={credentialErrors}
            isSubmitting={isSubmittingCredentials}
            onBack={closeProviderPanel}
            onClose={closeProviderPanel}
            onSubmit={handleCredentialsSubmit(handleAuthentication)}
            register={registerCredentials}
          />
        ) : (
          <SocialEmailPanel
            errors={socialEmailErrors}
            isSubmitting={isSubmittingSocialEmail}
            onBack={closeProviderPanel}
            onClose={closeProviderPanel}
            onSubmit={handleSocialEmailSubmit(handleAuthentication)}
            provider={selectedProviderLabel ?? 'Facebook'}
            register={registerSocialEmail}
          />
        )}
      </section>
    </main>
  )
}

export default Login

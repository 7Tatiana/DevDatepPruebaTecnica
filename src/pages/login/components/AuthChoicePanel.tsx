import { LegalText } from './LegalText'

export type AuthMode = 'login' | 'register'
export type Provider = 'facebook' | 'google' | 'email'

export type SocialProvider = {
  id: Provider
  label: string
  icon: string
  alt: string
}

type AuthChoicePanelProps = {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
  onProviderSelect: (provider: Provider) => void
  providers: readonly SocialProvider[]
}

export function AuthChoicePanel({
  mode,
  onModeChange,
  onProviderSelect,
  providers,
}: AuthChoicePanelProps) {
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
          {providers.map((provider) => (
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

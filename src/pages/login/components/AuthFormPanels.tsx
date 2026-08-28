import { IconX } from '@tabler/icons-react'
import type { FormEventHandler } from 'react'
import type { FieldErrors, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'
import type { CredentialsFormValues, SocialEmailFormValues } from '../loginSchemas'
import { LegalText } from './LegalText'

type CredentialsPanelProps = {
  errors: FieldErrors<CredentialsFormValues>
  isSubmitting: boolean
  onBack: () => void
  onClose: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<CredentialsFormValues>
}

export function CredentialsPanel({
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
  onSubmit: FormEventHandler<HTMLFormElement>
  provider: string
  register: UseFormRegister<SocialEmailFormValues>
}

export function SocialEmailPanel({
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

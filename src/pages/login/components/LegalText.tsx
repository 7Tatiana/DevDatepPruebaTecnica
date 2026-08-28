const legalLinks = [
  'Condiciones del servicio',
  'Política de privacidad',
  'Política de cookies',
]

const handlePendingLegalLink = (label: string) => {
  console.info('Enlace legal pendiente de ruta real.', { label })
}

type LegalTextProps = {
  className?: string
}

export function LegalText({ className = '' }: LegalTextProps) {
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

import { z } from 'zod'

export const credentialsSchema = z.object({
  email: z
    .string()
    .min(1, 'Ingresa tu correo electrónico.')
    .email('Ingresa un correo electrónico válido.'),
  password: z
    .string()
    .min(1, 'Ingresa tu contraseña.')
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
})

export const socialEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Ingresa tu correo electrónico.')
    .email('Ingresa un correo electrónico válido.'),
})

export type CredentialsFormValues = z.infer<typeof credentialsSchema>
export type SocialEmailFormValues = z.infer<typeof socialEmailSchema>

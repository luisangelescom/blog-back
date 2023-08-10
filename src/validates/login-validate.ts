import { z, SafeParseReturnType } from 'zod'
import { LoginProps } from '../types'

const schema = z.object({
  surname: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }).nonempty('Ingrese un surname'),
  password: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }).nonempty('Ingrese una contrasena')
})

export const validateLogin = (obj: LoginProps): SafeParseReturnType<LoginProps, LoginProps> => schema.safeParse(obj)

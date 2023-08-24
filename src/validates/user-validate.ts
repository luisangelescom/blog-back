import { z, SafeParseReturnType } from 'zod'
import { User, Post, UserPartial } from '../types'

const schema = z.object({
  name: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }).nonempty({
    message: 'Ingrese un valor'
  }),
  lastname: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }).nonempty({
    message: 'Ingrese un valor'
  }),
  surname: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }).nonempty({
    message: 'Ingrese un valor'
  }),
  password: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }).nonempty({
    message: 'Ingrese un valor'
  }).min(6, 'Ingrese al menos 6 digitos')

})

const schemaUpdate = z.object({
  name: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }).nonempty({
    message: 'Ingrese un valor'
  }),
  lastname: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }).nonempty({
    message: 'Ingrese un valor'
  })
})

export const validateUser = (obj: User): SafeParseReturnType<User, User> => schema.safeParse(obj)

// export const validateParcialPost = (obj: Post): SafeParseReturnType<PostPartial, PostPartial> =>
//   schema.partial().safeParse(obj)

export const validateParcialUser = (obj: Post): SafeParseReturnType<UserPartial, UserPartial> =>
  schemaUpdate.partial().safeParse(obj)

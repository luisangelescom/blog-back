import { z, SafeParseReturnType } from 'zod'
import { DescriptionModel, Post, PostPartial } from '../types'

const schema = z.object({
  title: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  }),
  article: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  })
})

const schemaDescription = z.object({
  description: z.string({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe de ser un string'
  })
})

export const validatePost = (obj: Post): SafeParseReturnType<Post, Post> => schema.safeParse(obj)

export const validateDescription = (obj: Post): SafeParseReturnType<DescriptionModel, DescriptionModel> => schemaDescription.safeParse(obj)

export const validateParcialPost = (obj: Post): SafeParseReturnType<PostPartial, PostPartial> =>
  schema.partial().safeParse(obj)

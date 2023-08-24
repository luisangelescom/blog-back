import { NextFunction, Request, Response } from 'express'
import { ModelDescription } from '../models/ModelDescription'
import { typesOfErrores } from '../../types-errors'
import { validateDescription } from '../../validates/post-validate'
import { getIdByToken } from '../../utils/token'

export default class PostDescriptionService {
  async getAllDescription (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const postId = +req.params.postId
      const response = await ModelDescription.getAllPost(postId)

      if (response.length > 0) {
        return res.status(200).json(response).end()
      }
      const error = new Error()
      error.message = typesOfErrores['Not Found']
      error.stack = JSON.stringify({ reason: 'No se encontraron descripciones' })
      throw error
    } catch (error) {
      next(error)
    }
  }

  async createPostDescription (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const result = validateDescription(req.body)
      if (!result.success) {
        const error = new Error()
        error.message = typesOfErrores['Bad Request']
        error.stack = result.error.message
        throw error
      }
      const userId = getIdByToken(req.headers.authorization)
      const postId = +req.params.postId
      await ModelDescription.createPost(postId, userId, result.data.description)
      const response = await ModelDescription.getAllPost(postId)
      return res.status(201).json(response).end()
    } catch (error) {
      next(error)
    }
  }
}

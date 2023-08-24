import { NextFunction, Request, Response } from 'express'
import { ModelDescription } from '../models/ModelDescription'
import { typesOfErrores } from '../../types-errors'
import { validateDescription } from '../../validates/post-validate'
import { getIdByToken } from '../../utils/token'
import { ErrorResponse } from '../../errors/NotFound'

export default class PostDescriptionService {
  async getAllDescription (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const postId = +req.params.postId
      const response = await ModelDescription.getAllPostDescription(postId)

      if (response.length > 0) {
        return res.status(200).json(response).end()
      }
      throw new ErrorResponse(typesOfErrores['Not Found'], { error: 'No se encontraron descripciones' })
    } catch (error) {
      next(error)
    }
  }

  async createPostDescription (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const result = validateDescription(req.body)
      if (!result.success) {
        throw new ErrorResponse(typesOfErrores['Bad Request'], result.error.message)
      }
      const userId = getIdByToken(req.headers.authorization)
      const postId = +req.params.postId
      await ModelDescription.createPostDescription(postId, userId, result.data.description)
      const response = await ModelDescription.getAllPostDescription(postId)
      return res.status(201).json(response).end()
    } catch (error) {
      next(error)
    }
  }
}

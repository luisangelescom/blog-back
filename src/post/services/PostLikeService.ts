import { NextFunction, Request, Response } from 'express'
import { ModelLike } from '../models/ModelLike'
import { typesOfErrores } from '../../types-errors'
import { getIdByToken } from '../../utils/token'
import { ErrorResponse } from '../../errors/NotFound'

export default class PostLikeService {
  async getAllPostLike (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const postId = +req.params.postId
      const response = await ModelLike.getAllPostLike(postId)

      if (response.rows.length > 0) {
        return res.status(200).json(response).end()
      }
      throw new ErrorResponse(typesOfErrores['Not Found'], { error: 'No se encontraron likes' })
    } catch (error) {
      next(error)
    }
  }

  async createPost (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const userId = getIdByToken(req.headers.authorization)
      const postId = +req.params.postId
      await ModelLike.createPost(postId, userId)

      const response = await ModelLike.getAllPostLike(postId)
      return res.status(200).json(response).end()
    } catch (error) {
      next(error)
    }
  }
}

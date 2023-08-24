import { NextFunction, Request, Response } from 'express'
import { ModelLike } from '../models/ModelLike'
import { getIdByToken } from '../../utils/token'

export default class PostLikeService {
  async getAllPostLike (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const postId = +req.params.postId
      const response = await ModelLike.getAllPostLike(postId)
      // if (response.rows.length > 0) {
      return res.status(200).json(response).end()
      // }
      // return res.status(404).json(response).end()
      // throw new ErrorResponse(typesOfErrores['Not Found'], { error: 'No se encontraron likes' })
    } catch (error) {
      next(error)
    }
  }

  async createLike (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const userId = getIdByToken(req.headers.authorization)
      const postId = +req.params.postId
      const likedId = await ModelLike.getPostById(postId, userId)
      if (likedId === null) {
        await ModelLike.createLike(postId, userId)
      } else {
        const { like } = likedId.dataValues
        console.log(like)
        await ModelLike.updateLike(postId, userId, like === 1 ? 0 : 1)
      }

      const response = await ModelLike.getAllPostLike(postId)
      return res.status(200).json(response).end()
    } catch (error) {
      next(error)
    }
  }
}

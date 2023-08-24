import { NextFunction, Request, Response } from 'express'
import { getIdByToken } from '../../utils/token'
import { validateParcialPost, validatePost } from '../../validates/post-validate'
import { ModelPost } from '../models/ModelPost'
import { typesOfErrores } from '../../types-errors'

export default class PostService {
  async getAllPost (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    const userId = getIdByToken(req.headers.authorization)
    try {
      const response = await ModelPost.getAllPost(userId)
      if (response.length > 0) {
        return res.status(200).json(response).end()
      } else {
        return res.status(404).json([]).end()
      }
    } catch (error) {
      next(error)
    }
  }

  async getPostById (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    const id = +req.params.postId
    try {
      const response = await ModelPost.getPostById(id)
      if (response != null) {
        return res.status(200).json(response.dataValues).end()
      }
      const error = new Error()
      error.message = typesOfErrores['Not Found']
      error.stack = JSON.stringify({ reason: 'No se encontró el post' })
      throw error
    } catch (error) {
      next(error)
    }
  }

  async createPost (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    const result = validatePost(req.body)
    if (!result.success) {
      return res.status(400).json({ errors: JSON.parse(result.error.message) }).end()
    }
    const userId = getIdByToken(req.headers.authorization)
    const post = result.data
    try {
      await ModelPost.createPost(userId, post)
      const response = await ModelPost.getAllPost(userId)
      return res.status(201).json(response).end()
    } catch (error) {
      next(error)
      // return {
      //   status: 500,
      //   data: []
      // }
    }
  }

  async updatePost (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    const result = validateParcialPost(req.body)
    if (!result.success) {
      return res.status(400).json({ errors: JSON.parse(result.error.message) }).end()
    }
    const userId = getIdByToken(req.headers.authorization)
    const postId = +req.params.postId
    const post = result.data
    try {
      const getPost = await ModelPost.getPostById(postId)
      console.log('getPost')
      console.log(getPost)

      if (getPost !== null && getPost !== undefined) {
        await ModelPost.updatePost(postId, post)
        const response = await ModelPost.getAllPost(userId)
        return res.status(200).json(response).end()
      }
      return res.status(404).json([]).end()
    } catch (error) {
      next(error)
    }
  }

  async deleteUser (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const id = +req.params.postId
      const userId = getIdByToken(req.headers.authorization)
      const getPost = await ModelPost.getPostById(id)
      if (getPost !== null || getPost !== undefined) {
        await ModelPost.deletePost(id)
        const response = await ModelPost.getAllPost(userId)
        return res.status(200).json(response).end()
      }
      return res.status(404).json([]).end()
    } catch (error) {
      next(error)
      // return {
      //   status: 500,
      //   data: []
      // }
    }
  }
}

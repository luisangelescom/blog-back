/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router, Request, Response } from 'express'
import PostService from '../services/PostService'
import { validateParcialPost, validatePost } from '../../validates/post-validate'
import middleware from '../../middleware'
import { getIdByToken } from '../../utils/token'

const path = '/posts'

const PostController = Router()

const postService = new PostService()

PostController.get(path, async (_req: Request, res: Response): Promise<void> => {
  const { status, data } = await postService.getAllPost()
  res.status(status).json(data).end()
})

PostController.get(`${path}/users`, middleware, async (req: Request, res: Response): Promise<void> => {
  const userId = getIdByToken(req.headers.authorization)
  const { status, data } = await postService.getAllPost(userId)
  res.status(status).json(data).end()
})

PostController.get(`${path}/:postId`, async (req: Request, res: Response): Promise<void> => {
  const { status, data } = await postService.getPostById(+req.params.postId)
  res.status(status).json(data).end()
})

PostController.post(path, middleware, async (req: Request, res: Response): Promise<void> => {
  const result = validatePost(req.body)
  if (result.success) {
    const userId = getIdByToken(req.headers.authorization)
    console.log(userId)

    const { status, data } = await postService.createPost(result.data, userId)
    res.status(status).json(data).end()
  } else {
    res.status(400).json({ errors: JSON.parse(result.error.message) })
  }
})

PostController.patch(`${path}/:postId`, middleware, async (req: Request, res: Response): Promise<void> => {
  const result = validateParcialPost(req.body)
  if (result.success) {
    const userId = getIdByToken(req.headers.authorization)
    const postId = +req.params.postId
    const { status, data } = await postService.updatePost(result.data, postId, userId)
    res.status(status).json(data).end()
  } else {
    res.status(400).json({ errors: JSON.parse(result.error.message) })
  }
})

PostController.delete(`${path}/:postId`, middleware, async (req: Request, res: Response): Promise<void> => {
  const userId = getIdByToken(req.headers.authorization)
  const { status, data } = await postService.deleteUser(+req.params.postId, userId)
  res.status(status).json(data).end()
})

export default PostController

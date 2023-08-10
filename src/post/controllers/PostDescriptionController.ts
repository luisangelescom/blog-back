/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from 'express'
import PostDescriptionService from '../services/PostDescriptionService'
import middleware from '../../middleware'
import { getIdByToken } from '../../utils/token'
import { validateDescription } from '../../validates/post-validate'

const path = '/posts-description'

const PostDescriptionController = Router()

const postDescriptionService = new PostDescriptionService()

PostDescriptionController.get(`${path}/:postId`, async (req: Request, res: Response): Promise<void> => {
  const { status, data } = await postDescriptionService.getAllDescription(+req.params.postId)
  res.status(status).json(data).end()
})

// PostDescriptionController.get(`${path}/:postId`, async (req: Request, res: Response): Promise<void> => {
//   const { status, data } = await postService.getPostById(+req.params.postId)
//   res.status(status).json(data).end()
// })

PostDescriptionController.post(`${path}/:postId`, middleware, async (req: Request, res: Response): Promise<void> => {
  const result = validateDescription(req.body)
  if (result.success) {
    const userId = getIdByToken(req.headers.authorization)
    const { status, data } = await postDescriptionService.createPostDescription(+req.params.postId, userId, result.data.description)
    res.status(status).json(data).end()
  } else {
    res.status(400).json({ errors: JSON.parse(result.error.message) })
  }
})

export default PostDescriptionController

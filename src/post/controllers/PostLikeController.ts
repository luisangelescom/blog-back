/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from 'express'

import PostLikeService from '../services/PostLikeService'
import middleware from '../../middleware'
import { getIdByToken } from '../../utils/token'

const path = '/posts-like'

const PostLikeController = Router()

const postLikeService = new PostLikeService()

PostLikeController.get(`${path}/:postId`, async (req: Request, res: Response): Promise<void> => {
  const postId = +req.params.postId
  const { status, data } = await postLikeService.getAllPost(postId)
  res.status(status).json(data).end()
})

PostLikeController.post(`${path}/:postId`, middleware, async (req: Request, res: Response): Promise<void> => {
  const userId = getIdByToken(req.headers.authorization)
  const postId = +req.params.postId
  const { status, data } = await postLikeService.createPost(postId, userId)
  res.status(status).json(data).end()
})

export default PostLikeController

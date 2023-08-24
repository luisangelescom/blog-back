/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import PostLikeService from '../services/PostLikeService'
import middleware from '../../middleware'

const path = '/posts-like'

const PostLikeController = Router()

const postLikeService = new PostLikeService()

PostLikeController.get(`${path}/:postId`, postLikeService.getAllPostLike)

PostLikeController.post(`${path}/:postId`, middleware, postLikeService.createPost)

export default PostLikeController

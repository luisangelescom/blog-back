/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import PostService from '../services/PostService'
import middleware from '../../middleware'

const path = '/posts'

const PostController = Router()

const postService = new PostService()

PostController.get(path, postService.getAllPost)

PostController.get(`${path}/users`, middleware, postService.getAllPost)

PostController.get(`${path}/:postId`, postService.getPostById)

PostController.post(path, middleware, postService.createPost)

PostController.patch(`${path}/:postId`, middleware, postService.updatePost)

PostController.delete(`${path}/:postId`, middleware, postService.deleteUser)

export default PostController

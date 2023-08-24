/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import PostDescriptionService from '../services/PostDescriptionService'
import middleware from '../../middleware'

const path = '/posts-description'

const PostDescriptionController = Router()

const postDescriptionService = new PostDescriptionService()

PostDescriptionController.get(`${path}/:postId`, postDescriptionService.getAllDescription)

PostDescriptionController.post(`${path}/:postId`, middleware, postDescriptionService.createPostDescription)

export default PostDescriptionController

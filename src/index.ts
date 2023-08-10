import express from 'express'
import cors from 'cors'

import PostController from './post/controllers/PostController'
import UserController from './user/controllers/UserController'
import PostLikeController from './post/controllers/PostLikeController'
import PostDescriptionController from './post/controllers/PostDescriptionController'
import LoginController from './login/Controllers/LoginController'
import env from 'dotenv'
env.config()

const app = express()
app.use(cors({
  origin: '*'
}))

app.disable('x-powered-by')

app.use(express.json())

const PORT = 4000

app.use(LoginController)
app.use(UserController)
app.use(PostController)
app.use(PostLikeController)
app.use(PostDescriptionController)

app.get('/ping', (_req: express.Request, res: express.Response) => {
  res.send('ok')
})

app.listen(PORT, () => {
  console.log('Server running')
})

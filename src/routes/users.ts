import express from 'express'

const userRoutes = express.Router()

userRoutes.get('/', (_req: express.Request, res: express.Response) => {
  res.send('User')
})

export default userRoutes

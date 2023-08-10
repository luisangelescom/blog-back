
// import Sequelize from 'sequelize'

import PostModel from '../src/post/models/PostModel'
import UserModel from '../src/user/models/UserModel'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function seed () {
  // create tables
  await PostModel.truncate()
  await PostModel.drop()

  await UserModel.truncate()
  await UserModel.drop()
})()

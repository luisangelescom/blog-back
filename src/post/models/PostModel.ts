import { Model, STRING } from 'sequelize'

import sequelize from '../../bd-connection'
import UserModel from '../../user/models/UserModel'

class PostModel extends Model {}

PostModel.init({
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: true
    }
  },
  article: {
    type: STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'posts',
  paranoid: true
})

UserModel.hasMany(PostModel, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
PostModel.belongsTo(UserModel, { foreignKey: 'userId' })

export default PostModel

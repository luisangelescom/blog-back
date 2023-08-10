import { Model, STRING } from 'sequelize'

import sequelize from '../../bd-connection'

class UserModel extends Model {}

UserModel.init({
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  lastname: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  surname: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    },
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 8
    }
  }
}, {
  sequelize,
  modelName: 'users',
  paranoid: true
})

export default UserModel

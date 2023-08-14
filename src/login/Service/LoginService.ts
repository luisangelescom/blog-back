import { LoginProps, LoginResponseToken } from '../../types'
import UserModel from '../../user/models/UserModel'
import { getToken } from '../../utils/token'

export default class LoginService {
  async getToken (login: LoginProps): Promise<LoginResponseToken> {
    const { surname, password } = login
    try {
      const response = await UserModel.findOne({
        where: {
          surname,
          password
        }
      })
      if (response != null) {
        delete response.dataValues.password
        const token = getToken(response.dataValues.id)
        return {
          status: 200,
          data: { accessToken: token, data: response.dataValues }
        }
      }
      return {
        status: 401,
        data: {
          errors: {
            message: 'Usuario invalido'
          }
        }
      }
    } catch (error) {
      return {
        status: 500,
        data: null
      }
    }
  }
}

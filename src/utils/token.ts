
import jwt, { JwtPayload } from 'jsonwebtoken'

export const getToken = (id: number): string => {
  const token = jwt.sign({ id }, 'secret', { expiresIn: '1d' })
  return token
}

export const verifyToken = (token: string): boolean => {
  const accessToken = token.split(' ')[1]
  let isAlive = true
  jwt.verify(accessToken, 'secret', (error) => {
    if (error !== null) {
      isAlive = false
    }
  })
  return isAlive
}

export const getIdByToken = (token: string | undefined): number => {
  if (token !== undefined) {
    const accessToken = token.split(' ')[1]
    const { id } = jwt.verify(accessToken, 'secret') as JwtPayload

    return id
  }
  return 0
}

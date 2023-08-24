export const statusError = {
  'Bad Request': {
    message: 'Bad Request',
    code: 400
  },
  Unauthorized: {
    message: 'Unauthorized',
    code: 401
  },
  Forbidden: {
    message: 'Forbidden',
    code: 403
  },
  'Not Found': {
    message: 'Not Found',
    code: 404
  },
  'Internal Server Error': {
    message: 'Internal Server Error',
    code: 500
  },
  'Service Unavailable': {
    message: 'Service Unavailable',
    code: 503
  }
}

export type typesErrors = 'Bad Request' | 'Unauthorized' | 'Forbidden' | 'Not Found' | 'Internal Server Error' | 'Service Unavailable'

export enum typesOfErrores {
  'Bad Request' = 'Bad Request',
  'Unauthorized' = 'Unauthorized',
  'Forbidden' = 'Forbidden',
  'Not Found' = 'Not Found',
  'Internal Server Error' = 'Internal Server Error',
  'Service Unavailable' = 'Service Unavailable'
}

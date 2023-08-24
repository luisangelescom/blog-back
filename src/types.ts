import UserModel from './post/models/PostModel'
import PostLikeModel from './post/models/PostLikeModel'
import PostDescriptionModel from './post/models/PostDescriptionModel'

export interface ErrorCustom {
  errors: {}
}

// Response Post
export interface PostsResponse {
  status: number
  data: UserModel[]
}

export interface PostResponse {
  status: number
  data: UserModel | PostPartial | null
}

export interface Post {
  title: string
  article: string
}

export interface PostPartial {
  title?: string
  article?: string
}

// Response User
export interface UsersResponse {
  status: number
  data: UserModel[]
}

export interface UserResponse {
  status: number
  data: UserModel | UserPartial | ErrorCustom | null
}

export interface User {
  name: string
  lastname: string
  surname: string
  password: string
}

export interface UserPartial {
  name?: string
  lastname?: string
}

// Response PostLike
export interface PostLikeResponse {
  status: number
  data: CounterPostLikeModel | PostLikeModel[] | ErrorCustom | null
}

export interface CounterPostLikeModel {
  data: PostLikeModel[]
  count?: number
}

// Response PostDescription
export interface PostDescriptionResponse {
  status: number
  data: CounterPostDescriptionModel | PostDescriptionModel[] | ErrorCustom | null
}

export interface CounterPostDescriptionModel {
  data: PostDescriptionModel[]
  count?: number
}

// Login
export interface LoginProps {
  surname: string
  password: string
}

export interface UserLogin {
  id: number
  name: string
  lastname: string
  surname: string
}

export interface Token {
  accessToken: string
  data: UserLogin
}

export interface LoginResponse {
  status: number
  data: UserLogin
}

export type LoginResponseToken =
  | {
    status: 200
    data: Token
  }
  | { status: 401, data: ErrorCustom }
  | { status: 500, data: null }

export interface DescriptionModel {
  description: string
}

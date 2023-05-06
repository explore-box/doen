export interface AuthPayload {
  id: string
  fullName: string
  email: string
  username: string
  bio: string
  providers: string[]
  birthDate: string
  address: string
  avatar: string
  cover: string
  status: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface AuthPayload {
  user: AuthPayload
  accessToken: string
  refreshToken: string
}

declare global {
  declare type IncomingFile = Express.Multer.File

  declare type User = {
    id: string
    name: string
    username: string
    email: string
    bio: string
    birthDate: Date
    banned: boolean
    profileImage: string
    backgroundImage: string
    createdAt: Date
    updatedAt: Date
  }

  namespace Express {
    export interface Request {
      user?: User
    }
  }
}

export {}

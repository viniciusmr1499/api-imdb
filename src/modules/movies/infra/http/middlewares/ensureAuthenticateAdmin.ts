import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

interface TokenPayload {
  level: number
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticateAdmin (request: Request, response: Response, next: NextFunction):void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decode = verify(token, authConfig.jwt.secret)
    const { level, sub } = decode as TokenPayload
    if (level !== 1) {
      throw new AppError('User is not allowed to perform this operation')
    }

    request.user = {
      id: sub
    }

    return next()
  } catch (error) {
    throw new AppError(error.message, 401)
  }
}

import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateUserService from '@modules/users/services/CreateUserService'
import GetUserService from '@modules/users/services/GetUserService'

export default class UsersController {
  public async index (_: Request, response: Response): Promise<Response> {
    const getUserService = container.resolve(GetUserService)
    const users = await getUserService.execute()
    return response.json(users)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const { name, email, password, level } = request.body
    const createUser = container.resolve(CreateUserService)
    const user = await createUser.execute({ name, email, password, level })
    return response.json(classToClass(user))
  }
}

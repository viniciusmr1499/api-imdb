import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

@injectable()
class GetUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository

  ) {}

  public async execute ():Promise<User[] | undefined> {
    const users = await this.usersRepository.findAll()
    return users
  }
}

export default GetUserService

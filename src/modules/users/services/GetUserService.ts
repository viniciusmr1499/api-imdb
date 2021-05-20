import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

@injectable()
class GetUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute ():Promise<User[]> {
    const users = await this.usersRepository.findAll()

    return users
  }
}

export default GetUserService

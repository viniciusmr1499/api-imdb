import { getRepository, Repository, Not } from 'typeorm'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor () {
      this.ormRepository = getRepository(User)
    }

    public async findAll (): Promise<User[]> {
      const users = this.ormRepository.find({
        where: {
          status: 1
        }
      })

      return users
    }

    public async findById (id: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne(id)

      return user
    }

    public async findByEmail (email: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne({
        where: { email }
      })

      return user
    }

    public async create ({ email, name, password, level, status = 1 }: ICreateUserDTO): Promise<User> {
      const user = this.ormRepository.create({
        email,
        name,
        password,
        level,
        status
      })

      await this.ormRepository.save(user)

      return user
    }

    public async save (user: User): Promise<User> {
      return this.ormRepository.save(user)
    }
}

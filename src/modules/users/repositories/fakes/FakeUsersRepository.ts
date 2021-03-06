import { uuid } from 'uuidv4'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

export default class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findAll (): Promise<User[] | undefined> {
      const allUsers = this.users.find(user => {
        if (user.status === 1) {
          return user
        }
      })

      return allUsers as undefined
    }

    public async findById (id: string): Promise<User | undefined> {
      const findUser = this.users.find(user => user.id == id)

      return findUser
    }

    public async findByEmail (email: string): Promise<User | undefined> {
      const findUser = this.users.find(user => user.email == email)

      return findUser
    }

    public async create (data: ICreateUserDTO): Promise<User> {
      const user = new User()

      Object.assign(user, { id: uuid(), status: 1 }, data)

      this.users.push(user)

      return user
    }

    public async save (user: User): Promise<User> {
      const findIndex = this.users.findIndex(findUser => findUser.id = user.id)

      this.users[findIndex] = user

      return user
    }
}

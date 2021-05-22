import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequestDTO {
  user_id: string;
}

@injectable()
class RemoveProfileService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute ({ user_id }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    user.status = 0
    await this.usersRepository.save(user)
  }
}

export default RemoveProfileService

import { container } from 'tsyringe'

import '@modules/users/providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository'
import MoviesRepository from '@modules/movies/infra/typeorm/repositories/MoviesRepository'
import IVotationsRepository from '@modules/movies/repositories/IVotationsRepository'
import VotationsRepository from '@modules/movies/infra/typeorm/repositories/VotationsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository
)

container.registerSingleton<IVotationsRepository>(
  'VotationsRepository',
  VotationsRepository
)

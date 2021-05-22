import { container } from 'tsyringe'
import { Response, Request } from 'express'
import CreateVotationsService from '@modules/movies/services/CreateVotationsService'

class VotationsController {
  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id: movie_id } = request.params
    const { voting } = request.body
    const createVotations = container.resolve(CreateVotationsService)
    const votations = await createVotations.execute({
      movie_id,
      user_id,
      voting
    })
    return response.json(votations)
  }
}

export default VotationsController

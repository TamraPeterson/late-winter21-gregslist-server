import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class JobsService {
  async getAll(query = {}) {
    const jobs = await dbContext.Jobs.find(query)
    return jobs
  }
  async create(body) {
    const job = await dbContext.Jobs.create(body)
    return job
  }
  async remove(jobId, userId) {
    const job = await this.getById(jobId)
    if (job.creatorId.toString() !== userId) {
      throw new Forbidden('not your job')
    }
    await dbContext.Jobs.findByIdAndDelete(jobId)
  }
}

export const jobsService = new JobsService()
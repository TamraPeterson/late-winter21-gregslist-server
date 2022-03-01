import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class HousesService {
  async getAll(query = {}) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }
  async getById(id) {
    const house = await dbContext.Houses.findById(id)
    if (!house) {
      throw new BadRequest('invalid house id')
    }
    return house
  }
  async create(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }
  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('You cannot')
    }
    original.bedrooms = update.bedrooms ? update.bedrooms : original.bedrooms
    original.bathrooms = update.bathrooms ? update.bathrooms : original.bathrooms
    original.year = update.year ? update.year : original.year
    original.price = update.price ? update.price : original.price
    original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl

    await original.save({ runValidators: true })
    return original
  }
  async remove(houseId, userId) {
    const house = await this.getById(houseId)
    if (house.creatorId.toString() !== userId) {
      throw new Forbidden('that house doesnt exist')
    }
    await dbContext.Houses.findByIdAndDelete(houseId)
  }
}

export const housesService = new HousesService()
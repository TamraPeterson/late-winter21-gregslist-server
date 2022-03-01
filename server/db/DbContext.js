import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CarSchema } from '../models/Car'
import { HouseSchema } from "../models/House";
import { ValueSchema } from '../models/Value'
import { JobSchema } from '../models/Job'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  // adds to the db
  Cars = mongoose.model('Car', CarSchema)
  Houses = mongoose.model('House', HouseSchema)
  Jobs = mongoose.model('Job', JobSchema)
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()

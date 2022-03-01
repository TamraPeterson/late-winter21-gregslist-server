import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    salary: { type: Number, required: true },
    description: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
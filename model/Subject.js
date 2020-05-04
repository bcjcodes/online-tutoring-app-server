const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    subjects: {
      type: []
    }
  },
  { timestamps: true }
)

module.exports = Subject = mongoose.model('subjects', subjectSchema)

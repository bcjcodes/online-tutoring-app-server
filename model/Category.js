const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema(
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

module.exports = Category = mongoose.model('category', categorySchema)

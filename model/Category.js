const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    subjects: {
      type: []
    }
  },
  { timestamps: true }
)

module.exports = Category = mongoose.model('categories', categorySchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Subject = require('./Subject')

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
  },
  { timestamps: true }
)

categorySchema.pre('remove', async function (next) {
  const category = this
  Subject.deleteMany({ category: category._id })
  next()
})

module.exports = Category = mongoose.model('categories', categorySchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require('./Category')
const Tutor = require('./Tutor')

const subjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },

    tutors: [{ type: Schema.Types.ObjectId, ref: 'Tutor' }]
  },
  { timestamps: true }
)

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject

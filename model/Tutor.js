const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Subject = require('./Subject')

const tutorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],

    workExperience: {
      type: Number,
      required: true
    },
    adminAccess: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'tutor'
    },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }]
  },
  { timestamps: true }
)

const Tutor = mongoose.model('tutors', tutorSchema)
module.exports = Tutor

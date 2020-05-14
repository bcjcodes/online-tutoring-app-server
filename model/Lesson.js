const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Tutor = require('./Tutor')
const Subject = require('./Subject')
const Student = require('./Student')

const lessonSchema = new Schema(
  {
    tutor_id: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor'
    },

    subject_id: {
      type: Schema.Types.ObjectId,
      ref: 'Subject'
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }
  },
  { timestamps: true }
)
const Lesson = mongoose.model('Lesson', lessonSchema)
module.exports = Lesson

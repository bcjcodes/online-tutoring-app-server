const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Tutor = require('./tutor')
const Subject = require('./subject')
const Student = require('./student')

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

module.exports = Lesson = mongoose.model('lesson', lessonSchema)

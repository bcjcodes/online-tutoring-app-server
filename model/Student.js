const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema(
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
    lessons: {
      default: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }]
    },
    role: {
      type: String,
      default: 'student'
    }
  },
  { timestamps: true }
)

module.exports = Student = mongoose.model('students', studentSchema)

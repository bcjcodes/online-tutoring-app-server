const Student = require('../model/student')
const Tutor = require('../model/tutor')
const Subject = require('../model/subject')
const Lesson = require('../model/lesson')

exports.bookLesson = (req, res, next) => {
  const { tutor_id, student_id, subject_id } = req.body

  if (!tutor_id || !student_id || !subject_id) {
    return res.status(400).send('Enter required field')
  } else {
    Tutor.find({ subjects: { $in: [subject_id] } }).then(tutors => {
      if (!tutors) {
        return res.status(403).send('Tutor not assigned to subject')
      } else {
        Tutor.findById(tutor_id).then(tutor => {
          if (!tutor) {
            return res.status(404).send('Tutor not available')
          } else {
            Student.findById(student_id).then(student => {
              if (!student) {
                return res.status(404).send('Tutor not found')
              } else {
                Subject.findById(subject_id).then(subject => {
                  if (!subject) {
                    return res.status(404).send('Subject not found')
                  } else {
                    let lesson = new Lesson({
                      tutor_id: tutor._id,
                      student_id: student._id,
                      subject_id: subject._id
                    })
                    lesson.save().then(lesson => {
                      tutor.lessons.push(lesson)
                      tutor.save().then(() => {
                        student.lessons.push(lesson)
                        student
                          .save()
                          .then(() => {
                            return res
                              .status(201)
                              .send('Lesson booked successfully')
                          })
                          .catch(err => console.log(err))
                      })
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
}

exports.viewLessons = (req, res, next) => {
  Lesson.find({}).then(lessons => {
    return res.send(lessons)
  })
}

exports.viewLesson = (req, res, next) => {
  const lessonId = req.params.lessonId

  Lesson.findById(lessonId).then(lesson => {
    if (!lesson) {
      return res.status(404).send('No available lesson')
    } else {
      return res.send(lesson)
    }
  })
}

exports.updateLesson = (req, res, next) => {
  const { tutor_id } = req.body
  const lesson_id = req.params.lessonId
  console.log(tutor_id, lesson_id)

  Lesson.findByIdAndUpdate(lesson_id, { tutor_id: tutor_id }).then(lesson => {
    Tutor.find({ lessons: { $in: [lesson_id] } }).then(tutors => {
      for (let i in tutors) {
        Tutor.update(
          { _id: tutors[i]._id },
          { $pull: { lessons: lesson_id } },
          function (err, numberAffected) {
            console.log(numberAffected.n)
            Tutor.findById(tutor_id).then(tutor => {
              tutor.lessons.push(lesson_id)
              tutor.save().then(() => {
                return res.send('Lesson updated successfully')
              })
            })
          }
        )
      }
    })
  })
}

exports.deleteLesson = (req, res, next) => {
  const lesson_id = req.params.lessonId

  Lesson.findById(lesson_id).then(lesson => {
    if (!lesson) {
      return res.status(404).send('Lesson not found')
    } else {
      lesson.remove(err => {
        if (!err) {
          Tutor.update(
            { _id: lesson.tutor_id },
            { $pull: { lessons: lesson._id } },
            function (err, numberAffected) {
              if (err) console.log(err)
              console.log(numberAffected.n)

              Student.update(
                { _id: lesson.student_id },
                { $pull: { lessons: lesson._id } },
                function (err, numberAffected) {
                  if (err) console.log(err)
                  console.log(numberAffected.n)
                  return res.status(204).send('Lesson deleted successfully')
                }
              )
            }
          )
        } else {
          console.log(err)
        }
      })
    }
  })
}

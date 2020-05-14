const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Student = require('../model/Student')
const Subject = require('../model/Subject')
const Category = require('../model/Category')
const Tutor = require('../model/Tutor')

exports.registerTutor = (req, res, next) => {
  const { firstname, lastname, email, password, workExperience } = req.body

  if (!firstname || !lastname || !email || !password || !workExperience) {
    res.status(400).json({
      status: false,
      message: 'Enter Fields Correctly'
    })
  }

  Tutor.findOne({ email }).then(tutor => {
    if (tutor) {
      return res.status(423).json({
        status: false,
        message: 'Email already exists'
      })
    }

    bcrypt
      .hash(password, 12)
      .then(password => {
        let tutor = new Tutor({
          firstname,
          lastname,
          email,
          password,
          workExperience
        })

        if (tutor.workExperience >= 5) {
          tutor.adminAccess = true
        }

        return tutor.save()
      })

      .then(() => {
        res.status(200).json({
          message: `Hello ${firstname}. We're glad you're contributing to the bright minds round the world  `
        })
      })
      .catch(err => {
        console.log(err)
      })
  })
}

exports.loginTutor = (req, res, next) => {
  const { email, password } = req.body

  Tutor.findOne({ email })
    .then(tutor => {
      if (!tutor) {
        res.status(403).send('Tutor does not exist, kindly register!!')
      }

      bcrypt.compare(password, tutor.password).then(valid => {
        if (!valid) {
          res.status(403).send('Incorrect username or password')
        }

        const token = jwt.sign(
          {
            email: tutor.email,
            _id: tutor._id,
            role: tutor.role,
            adminAccess: tutor.adminAccess
          },
          'secrettoken',
          {
            expiresIn: '4800s'
          }
        )

        res.status(200).send({
          message: `Welcome back, keep on teaching!!`,
          _id: tutor._id,
          token
        })
      })
    })
    .catch(err => console.log(err))
}

exports.registerTutorSubjects = (req, res, next) => {
  const categoryId = req.params.catId
  const subjectId = req.params.catId
  const { email } = req.body

  if (!email) {
    res.status(400).send('Email field required')
  } else {
    Category.findById(categoryId).then(category => {
      if (!category) {
        return res.status(404).send('Category not found')
      } else {
        Subject.findById(subjectId).then(subject => {
          if (!subject) {
            return res.status(404).send('Status not found')
          } else {
            Tutor.findOne({ email: email }).then(tutor => {
              tutor.subjects.push(subject)
              tutor.save().then(tutor => {
                subject.tutors.push(tutor)
                subject
                  .save()
                  .then(() => {
                    res.status(201).send('Tutor registered successfully')
                  })
                  .catch(err => console.log(err))
              })
            })
          }
        })
      }
    })
  }
}

exports.viewTutorSubjects = (req, res, next) => {
  let tutorId = req.params.tutId

  Tutor.findById(tutorId)
    .populate('subjects', 'title category')
    .exec((err, subjects) => {
      if (err) console.log(err)
      Subject.find({ tutors: { $in: [tutorId] } }).then(subjects => {
        res.send(subjects)
      })
    })
}

exports.deleteTutor = (req, res, next) => {
  let tutorId = req.params.tutId
  Tutor.findById(req.params.tutId)
    .then(tutor => {
      if (!tutor) {
        res.status(404).send('Tutor not found')
      } else {
        tutor.remove().then(() => res.send('Tutor Deactivated'))
      }
    })

    .catch(err => console.log(err))
}

exports.viewTutor = (req, res, next) => {
  Tutor.findById(req.params.tutId).then(tutor => {
    if (!tutor) {
      res.status(404).send('Tutor not found')
    } else {
      res.send(tutor)
    }
  })
}

exports.getAllTutors = (req, res, next) => {
  Tutor.find({}).then(tutors => {
    res.send(tutors)
  })
}

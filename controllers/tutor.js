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
            adminstatus: tutor.adminstatus
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

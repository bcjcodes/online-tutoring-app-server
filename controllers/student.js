const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Student = require('../model/Student')
const Subject = require('../model/Subject')
const Category = require('../model/Category')
const Tutor = require('../model/Tutor')

exports.test = (req, res, next) => {
  res.json({ message: 'Test Worked!!!' })
}

exports.registerStudent = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body

  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({
      status: false,
      message: 'Enter Fields Correctly'
    })
  }

  Student.findOne({ email }).then(student => {
    if (student) {
      res.status(423).json({
        status: false,
        message: 'Email already exists'
      })
    }

    bcrypt
      .hash(password, 12)
      .then(password => {
        let student = new Student({
          firstname,
          lastname,
          email,
          password
        })

        return student.save()
      })

      .then(() => {
        res.status(200).json({
          status: true,
          message: `Hello ${firstname}. Welcome to my BCJ Tutor App `
        })
      })
      .catch(err => {
        console.log(err)
      })
  })
}

exports.loginStudent = (req, res, next) => {
  const { email, password } = req.body

  Student.findOne({ email })
    .then(student => {
      if (!student) {
        res.status(403).send('Student does not exist, kindly register!!')
      }

      bcrypt.compare(password, student.password).then(valid => {
        if (!valid) {
          res.status(403).json('Incorrect username or password')
        }

        const token = jwt.sign(
          {
            email: student.email,
            _id: student._id
          },
          'secrettoken',
          {
            expiresIn: '7200s'
          }
        )
        res.status(200).json({
          message: `Welcome back, keep on learning!!`,
          _id: student._id,
          token
        })
      })
    })
    .catch(err => console.log(err))
}

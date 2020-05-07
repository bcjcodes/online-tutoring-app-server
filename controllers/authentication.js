const jwt = require('jsonwebtoken')
const Student = require('../model/Student')
const Subject = require('../model/Subject')
const Category = require('../model/Category')
const Tutor = require('../model/Tutor')

exports.authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).send('Auth token not found')
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, 'secrettoken', (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).send('Incorrect token')
    }

    req.user = user
    console.log(user)
    if (user.role === 'tutor' && user.adminAccess === true) {
      return next()
    } else {
      return res.status(401).send('Not Authorized')
    }
  })
}

exports.authenticateStudent = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).send('Auth token not found')
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, 'secrettoken', (err, user) => {
    if (err) {
      return res.status(403).send('Incorrect token')
    }

    req.user = user
    console.log(user)
    if (user.role === 'student') {
      return next()
    } else {
      return res.status(401).send('Not Authorized')
    }
  })
}

exports.authenticateStudentAndAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(403).send('Auth token not found')
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, 'secrettoken', (err, user) => {
    if (err) {
      return res.status(403).send('Incorrect token')
    }

    req.user = user
    console.log(user)
    if (
      (user.role === 'tutor' && user.adminAccess === true) ||
      user.role === 'student'
    ) {
      next()
    } else {
      return res.status(401).send('Not authorized')
    }
  })
}

exports.authenticateTutor = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).send('Auth token not found')
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, 'secrettoken', (err, user) => {
    if (err) {
      return res.status(403).send('Incorrect token')
    }

    req.user = user
    console.log(user)
    if (user.role === 'tutor') {
      return next()
    } else {
      return res.status(401).send('Not authorized')
    }
  })
}

exports.authenticateAllUser = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).send('Auth not found')
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, 'secrettoken', (err, user) => {
    if (err) {
      return res.status(403).send('Incorrect token')
    }

    req.user = user
    return next()
  })
}

const router = require('express').Router()

const { registerStudent, loginStudent } = require('../controllers/student')

router.post('/register', registerStudent)
router.post('/login', loginStudent)

module.exports = router

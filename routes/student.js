const router = require('express').Router()

const { registerStudent, loginStudent } = require('../controllers/student')
const { viewTutorSubjects } = require('../controllers/subject')

router.post('/register/student', registerStudent)
router.post('/login/student', loginStudent)
router.get('/categories/:catId:/subjects/:subId', viewTutorSubjects)

module.exports = router

const router = require('express').Router()

const {
  showSubjects,
  showAllSubjects,
  showSubject,
  deleteSubject,
  updateSubject,
  viewSubjectTutors
} = require('../controllers/subject')

router.post('/register', registerStudent)
router.post('/login', loginStudent)

module.exports = router

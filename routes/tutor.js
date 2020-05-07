const router = require('express').Router()

const {
  registerTutor,
  loginTutor,
  registerTutorSubjects,
  viewTutorSubjects
} = require('../controllers/tutor')

const { authenticateTutor } = require('../controllers/authentication')

router.post('/register/tutor', registerTutor)
router.post('/login/tutor', loginTutor)
router.post(
  '/categories/:catId/subjects/:subId/tutors',
  authenticateTutor,
  registerTutorSubjects
)
router.get('/tutors/:tutId/subjects', authenticateTutor, viewTutorSubjects)

// router.put(update registered subject);
// router.delete(delete registered subject);

module.exports = router

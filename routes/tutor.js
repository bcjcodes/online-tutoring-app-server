const router = require('express').Router()

const { registerTutor, loginTutor } = require('../controllers/tutor')

router.post('/register', registerTutor)
router.post('/login', loginTutor)

module.exports = router

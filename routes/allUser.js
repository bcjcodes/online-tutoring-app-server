const router = require('express').Router()

const Category = require('../model/Category')
const Subject = require('../model/Subject')

const { viewEachCategory, viewCategory } = require('../controllers/category')
const {
  viewSubject,
  viewAllSubjects,
  viewSubjects
} = require('../controllers/subject')

const { authenticateAllUser } = require('../controllers/authentication')

router.get('/category/:catId', authenticateAllUser, viewEachCategory)
router.get('/category', authenticateAllUser, viewCategory)
router.get('/subjects', authenticateAllUser, viewAllSubjects)
router.get('/category/:catId/subjects/', authenticateAllUser, viewSubjects)
router.get('/category/:catId/subjects/:catId', authenticateAllUser, viewSubject)

module.exports = router

const router = require('express').Router()

const Category = require('../model/Category')
const Subject = require('../model/Subject')

const { viewEachCategory, viewCategory } = require('../controllers/category')
const {
  viewSubject,
  viewAllSubjects,
  viewSubjects
} = require('../controllers/subject')


router.get('/category/:catId', viewEachCategory)
router.get('/category', viewCategory)
router.get('/subjects', viewAllSubjects)
router.get('/category/:catId/subjects/',  viewSubjects)
router.get('/category/:catId/subjects/:catId', viewSubject)

module.exports = router

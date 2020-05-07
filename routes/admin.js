const router = require('express').Router()

const Category = require('../model/Category')
const Subject = require('../model/Subject')

const { viewTutor, getAllTutors } = require('../controllers/tutor')
const { authenticateAdmin } = require('../controllers/authentication')
const {
  createCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/category')
const {
  createSubjects,
  updateSubject,
  deleteSubject
} = require('../controllers/subject')

//ADMIN ROUTES
router.get('/tutors/:tutId', authenticateAdmin, viewTutor)
router.get('/tutors', authenticateAdmin, getAllTutors)
router.post('/category', authenticateAdmin, createCategories)
router.put('/category/:catId', authenticateAdmin, updateCategory)
router.delete('/category/:catId', authenticateAdmin, deleteCategory)
router.post('/category/:catId/subjects', createSubjects)

router.put('/category/:catId/subjects/:subId', updateSubject)
router.delete('/category/:catId/subjects/:subId', deleteSubject)

module.exports = router

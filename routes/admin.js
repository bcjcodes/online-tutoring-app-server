const router = require('express').Router()
const Student = require('../model/Student')
const Category = require('../model/Category')
const Subject = require('../model/Subject')

const { viewTutor, getAllTutors } = require('../controllers/tutor')
const {
  authenticateAdmin,
  authenticateStudentAndAdmin
} = require('../controllers/authentication')
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

const {
  viewLesson,
  viewLessons,
  bookLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lesson')

//ADMIN ROUTES
router.get('/tutors/:tutId', authenticateAdmin, viewTutor)
router.get('/tutors', authenticateAdmin, getAllTutors)
router.post('/category', authenticateAdmin, createCategories)
router.put('/category/:catId', authenticateAdmin, updateCategory)
router.delete('/category/:catId', authenticateAdmin, deleteCategory)
router.post('/category/:catId/subjects', createSubjects)

router.put('/category/:catId/subjects/:subId', authenticateAdmin, updateSubject)
router.delete(
  '/category/:catId/subjects/:subId',
  authenticateAdmin,
  deleteSubject
)

router.get('/lessons', authenticateAdmin, viewLessons)
router.get('/lessons/:lessonId', authenticateAdmin, viewLesson)
router.put('/lessons/:lessonId', authenticateAdmin, updateLesson)
router.delete('/lessons/:lessionId', authenticateAdmin, deleteLesson)

//student and admin route
router.post('/lessons', authenticateStudentAndAdmin, bookLesson)

module.exports = router

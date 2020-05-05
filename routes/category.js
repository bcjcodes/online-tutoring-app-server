const router = require('express').Router()

const {
  createCategories,
  viewCategories,
  viewEachCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/category')

router.post('/category', createCategories)
router.get('/category', viewCategories)
router.get('/category/:id', viewEachCategory)
router.put('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)

module.exports = router

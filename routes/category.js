const router = require('express').Router()

const { createCategories, viewCategories } = require('../controllers/category')

router.post('/category', createCategories)
router.get('/category', viewCategories)

module.exports = router

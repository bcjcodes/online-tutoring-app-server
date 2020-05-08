const Category = require('../model/Category')
const Subject = require('../model/Subject')

exports.createCategories = (req, res, next) => {
  const { title } = req.body

  if (!title) {
    res.status(400).send('Please give the category a title')
  }

  Category.findOne({ title }).then(category => {
    if (category) {
      return res.status(423).send('Category exists, create a new category')
    }

    let newCategory = new Category({ title })
    newCategory
      .save()
      .then(() => {
        res.status(200).send('Category created')
      })
      .catch(err => {
        console.log(err)
      })
  })
}

exports.viewEachCategory = (req, res, next) => {
  let categoryId = req.params.catId
  Category.findOne({ _id: categoryId })
    .then(category => {
      res.json(category)
    })
    .catch(err => console.log(err))
}

exports.viewCategory = (req, res, next) => {
  Category.find({}).then(category => {
    res.send(category)
  })
}

exports.updateCategory = (req, res, next) => {
  let categoryId = req.params.catId
  let { title } = req.body

  Category.findByIdAndUpdate(categoryId, { n: title })
    .then(category => {
      if (category) {
        return res.send('Updated Successfully')
      } else {
        res.status(404).send('category does not exist')
      }
    })
    .catch(err => console.log(err))
}

exports.deleteCategory = (req, res, next) => {
  let categoryId = req.params.catId

  Category.findById(categoryId).then(category => {
    if (!category) {
      res.status(404).send('Category not found')
    } else {
      category.remove(err => {
        if (!err) {
          Subject.deleteMany({ category: categoryId }).then(() => {
            res.send(category)
          })
        } else {
          console.log(err)
        }
      })
    }
  })
}

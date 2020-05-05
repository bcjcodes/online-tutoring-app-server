const Category = require('../model/Category')

exports.createCategories = (req, res, next) => {
  const { title } = req.body

  if (!title) {
    res.status(400).send('Please give the category a title')
  }

  Category.findOne({ title }).then(category => {
    if (category) {
      return res.status(423).send('Category exists already, create a new one')
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

exports.viewCategories = (req, res, next) => {
  Category.find({}).then(category => {
    res.send(category)
  })
}

const Category = require('../model/Category')
const Subject = require('../model/Subject')

exports.createSubjects = (req, res, next) => {
  let categoryId = req.params
  let { title } = req.body
  console.log(title)
  if (!title) {
    return res.status(400).send('Please enter subject title')
  }

  Category.findOne({ _id: categoryId }).then(category => {
    if (category) {
      let subject = new Subject({
        title: title,
        category: category._id
      })
      subject
        .save()
        .then(subject => {
          category.subjects.push(subject)
          category.save().then(() => {
            res.send('Subject created successfully')
            console.log(category)
          })
        })
        .catch(err => console.log(err))
    } else {
      res.status(404).send('Category not found')
    }
  })
}

exports.viewSubjects = (req, res, next) => {
  let categoryId = req.params.catId

  Category.findOne({ _id: categoryId }).then(category => {
    if (!category) {
      res.status(404).send('Category not found')
    } else {
      Category.findOne({ _id: categoryId })
        .populate('subjects', 'title category')
        .exec((err, subjects) => {
          if (err) console.log(err)
          res.send(subjects)
        })
    }
  })
}

exports.viewAllSubjects = (req, res, next) => {
  Category.find({})
    .populate('subjects', 'title category')
    .exec((err, subjects) => {
      res.send(subjects)
    })
}

exports.viewSubject = (req, res, next) => {
  let categoryId = req.params.catId
  let subjectId = req.params.subId

  Category.findOne({ _id: categoryId }).then(category => {
    if (!category) {
      res.status(404).send('Category not found')
    } else {
      Category.findOne({ _id: categoryId })
        .populate('subjects', 'title category')
        .exec((err, subjects) => {
          if (err) console.log(err)
          Subject.findOne({ _id: subjectId })
            .then(subject => {
              res.send(subject)
            })
            .catch(err => console.log(err))
        })
    }
  })
}

exports.deleteSubject = (req, res, next) => {
  let categoryId = req.params.catId
  let subjectId = req.params.subId

  Subject.findById(subjectId).then(subject => {
    if (!subject) {
      res.status(404).send('Subject not found')
    } else {
      subject.remove(err => {
        if (!err) {
          Category.updateOne(
            { _id: subject.category },
            { $pull: { subjects: subject._id } },
            function (err, numberAffected) {
              console.log(numberAffected.n)

              Tutor.find({ subjects: { $in: [subjectId] } }).then(tutors => {
                for (let i in tutors) {
                  Tutor.update(
                    { _id: tutors[i]._id },
                    { $pull: { subjects: subject._id } },
                    function (err, numberAffected) {
                      console.log(numberAffected.n)
                    }
                  )
                }
                return res.status(204).send('Deleted Successfully')
              })
            }
          )
        } else {
          console.log(err)
        }
      })
    }
  })
}

exports.updateSubject = (req, res, next) => {
  let { title } = req.body
  let categoryId = req.params.catId
  let subjectId = req.params.subId

  Category.findOne({ _id: categoryId }).then(category => {
    if (!category) {
      res.status(404).send('Category not found')
    } else {
      Category.findOne({ _id: categoryId })
        .populate('subjects', 'title category')
        .exec((err, subjects) => {
          if (err) console.log(err)
          Subject.findByIdAndUpdate(subjectId, {
            title: title
          })
            .then(subject => {
              res.send('Subject updated successfully')
            })
            .catch(err => console.log(err))
        })
    }
  })
}

exports.viewTutorSubjects = (req, res, next) => {
  let categoryId = req.params.catId
  let subjectId = req.params.subId

  Category.findById(categoryId).then(category => {
    if (!category) {
      res.status(404).send('Category not found')
    } else {
      Subject.findById(subjectId).then(subject => {
        if (!subject) {
          res.status(404).send('Subject not found')
        } else {
          Subject.findById(subjectId)
            .populate('tutors', 'title email')
            .exec((err, tutors) => {
              if (err) console.log(err)
              Tutor.find({ subjects: { $in: [subjectId] } }).then(tutors => {
                res.send(tutors)
              })
            })
        }
      })
    }
  })
}

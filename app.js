const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const student = require('./routes/student')
const tutor = require('./routes/tutor')
const admin = require('./routes/admin')
const allUser = require('./routes/allUser')

// Initializing express json Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//DB Config
const db = process.env.MONGODB_URI

//Mongoose Connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

app.use('/api/v1', student)
app.use('/api/v1', tutor)
app.use('/api/v1', admin)
app.use('/api/v1', allUser)

app.get('/', (req, res) => {
  return res.send('Welcome')
})

const port = process.env.PORT

app.listen(port, () => console.log(`Server is listening at port ${port}`))

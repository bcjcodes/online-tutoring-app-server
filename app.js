const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const student = require('./routes/student')
const tutor = require('./routes/tutor')

// Initializing express json Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//DB Config
const db = process.env.MONGO_URI

//Mongoose Connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

app.use('/api/students/v1', student)
app.use('/api/tutors/v1', tutor)

const port = process.env.PORT

app.listen(port, () => console.log(`Server is listening at port ${port}`))

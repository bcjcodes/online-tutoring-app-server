const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

//DB Config
const db = process.env.MONGODB_URI

//Mongoose Connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

const port = process.env.PORT || PORT

app.listen(port, () => console.log(`Server is listening at port ${port}`))

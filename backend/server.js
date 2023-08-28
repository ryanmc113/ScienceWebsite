const express = require('express');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')
const port = process.env.PORT || 5001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/science', require('./routes/scienceRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on ${port}`))
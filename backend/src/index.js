// setting up dependencies
const express = require('express')
const routes = require('./routes/routes')
const { connectDB } = require('./database/postgres')

const app = express()
const port = 3000

// connect database
connectDB()

app.use('/api', routes)

app.listen(port, () => {
    console.log('server run on port ', port)
})
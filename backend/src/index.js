// setting up dependencies
const express = require('express')
const { connectDB } = require('./database/postgres')

const app = express()
const port = 3000

// connect database
connectDB()

app.listen(port, () => {
    console.log('server run on port ', port)
})
// setting up dependencies
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// modul
const routes = require('./routes/routes')
const { connectDB } = require('./database/postgres')
const user = require('./models/User')

const app = express()
const port = 3000

// connect database
connectDB().then(async () => {
    await user.sync()
})

// setting up session
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/api', routes)

app.listen(port, () => {
    console.log('server run on port ', port)
})
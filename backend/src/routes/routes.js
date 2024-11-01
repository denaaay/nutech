const express = require('express')
const router = express.Router()
const middleware = require('../controllers/middleware')
const authController = require('../controllers/auth')

router.get('/', middleware, (_, res) => {
    res.send('hello world')
})

// auth
router.post('/registration', authController.register)
router.post('/login', authController.login)

module.exports = router
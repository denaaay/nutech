const express = require('express')
const router = express.Router()

const middleware = require('../controllers/middleware')
const authController = require('../controllers/auth')
const userController = require('../controllers/user')

router.get('/', (_, res) => {
    res.send('hello world')
})

// auth
router.post('/registration', authController.register)
router.post('/login', authController.login)
router.get('/profile', middleware, userController.profile)
router.put('/profile/update', middleware, userController.updateProfile)

module.exports = router
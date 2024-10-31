const User = require('../models/User')

const createUser = async (email, firstName, lastName, password) => {
    const newUser = User.create({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
    })
    return newUser
}

const getUserByEmail = async (email) => {
    const getUser = User.findOne({where: {email}})
    return getUser
}

module.exports = {
    createUser,
    getUserByEmail,
}
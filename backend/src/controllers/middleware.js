const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const jwt = require('jsonwebtoken')

const checkAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.SESSION_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    message: "Token tidak tidak valid atau kadaluwarsa",
                    data: null,
                })
            } else {
                req.email = decode.email
                next()
            }
        })
    } else {
        return res.status(400).json({
            status: 400,
            message: "Token tidak ditemukan, harap login terlebih dahulu",
            data: null,
        })
    }
}

module.exports = checkAuth
const userRepo = require('../repositories/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const email = req.body.email
        const firstName = req.body.first_name
        const lastName = req.body.last_name
        const password = req.body.password

        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({
                status: 400,
                message: "Semua field harus diisi",
                data: null,
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 400,
                message: "Parameter email tidak sesuai format",
                data: null,
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
        const validatePassword = passwordRegex.test(password)

        if (password.length < 8) {
            return res.status(400).json({
                status: 400,
                message: 'Kata sandi tidak boleh kurang dari 8 karakter',
                data: null,
            })
        }

        if (!validatePassword) {
            return res.status(400).json({
                status: 400,
                message: 'Kata sandi harus terdiri dari setidaknya satu huruf besar, satu huruf kecil, dan satu angka.',
                data: null,
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userRepo.createUser(email, firstName, lastName, hashedPassword)

        const result = {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
        }
        return res.status(201).json({
            status: 201,
            message: "Registrasi berhasil silahkan login",
            data: result
        })
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: `internal server error: ${e.message}`,
            data: null,
        })
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Semua field harus diisi",
                data: null,
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 400,
                message: "Parameter email tidak sesuai format",
                data: null,
            });
        }

        const getUser = await userRepo.getUserByEmail(email)

        if (!getUser) {
            return res.status(404).json({
                status: 404,
                message: "User tidak ditemukan",
                data: null,
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                status: 400,
                message: 'Kata sandi tidak boleh kurang dari 8 karakter',
                data: null,
            })
        }

        const isMatch = await bcrypt.compare(password, getUser.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: "password salah",
                data: null
            })
        }

        req.session.email = getUser.email
        const payload = {
            email: getUser.email,
        }

        const secretKey = process.env.SESSION_KEY
        const jwtToken = jwt.sign(payload, secretKey, { expiresIn: '12h' })

        const result = {
            token: jwtToken
        }

        return res.status(200).json({
            status: 200,
            message: "Login sukses",
            data: result
        })

    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: `internal server error: ${e.message}`,
            data: null,
        })
    }
}

module.exports = {
    register,
    login,
}
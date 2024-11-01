const userRepo = require('../repositories/user')

const profile = async (req, res) => {
    try {
        const userEmail = req.email

        const getUser = await userRepo.getUserByEmail(userEmail)

        if (!getUser) {
            return res.status(404).json({
                status: 404,
                message: "User tidak ditemukan",
                data: null,
            })
        }

        const result = {
            email: getUser.email,
            first_name: getUser.first_name,
            last_name: getUser.last_name,
            profile_image: getUser.profile_image
        }

        return res.status(200).json({
            status: 200,
            message: "Sukses",
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

const updateProfile = async (req, res) => {
    try {
        const userEmail = req.email
        let firstName = req.body.first_name
        let lastName = req.body.last_name

        const getUser = await userRepo.getUserByEmail(userEmail)

        if (!getUser) {
            return res.status(404).json({
                status: 404,
                message: "User tidak ditemukan",
                data: null,
            })
        }

        if (!firstName && !lastName) {
            return res.status(400).json({
                status: 400,
                message: "Semua field harus diisi",
                data: null,
            });
        }

        if (!firstName) {
            firstName = getUser.first_name
        } else if (!lastName) {
            lastName = getUser.last_name
        }

        await userRepo.userUpdate(userEmail, firstName, lastName)

        const result = {
            email: getUser.email,
            first_name: firstName,
            last_name: lastName,
            profile_image: getUser.profile_image
        }

        return res.status(200).json({
            status: 200,
            message: "Sukses",
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
    profile,
    updateProfile,
}
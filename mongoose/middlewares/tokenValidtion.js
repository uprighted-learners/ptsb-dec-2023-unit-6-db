const jwt = require('jsonwebtoken')
const User = require('../model/User')
const JWT_KEY = process.env.JWT_KEY

const tokenValidation = async (req, res, next) => {
    try {
        let authToken = req.headers.authorization
        if (authToken) {
            // remove "Bearer " if present
            authToken = authToken.includes('Bearer')
                ? authToken.split(' ')[1]
                : authToken

            // verify the token
            const payload = jwt.verify(authToken, JWT_KEY)
            if (payload) {
                // check for matching user
                const user = await User.findOne({ _id: payload._id })
                // throw error if no match is found
                if (!user) throw Error("User not found")
                // add user identity to the request
                req.user = user
                // call the next function in the call stack
                next()
            }
        } else {
            throw Error('Forbidden')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `${err}` })
    }
}

module.exports = tokenValidation
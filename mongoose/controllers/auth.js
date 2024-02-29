const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const newUser = new User({ username, email, password: bcrypt.hashSync(password, SALT) })
        await newUser.save()
        res.status(201).json({ message: 'new user created', newUser })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `${err}` })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // find a user with this email
        const foundUser = await User.findOne({ email })
        // check whether the password matches
        const verify = await bcrypt.compare(password, foundUser.password)
        // throw error if it doesn't
        if (!verify) throw Error('Incorrect password')

        // create JWT token
        const token = jwt.sign(
            // payload
            { _id: foundUser.id },
            // key
            JWT_KEY,
            // expire in 24 hours
            { expiresIn: 60 * 60 * 24 }
        )

        res.status(200).json({
            message: 'logged in',
            foundUser,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `${err}` })
    }
})

module.exports = router
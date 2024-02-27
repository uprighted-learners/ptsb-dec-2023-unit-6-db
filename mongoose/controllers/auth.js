const router = require('express').Router()
const User = require('../model/User')

router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json('new user created')
    } catch (err) {
        console.log(err);
    }
})

module.exports = router
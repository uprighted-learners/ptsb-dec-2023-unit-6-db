require('dotenv').config()
const express = require('express')
const { dbConnect } = require('./db')
const app = express()

const PORT = process.env.PORT

const recipeController = require('./controllers/recipes')
const authController = require('./controllers/auth')

app.use(express.json())
app.use('/api', recipeController)
app.use('/auth', authController)

app.listen(PORT, () => {
    dbConnect()
    console.log(`[server] app listening on port ${PORT}`);
})
require('dotenv').config()
const express = require('express')
const { dbConnect } = require('./db')
const tokenValidation = require('./middlewares/tokenValidtion')
const app = express()

const PORT = process.env.PORT

const recipeController = require('./controllers/recipes')
const authController = require('./controllers/auth')

app.use(express.json())
// run token validation before all 'api/' endpoints
app.use('/api', tokenValidation, recipeController)
app.use('/auth', authController)

app.listen(PORT, () => {
    dbConnect()
    console.log(`[server] app listening on port ${PORT}`);
})
/* To use dotenv
    * npm install it
    * add a .env file with your constants defined in it
        * KEY = value
    * add .env to your .gitignore
    * then require, configure, and set up the constants
*/
require('dotenv').config()
const PORT = process.env.PORT

const express = require('express')
const app = express()

// middleware that allows us to interpret request bodies as JSON
app.use(express.json())

const recipeRoutes = require('./controllers/recipes')
app.use('/recipes', recipeRoutes)


// TODO: add a search by ingredient endpoint (and an inverse search)
// TODO: add prep time and search by prep time?
// TODO: add tags and search by tags?

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}) 
const express = require('express')
const app = express()

// import MongoDB tools and create a new client object
const { MongoClient, ObjectId } = require('mongodb')
const client = new MongoClient("mongodb://localhost:27017/")

const PORT = 4000

const dbConnect = async () => {
    try {
        // use client object to connect to the database
        await client.connect()
        // find the correct collection and return it
        const collection = client.db("recipApiData").collection("recipes")
        return collection
    } catch (err) {
        console.log(err);
    }
}

app.get('/recipes', async (req, res) => {
    // open the db connection
    const connect = await dbConnect()
    // query the db for all documents in the collection
    const all = await connect.find().toArray()

    // send a 404 response if the collection is empty
    all.length === 0
        ? res.status(404).json({ message: 'not found' })
        : res.status(200).json(all)
})

app.get('/recipes/find/:id', async (req, res) => {
    // check that the id is of a valid type (does not guarantee it actually exists)
    if (ObjectId.isValid(req.params.id)) {
        const connect = await dbConnect()
        // query the db to find the matching id
        const recipe = await connect.findOne({ _id: new ObjectId(req.params.id) })
        if (recipe) {
            res.status(200).json(recipe)
        } else {
            res.status(404).json('Could not find recipe')
        }
    } else {
        res.status(404).json('Invalid recipe id')
    }
})

app.get('/recipes/search', async (req, res) => {
    const connect = await dbConnect()
    // search by whatever query string parameters the user includes
    const recipes = await connect.find(req.query)
    res.send(recipes)
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}) 
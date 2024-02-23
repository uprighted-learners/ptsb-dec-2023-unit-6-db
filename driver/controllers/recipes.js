require('dotenv').config()
const DB_URL = process.env.DB_URL

const express = require('express')
const router = express.Router()

// import MongoDB tools and create a new client object
const { MongoClient, ObjectId } = require('mongodb')
const client = new MongoClient(DB_URL)

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

router.get('/', async (req, res) => {
    // open the db connection
    const connect = await dbConnect()

    // if there is no query string req.query is {}
    // which will return all, if passed to connect.find() 
    const recipes = await connect.find(req.query).toArray()

    // send a 404 response if the collection is empty
    recipes.length === 0
        ? res.status(404).json({ message: 'not found' })
        : res.status(200).json(recipes)
})


router.get('/find/:id', async (req, res) => {
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


router.put('/update/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const connect = await dbConnect()

        const filter = { _id: new ObjectId(req.params.id) }
        const options = { upsert: false }
        const updateDoc = { $set: req.body }

        const output = await connect.updateOne(filter, updateDoc, options)

        if (output.modifiedCount > 0) {
            res.status(200).json(`Updated ${output.modifiedCount} entries`)
        } else {
            res.status(200).json('No update required')
        }
    } else {
        res.status(404).json('Invalid recipe id')
    }
})

router.delete('/delete/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const connect = await dbConnect()
        const output = await connect.deleteOne({ _id: new ObjectId(req.params.id) })

        if (output.deletedCount > 0) {
            res.status(200).json(`Deleted ${output.deletedCount} entries`)
        } else {
            res.status(200).json('Nothing to delete')
        }
    } else {
        res.status(404).json('Invalid recipe id')
    }
})


module.exports = router
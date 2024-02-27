const router = require('express').Router()
const Recipe = require('../model/Recipe')

router.get('/', async (req, res) => {
    // TODO: look for specific query strings
    const recipes = await Recipe.find(req.query)

    // send a 404 response if the collection is empty
    recipes.length === 0
        ? res.status(404).json({ message: 'not found' })
        : res.status(200).json(recipes)
})


router.get('/find/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id })
        if (recipe) {
            res.status(200).json(recipe)
        } else {
            res.status(404).json('Could not find recipe')
        }
    } catch (err) {
        console.log(`[server] error ${err.message}`)
        res.status(500).json({ message: err.message })
    }
})


router.post('/create', async (req, res) => {
    console.log(req.body)
    try {
        const newRecipe = new Recipe(req.body)
        await newRecipe.save()
        res.status(201).json('success')
    } catch (err) {
        console.log(`[server] error ${err.message}`)
        res.status(500).json({ message: err.message })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const options = { upsert: false }
        const updateDoc = { rating: req.body.rating }

        const output = await Recipe.updateOne(filter, updateDoc, options)

        if (output.modifiedCount > 0) {
            res.status(200).json(`Updated ${output.modifiedCount} entries`)
        } else {
            res.status(200).json('No update required')
        }
    } catch (err) {
        console.log(`[server] error ${err.message}`)
        res.status(500).json({ message: err.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const output = await Recipe.deleteOne({ _id: req.params.id })

        if (output.deletedCount > 0) {
            res.status(200).json(`Deleted ${output.deletedCount} entries`)
        } else {
            res.status(200).json('Nothing to delete')
        }
    } catch (err) {
        console.log(`[server] error ${err.message}`)
        res.status(500).json({ message: err.message })
    }
})


module.exports = router
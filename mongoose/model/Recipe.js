const { mongoose } = require('../db')

const Recipe = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 150,
            validate: /[a-zA-Z\s]/
        },
        author: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: false,
            min: 1,
            max: 5,
        },
        ingredients: {
            type: [String],
            required: true
        },
    },
    { timestamps: true }
)

// ? Generate a collection by creating a "model"
module.exports = mongoose.model("recipe", Recipe)
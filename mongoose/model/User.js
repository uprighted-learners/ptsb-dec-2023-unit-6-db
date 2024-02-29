const { mongoose } = require('../db')

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            maxLength: 70
        },
        email: {
            // TODO: add uniqueness constraint
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("user", User)
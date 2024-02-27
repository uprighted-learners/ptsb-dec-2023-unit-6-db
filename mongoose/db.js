const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log(`[db] connected to: ${DB_URL}`);
    } catch (err) {
        console.log(`[db] error: ${err}`);
    }
}

module.exports = { dbConnect, mongoose }
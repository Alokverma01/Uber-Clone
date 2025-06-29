const mongoose = require("mongoose");


const connectDB = async() => {
    try {
        const client = await mongoose.connect(process.env.mongodbURI);
        console.log("DB is connected ✅");
    } catch (error) {
        console.log("DB connection failed ❌", error.message);
    }
}

module.exports = connectDB;
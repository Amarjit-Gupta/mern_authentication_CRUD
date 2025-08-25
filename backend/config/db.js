const mongoose = require("mongoose");
const DB_URL = process.env.DATABASE_URL;

const connect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("database connected");
    }
    catch (err) {
        console.log("connection failed: ", err);
    };
}

module.exports = connect;

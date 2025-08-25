const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }  
});

const User = mongoose.model("students", userSchema);
module.exports = User;


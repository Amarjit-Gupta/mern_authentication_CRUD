const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
    category: { type: String },
    company: { type: String }
});

const Data = mongoose.model("schools", dataSchema);
module.exports = Data;
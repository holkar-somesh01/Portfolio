const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hero: { type: String, required: true },
    desc: { type: String, required: true },
    url: { type: String, required: true }
})
module.exports = mongoose.model("Blog", blogSchema)
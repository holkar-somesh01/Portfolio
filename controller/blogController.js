const upload = require("../utils/upload")
const Blog = require("./../model/Projects")

exports.getAllBlogs = async (req, res) => {
    try {
        const result = await Blog.find()
        res.json({ message: "Blog Get Success", result })
    } catch (error) {
        res.status(400).json({ message: "Blog controller Error", error: error.message })
    }
}
exports.addBlog = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.json({ message: "Multer Error" })
            }
            await Blog.create({ ...req.body, hero: req.file.filename })
            res.json({ message: "Blog Add Success" })
        })
    } catch (error) {
        res.status(400).json({ message: "Blog controller Error", error: error.message })
    }
}
exports.updateBlog = async (req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: "Blog Update Success" })
    } catch (error) {
        res.status(400).json({ message: "Blog Controller Error", error: error.message })
    }
}
exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.json({ message: "Blog Delete Success" })
    } catch (error) {
        res.status(400).json({ message: "Blog Controller Error", error: error.message })
    }
}
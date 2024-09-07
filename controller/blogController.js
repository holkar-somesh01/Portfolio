const { checkEmpty } = require("../utils/checkEmpty")
const cloudinary = require("../utils/cloudinary.config")
const upload = require("../utils/upload")
const Blog = require("./../model/Projects")
const asyncHandler = require("express-async-handler")

exports.getAllBlogs = asyncHandler(async (req, res) => {
    const result = await Blog.find()  
    res.json({message:"PROJECTS FETCHED", result})
})
exports.addBlog = asyncHandler( async(req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "File upload error", error: err.message });
        }
        const { name, desc, url } = req.body;
        const { isError, error } = checkEmpty({ name, desc, url });
        if (isError) {
            return res.status(401).json({ message: "All Fields Required", error: error });
        }
        let images=''
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path)
            images = secure_url
        }else{
            res.status(400).json({message:"Images is Required"})
        }
        await Blog.create({ name, desc, url, hero : images})
        res.json({ message: "Project Successfully Added" })
    })
})
exports.updateBlog = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const {name, desc, url} = req.body
        const { isError, error } = checkEmpty({name, desc, url})
        if (isError) {
            return res.status(401).json({ message: "All Fields Required ", error: error })
        }
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        await Blog.findByIdAndUpdate(req.params.id, {...req.body, hero :secure_url})
        res.json({ message: "Project SuccessFully Updated" })
    })
})
exports.deleteBlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: "Project SuccessFully Deleted." })
})
const router = require("express").Router()
const blogController = require("./../controller/blogController")

router
    .get("/", blogController.getAllBlogs)
    .post("/add", blogController.addBlog)
    .put("/:id", blogController.updateBlog)
    .delete("/:id", blogController.deleteBlog)

module.exports = router
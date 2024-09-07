const router = require("express").Router()
const blogController = require("./../controller/blogController")

router
    .get("/fetch-post", blogController.getAllBlogs)
    .post("/add-post", blogController.addBlog)
    .put("/update-post/:id", blogController.updateBlog)
    .delete("/delete-post/:id", blogController.deleteBlog)

module.exports = router
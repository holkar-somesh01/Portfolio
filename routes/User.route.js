const UserRouter = require("express").Router()
const UserController = require("./../controller/user.Controller")

UserRouter
    .get("/", UserController.getAllUser)
    .post("/", UserController.addUser)
    .put("/:id", UserController.updateUser)
    .delete("/:id", UserController.deleteUser)

module.exports = UserRouter
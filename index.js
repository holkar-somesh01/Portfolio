const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.static("uploads"))
app.use(cors({
    origin: true,
    credentials: true
}))

app.use("/api/blogs", require("./routes/blog.route"))
app.use("/api/users", require("./routes/User.route"))
app.use("*", (req, res) => {
    res.status(400).json({ message: "Resource Not Found" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Something Went wrong", error: err.message })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    app.listen(process.env.PORT, console.log("SERVER RUNNING 🏃‍♂️"))
    console.log("MONGO CONNECTED")
})

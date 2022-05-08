const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoriesRoute = require("./routes/categories")
const multer = require('multer')

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(console.log("database connected"))
    .catch((err)=>console.log(err)
)

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "images")
    },
    filename: (req, file, cb)=>{
        cb(null, "hello.jpeg")
    }
})

const upload = multer({storage: storage})

app.post("/server/upload", upload.single("file"), (req, res)=>{
    res.status(200).json("File has been uploaded")
})

app.use("/server/auth", authRoute)
app.use("/server/users", userRoute)
app.use("/server/posts", postRoute)
app.use("/server/categories", categoriesRoute)

app.listen("5000", ()=>{
    console.log('Backend is running')
})


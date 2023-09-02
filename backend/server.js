import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.get("/", (req, res) => {
    res.json({msg: "Welcome"})
})

mongoose
    .connect(process.env.mongoDBCONNECT)
    .then(() => {
        console.log("db connected")
        app.listen(PORT, ()=>{
            console.log(`App is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

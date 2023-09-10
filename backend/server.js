import express, { response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import { Book } from "./models/bookModel.js"

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json({msg: "Welcome"})
})

app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).json(books)
    } catch (error) {
        console.log(error.message)
        response.status(400).json({error: error.message})
    }
})


app.post("/api/books", async (req, res) => {
    const { title, author, pubYear } = req.body

    if(!title || !author || !pubYear){
        return res.status(400).send({
            message: "Book info incomplete! Make sure you input title, author, and publish year"
        })
    }

    try {

        const book = await Book.create({title, author, pubYear})

        return res.status(200).json(book)

    } catch (error) {
        console.log(error.message)
        response.status(400).json({error: error.message})
    }
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

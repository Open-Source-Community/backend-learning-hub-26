import dotenv from "dotenv"
import express from "express"
import {router} from "./routes/routes"
import cookieparser from "cookie-parser"
dotenv.config()
const Port = process.env.PORT || 3000

const app =express()


app.use(cookieparser())
app.use(express.json())

app.use("/auth", router)

app.listen(Port ,() => {
console.log (`server is runnimg on port ${Port}`)
}
)


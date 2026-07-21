import express from "exress"
import dorenv from "dorenv"
import cookieParser from "cookieParser"

dorenv.config()

const PORT =process.env.PORT
const app =express()

app.use(express.json())
app.use(cookieParser)

app.listen(PORT ,()=>{
  console.log("server is running")
}) 



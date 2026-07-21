import * as express from "express";
import productroute from "./router/product.router"

const app = express() // creat express application server
const port:number=3000

app.use(express.json()) // convert body to object
app.use("/products",productroute) // define common route 

app.listen(port,()=>{
    console.log("server started!");
    
})



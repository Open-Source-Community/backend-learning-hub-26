import express from 'express';
import {Request,Response} from 'express'

const app = express();

app.use(express.json());

const PORT = 3000

app.get('/',(req:Request,res:Response)=>{
    res.send('Hello World');
})

app.post('/omnia',(req:Request,res:Response)=>{
    res.send('Hello Omnia');
})

//URL PARAMETER
// http://localhost:3000/anyname
app.get('/:y',(req:Request,res:Response)=>{
    const x = req.params.y;
    console.log(`hello ${x}`)
})

//QUERY PARAMETER
// http://localhost:3000/hello?name=anyname
app.get('/:hello',(req:Request,res:Response)=>{
    const name = req.query.name;
    console.log(`hello ${name}`)
})

//REQUEST BODY
// http://localhost:3000/sum  //in request body { "num1":"1" , "num2":"2" }
app.get('/sum',(req:Request,res:Response)=>{
    const a = Number(req.body.num1);
    const b = Number(req.body.num2);
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is ${sum}`);
})

app.listen(PORT,()=>{
    console.log(`Server is running `);
})


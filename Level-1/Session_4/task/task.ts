import http from 'http';


const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end("Welcome to Cairo Metro Control — Line 3")
        console.log(req.method,req.url)
    }if(req.url==='/next-train'){
        const time=new Date().toLocaleString();
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end(time);
        console.log(req.method,req.url)
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end("Platform not found")
        console.log(req.method,req.url)
    }
})

server.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
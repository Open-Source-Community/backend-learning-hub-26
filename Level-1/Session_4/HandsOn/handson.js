import http from 'http';

// Create the server
const server = http.createServer((req, res) => {

  // Stretch goal: log every incoming request, before responding
  console.log(req.method, req.url);

  const url = req.url;

  // Route 1: Home page
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
  }

  // Route 2: Current time
  else if (url === '/time') {
    const currentTime = new Date().toLocaleString();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Current time is: ${currentTime}`);
  }

  // Anything else: 404 - Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
  }

});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running!');
  console.log('Visit: http://localhost:3000');
  console.log('Visit: http://localhost:3000/time');
});

/*
HOW TO RUN:
1. Save this file 
2. Run: node file.js
3. Open browser: http://localhost:3000

HOW TO TEST:
- Go to http://localhost:3000/         → See "Hello, World!"
- Go to http://localhost:3000/time     → See the current time
- Go to http://localhost:3000/anything → See "404 - Not Found"
- Watch your terminal while you click around — every request gets logged
  as "GET /", "GET /time", etc. That's req.method and req.url in action.
*/
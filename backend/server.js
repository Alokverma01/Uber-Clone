const http = require("http");
const app = require('./app');


const PORT = process.env.port || 3000;
const server = http.createServer(app);


server.listen( PORT, () => {
    console.log(`server is listning at ${PORT} 🚀`)
})

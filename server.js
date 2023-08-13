const express = require("express");
const http = require("http");
const app = express();

const PORT = 2000;

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require("path");
const uuid=require("uuid");
global.redisClient=require("./lib/redis/main");
global.io=io;
require("./lib/sockets/index");


app.get('/favicon.ico', (req,res)=>{
    res.status(200).send({"message":"nothing"})
    return;
});
app.get("/", (req, res) => {
    const id=uuid.v4();
    res.redirect(`/${id}`);
})
app.use(express.static(path.join(__dirname,'client')));

app.get("/:uid",(req,res)=>{
    res.status(200).sendFile('client/index.html',{root:__dirname});
    return;
})

server.listen(PORT, (err) => {
    if (err)
        console.log(err);
    else
        console.log(`Server Listening at ${PORT}`);
});



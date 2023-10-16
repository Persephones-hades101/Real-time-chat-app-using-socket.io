//import all important modules
const express=require('express');
const app=express();
require("dotenv").config();
const server=require('http').createServer(app);// why is this line is included? read faq.txt to know the answer
const {Server}=require('socket.io');

const io=new Server(server);

// socket.io
io.on("connection",(socket)=>{
  console.log("a new user has connected"); 
  socket.on("messageToServer",(messageData)=>{
    console.log(messageData);
    socket.broadcast.emit("messageFromServer",messageData);
  })
})

// const bodyParser=require('body-parser');
// const ejs=require('ejs');
// const mongoose=require('mongoose')

// making connections to mongodb database
// mongoose.connect("mongodb://127.0.0.1:27017");


// set middleware and specifying engine for ejs
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// defning Routes.
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
})




const port=process.env.PORT;
// listening to the port 3000
server.listen(port ,()=>{
  console.log("server is running on port 3000");
})
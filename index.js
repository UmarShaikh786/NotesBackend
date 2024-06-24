const express=require('express')
const mongoose = require('mongoose');
const cors=require('cors')
//Set up default mongoose connection
const mongoDB = 'mongodb+srv://umarshaikh641:umar%402002@cluster0.u194zv7.mongodb.net/notesapp';
mongoose.connect(mongoDB, { useNewUrlParser: true });
 //Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', ()=>{
    console.log("Error in Connection")
});
db.on('open',()=>console.log("Mongodb Connected..."));

const app=express()
const port=5000
const userRouter=require('./routes/user')
const notesRouter=require('./routes/notes')
app.use(cors({
    origin:"https://make-notes-app.vercel.app",
    credentials:true
}))
app.use(express.json())
app.use(userRouter)
app.use(notesRouter)
app.get("/",(req,res)=>{
 res.send("Hello User")
})
app.listen(5000,()=>{
    console.log("server has started!")
})

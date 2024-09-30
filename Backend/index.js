import bodyParser from 'body-parser';
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from "./Routes/userRouter.js"
// paurasmore22
// VNn96zJgWMqDBubx




const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin:'http://localhost:5173',
  methods:["GET","POST","PUT","DELETE","PATCH"],
  credentials:true
}))
app.get('/',(req,res)=>{
  res.send("Hello")
})

app.use('/api/user',userRouter)


mongoose.connect("mongodb+srv://paurasmore22:VNn96zJgWMqDBubx@cluster0.yt5zb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
  dbName:"Codestorm"
}).then(()=>{
  console.log("Connected Sucessfully !")
})





app.listen(1000,()=>{
  console.log(`Listening on port 1000`)
})
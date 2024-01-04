const express=require("express");
const app=express();
//require('dotenv').config()
const mongoose=require("mongoose");
const cors=require("cors");
const UserModel=require("./models/Users");
app.use(express.json());
app.use(cors());
mongoose.connect("<----connection string-------->",{dbName:"GoogleKeep"});

app.get("/getUsers",(req,res)=>{
    console.log("hello");

    UserModel.find({}).then((result)=>{
        res.json(result);
    });
});

app.post("/createUser", async (req, res) => {
    const data = req.body;
    await UserModel.insertMany(data)
    res.json(data);
  });

app.post(`/delete`,async (req,res)=>{
    const data=req.body;
    console.log("in delete function",data);
    await UserModel.deleteOne(data)
    res.json(data);
})

app.listen(4000,()=>{
    console.log("server is started");
})

//mongodb://localhost:27017/

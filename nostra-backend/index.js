const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userModel=require("./models/userModel");
const cors=require("cors")
require("dotenv").config()

const app = express();
app.use(cors())

app.use(express.json())


app.post("/register",(req,res)=>{
    let userCredentials=req.body;

    bcrypt.genSalt(10,(err,salt)=>{
        if(!err){
            bcrypt.hash(userCredentials.password,salt,(err,phash)=>{
                if(!err){
                userCredentials.password=phash;
                userModel.create(userCredentials).then(()=>{
                    res.status(201).send({message:"user registered"})
                }).catch((err)=>{
                    res.status(500).send({message:"some problem"})
                })
                }
            })
        }
    })
})


app.post("/login",(req,res)=>{
    let userCredentials=req.body;
    
    userModel.findOne({email:userCredentials.email}).then((user)=>{
        if(user != null){
            bcrypt.compare(userCredentials.password,user.password,(err,result)=>{
                if(result === true){
                    jwt.sign({email:userCredentials.email},process.env.JWT_TOKEN,(err,token)=>{
                        if(!err){
                            res.status(200).send({message:"login success",name:user.name,token:token})
                        }
                    })  
                }
                else{
                    res.status(403).send({message:"wrong password"})
                }
            })
        }
        else{
            res.status(404).send("email doesn't exist")
        }
    })
})


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err)
})

const PORT = process.env.PORT || 8000;
app.listen("8000",()=>{
    console.log(`server connected on ${PORT}`)
})
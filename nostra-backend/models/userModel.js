const mongoose=require("mongoose");



let userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
},{timestamps:true})

let userModel = mongoose.model("users",userSchema)

module.exports = userModel;
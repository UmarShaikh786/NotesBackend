const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    avatar:{
        type:String,
        required:true,  
    }
    ,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:20
    }
})
module.exports=mongoose.model("Users",UserSchema)
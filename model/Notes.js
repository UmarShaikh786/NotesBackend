const mongoose=require('mongoose')

const notesSchema=mongoose.Schema({
    subject:
    {
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    saved:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
    
},
{
    timestamps:true
}
)
module.exports=mongoose.model('Note',notesSchema)
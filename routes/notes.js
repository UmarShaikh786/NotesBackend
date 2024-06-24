const router=require('express').Router()
const Note=require('../model/Notes')

router.post("/addnote",async(req,res)=>{
    const {subject,note,userId}=req.body
    const newNote=new Note({
        subject:subject,
        note:note,
        user:userId
    })
    try{
        const savedNote=await newNote.save()
        res.json({msg:'message saved',status:true,savedNote})
        }catch(err){
            res.status(400).json({message:err.message})
            }
})

router.get("/getnotes/:id",async(req,res)=>{
    const userId=req.params.id
    try{
        const noteData=await Note.find({user:userId}).sort({createdAt:-1})
        res.json({status:true,msg:"Data Retrieved",noteData})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

router.delete("/deletenote/:id",async(req,res)=>{
    const userId=req.params.id;
    // console.log(userId)
    try{
        const deleteData=await Note.findByIdAndDelete({_id:userId})
        // console.log(deleteData)
        res.json({status:true,msg:"Data Deleted",deleteData})
    }catch(err){
        res.status(400).json({message:err.message})
        // console.log(err)
    }
})

router.put("/updatenote/:id",async(req,res)=>{
    const noteId=req.params.id
    const {subject,note}=req.body
    try{
        const noteData=await Note.findByIdAndUpdate(noteId,{subject:subject,note:note})
        res.json({status:true,msg:"Data Updated",noteData})

    }catch(err)
       {
            res.status(400).json({message:err.message})
     }
})

router.put("/savingnote/:id",async(req,res)=>{
    const noteId=req.params.id
        const {saved}=req.body
    // console.log(saved)
    try{
        if(saved=="saved")
            {
                const noteData=await Note.findByIdAndUpdate(noteId,{saved:true})
                res.json({status:true,msg:"Note Saved",noteData})
            }
            else
            {
                const noteData=await Note.findByIdAndUpdate(noteId,{saved:false})
                res.json({status:true,msg:"Note Unsaved",noteData})
            }

    }catch(err)
       {
            res.status(400).json({message:err.message})
     }
})
module.exports=router
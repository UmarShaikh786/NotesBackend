const router=require('express').Router()
const User=require('../model/User')
const bcrypt=require('bcryptjs')

router.post("/register",async(req,res)=>{
    const {avatarImage,name,email,password}=req.body
    const emailCheck=await User.findOne({email:email})
    const hashPassword=bcrypt.hashSync(password,10)
    
    if(emailCheck)
        {
            res.status(400).json({message:"Email already exists"})
        }
 else{

     const user=new User({
         avatar:avatarImage,
         name,
         email,
         password:hashPassword
        })
        user.save().then((user)=>{
            res.json({message:"Data Inserted",status:true,user})
        })
    }
        
       
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
        
    try {
        const user = await User.findOne({ email: email });
       
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.json({ status: true, message: 'User Fetched', user: user });
            } else {
                res.json({ status: false, message: 'Invalid Credentials'});
            }
        } else {
            res.json({ status: false, message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server Error' });
    }
});

router.put("/editAvatar/:id",async(req,res)=>{
    const _id=req.params.id
    const {avatarImage}=req.body
    try{
        const updatedAvatar=await User.findByIdAndUpdate(_id,{avatar:avatarImage},{new:true})
        res.json({status:true,message:'Avatar Updated',updatedAvatar})

    }catch(err)
    {
        console.log(err)
    }
})

router.put("/edituserdata/:id",async(req,res)=>{
    const _id=req.params.id
    const {username,email}=req.body
    

            try{
                const updatedUser=await User.findByIdAndUpdate(_id,{name:username,email:email},{new:true
                })
                res.json({status:true,message:'User Data Updated',updatedUser})
            }catch(err)
            {
                console.log(err)
            }
            
        
})

module.exports=router
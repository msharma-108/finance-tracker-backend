const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const users=require("../models/usermodel")
// Register route
router.post("/register", async (req, res) => {
  const {username,email,password}=req.body
  console.log("here")
    if( !username || !password || !email) return res.json({success:false,message:"Missing details"})
    try{
        const existinguser=await users.findOne({email})
        if(existinguser) return res.json({success:false , message:"This user already exists"})
        const hashedpassword=await bcrypt.hash(password,10)
        const user=new users({username,email,password:hashedpassword})
        await user.save()       
        return res.json({success:true})
    }catch(e){
        res.json({success:false,message:e.message+"ashdhsakd"})
    }
});

// Login route
router.post("/login", async (req, res) => {
  const{email,password}=req.body
  if(!email || !password) return res.json({success:false,message:"Email and password are required"})
  try{
      const user= await users.findOne({email})  
      if(!user) return res.json({success:false,message:"User not found"})
      const passmatch=await bcrypt.compare(password,user.password)
      if(!passmatch) return res.json({success:false,message:"Incorrect password"})
      const token=jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"1d"})
      res.cookie("token",token,{
          httpOnly:true,
          secure:process.env.NODE_ENV ==="production",
          sameSite: process.env.NODE_ENV==="production"?"none":"strict",
          maxAge:24*60*60*1000
      })  
      return res.json({success:true})
  }catch(e){
      res.json({success:false,message:e.message})
  }
});


router.post("/logout",(req,res)=>{
  try{
    res.clearCookie("token",{
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
        sameSite: process.env.NODE_ENV==="production"?"none":"strict", 
    })
    return res.json({success:true,message:"User logged out"})
}catch(e){
    res.json({success:false,message:e.message})
}
})


router.post("/transaction",async (req,res,next)=>{
    const {transactionData,email}=req.body
    try{
        const user=await users.findOne({email})
        user.transactions.unshift(transactionData);
        const newTransactions=user.transactions
        await user.save()
        return res.json({success:true,newTransactions})
    }catch(err){
        return res.json({success:false})
    }
})


router.patch("/:id/edit",async (req,res,next)=>{
    const {id}=req.params
    const {transactionData,email}=req.body
    console.log(req.body)
    try{
        const user=await users.findOne({email})
        const transaction = user.transactions.id(id); 
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }  
        Object.keys(transactionData).forEach(key => {
            if (key in transaction) {
                transaction[key] = transactionData[key];
            }
        });
        await user.save();
        res.status(200).json({ message: "Transaction updated", transactions:user.transactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }

})

router.patch("/:id/delete",async(req,res,next)=>{ 
    const {id}=req.params
    const {email}=req.body
    console.log(id)
    try{
        const updatedUser = await users.findOneAndUpdate(
            { email }, 
            { $pull: { transactions: { _id: id } } }, 
            { new: true } 
          );
          return res.json({success:true,transactions:updatedUser.transactions})

    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
})

module.exports = router;

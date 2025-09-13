const express=require("express")
const app=express()
const cors = require('cors');
const cookieparser=require("cookie-parser") 
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const users=require("./models/usermodel")
require("dotenv").config();
app.get("/",(req,res)=>{
    return res.send("Welcome to app")
})
const userRoutes=require("./routes/userRouter")
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true               
  }));
app.get("/api/auth/check", async(req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false ,message:"no token" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
        const user=await users.findById(decoded.user._id)
      return res.json({ loggedIn: true,user });
    } catch(err) {
      console.log(err)
      return res.json({ loggedIn: false }); 
    }
  });


app.use(userRoutes)

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB connected")
}).catch((error)=>console.log(error))


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}`) 
})
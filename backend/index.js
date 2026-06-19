const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const Company = require("./models/Company");
const User=require("./models/User")
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware =
require("./middleware/authMiddleware");
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Placement Tracker Backend Running");
});


mongoose.connect("mongodb+srv://Akash:akashsharma@cluster0.rmwkrog.mongodb.net/?appName=Cluster0")
.then(()=>{
  console.log("Mongo Db Connected")
})
.catch((err)=>{
console.log(err)
})

app.listen(5000, () => {
  console.log("Server running on port 5000");
});





app.post("/companies",  authMiddleware,async (req,res)=>{
  await Company.create(req.body)

  res.json({
    message:"company added"
  })
})


app.get("/companies/:email",  authMiddleware,  async (req,res)=>{
  const companies=await Company.find({userEmail:req.params.email});
    res.json(companies)
})

app.delete("/companies/:id",  authMiddleware,async (req,res)=>{
  await Company.findByIdAndDelete(req.params.id)
  

  res.json({
    message:"company deleted"
  })
})

app.put("/companies/:id",  authMiddleware,async (req,res)=>{
  await Company.findByIdAndUpdate(req.params.id,req.body)


  res.json({
    message:"comany updated"
  })
})





app.post("/signup", async (req, res) => {

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    10
  );

  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  res.json({
    message: "User Created"
  });

});

app.post("/login",async(req,res)=>{
  const user=await User.findOne({
    email:req.body.email
  })
  if(!user){
    return res.json({
      message:"User Not Found"
    })
  }
  
  

const isMatch=await bcrypt.compare(req.body.password,user.password)
if(!isMatch){
  return  res.json({
    message: "Wrong Password",
  
  });
}

  const token=jwt.sign(
    {
      email:user.email
    },"akash_secret_key"
  )
   res.json({
    message: "Login Success",
    token:token
  });
})

app.get("/profile/:email",  authMiddleware, async(req,res)=>{

  const user = await User.findOne({
    email:req.params.email
  });

  res.json(user);

})

app.put("/profile/:email", async(req,res)=>{

 await User.findOneAndUpdate({
    email:req.params.email
  },req.body);

  res.json({
    message:"profile Updated"
  });

})

app.put("/change-password",async(req,res)=>{
  
    const user = await User.findOne({
    email: req.body.email
  });
    if (!user) {
    return res.json({
      message: "User Not Found"
    });
  }
  if(
  !req.body.currentPassword
){
  return res.json({
    message:
    "Current Password Required"
  });
}
if(
  !req.body.newPassword
){
  return res.json({
    message:
    "New Password Required"
  });
}
   const isMatch = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
 if (!isMatch) {
    return res.json({
      message: "Current Password Incorrect"
    });
  }
  console.log(
  "isMatch =",
  isMatch
);

  const hashedPassword = await bcrypt.hash(
    req.body.newPassword,
    10
  );

  await User.findByIdAndUpdate(
    user._id,
    {
      password: hashedPassword
    }
  );

  res.json({
    message: "Password Updated Successfully"
  });
})
const mongoose =require("mongoose")
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
university:{
    type:String,
    default:""
},
branch:{
    type:String,
    default:""
  },

  graduationYear:{
    type:String,
    default:""
  },

  github:{
    type:String,
    default:""
  },

  linkedin:{
    type:String,
    default:""
  },

  skills:{
    type:[String],
    default:[]
  },

  targetCompany:{
    type:String,
    default:""
  }

})
module.exports=mongoose.model("User",userSchema);
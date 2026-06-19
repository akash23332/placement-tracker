const mongoose=require("mongoose")

const companySchema= new mongoose.Schema({
    name:String,
    status:String,
    appliedDate: String,
    notes: String,
    userEmail:String
})
module.exports=mongoose.model("Company",companySchema)
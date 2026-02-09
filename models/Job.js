const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    company : {
        type : String,
        required: [true,"plass porvide company name"],
        maxlength: 30
    },
    position : {
        type: String ,
        required : [true, "plass provide position"],
        maxlength : 50
    },
    status : {
        type:String ,
        enum:["interview","declined","pending"],
        default:"pending"
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref:"User",
        required: [true, "plass provide user"]
    }
},{timestamps:true})

module.exports = mongoose.model("Job",jobSchema)
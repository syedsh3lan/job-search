import mongoose from "mongoose";
const {Schema , model} = mongoose
//create app collection

const applicationSchema = new Schema ({
    jobId :{
        type : Schema.Types.ObjectId ,
        ref : 'Job',
        require : true 
    },
    userId : {
        type : Schema.Types.ObjectId ,
        ref : 'User',
        require : true 
    },
    userTechSkills :{
        type : [String],
        require : true
    },
    userSoftSkills :{
        type : [String],
        require : true
    }
    
},
{timestamps:true})

export default mongoose.models.Application || model("Application" , applicationSchema)
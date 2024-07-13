import mongoose from "mongoose";
const {Schema , model} = mongoose



//create job collection
const jobSchema = new Schema({
    jobTitle :{
        type : String,
        require:true ,
    },
    jobLocation :{
        type :String,
        enum : ['onsite','hybrid','remotely'],
        default:'onsite'
    },
    workingTime:{
        type :String,
        enum : ['part-time','full-time '],
        default:'full-time '
    },
    seniorityLevel :{
        type:String ,
        enum:['Junior', 'Mid-Level', 'Senior','Team-Lead', 'CTO' ],
        default:'junior'
    },
    jobDescription :{
        type :String ,
    },
    technicalSkills :{
        type : [String],
    },
    softSkills :{
        type : [String],
    },
    addedBy : {
        type : Schema.Types.ObjectId ,
        ref : 'User'
    },
    companyID:{
        type:Schema.Types.ObjectId,
        ref:'Company',
        
    

    }
},{timestamps:true})


export default mongoose.models.Job || model('Job', jobSchema)
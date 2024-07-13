
import mongoose from "mongoose";
const { Schema , model } = mongoose;


//create company collection
 const companySchema = new Schema({


    companyName : {
        type : String ,
        require : true,
        unique : true
    },
    description :{
        type: String,
        required: true
       
    },
    industry :{
        type: String,
        required: true
        
    },
    address:{
        type : String ,
        required: true
    },
    numberOfEmployees :{
        type : String ,
        enum:['1-10','11-20','21-40','41-90','91-130','131-200','201-300','301-500','500-800']
    },
    companyEmail :{
        type : String ,
        require : true,
        unique : true
    },
    companyHR:{
       type : Schema.Types.ObjectId,
       ref : 'User',
       required: true

    },
 },
 {timestamps: true}
)

export default mongoose.models.Company || model("Company" , companySchema)
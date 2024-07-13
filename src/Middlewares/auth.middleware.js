import jwt from "jsonwebtoken"
import User from "../../DB/models/user.model.js"

export const auth = ()=>{
    return async(req ,res ,next)=>{
        try {
            //get token from the headers
            const {token} = req.headers ;
            //check if no token sent 
            if(!token){
                return res.status(400).json({message : "plz login first ,there is no token"})
            }
            //check if the token did not has prefix
            if(!token.startsWith(process.env.PREFIX_TOKEN)){
                return res.status(400).json({message : "invalid token"})
            }
            // split the token and take the token only with out prefix
            const originalToken = token.split(" ")[1]
            

            //decode el token
            const decodedData = jwt.verify(originalToken ,process.env.SIGNATURE)
            
            if(!decodedData?._id){
                return res.status(400).json({message : "invalid token payload"})
            }

            //find user to use it in another middlewares
            const user =await User.findById(decodedData?._id)
            if(!user){
                return res.status(404).json({message : "plz signup "})
            }
            req.authUser = user ;
            next()
        
        } catch (error) {
            console.log(error);
            res.status(500).json({message : "some thing went wrong"})
        }
    }
}
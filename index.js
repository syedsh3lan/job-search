import express from "express"
import { config } from "dotenv";



import { connection_db } from "./DB/connection.js";
import { globalResponse } from "./src/Middlewares/error-handle.middleware.js";
import userRouter from "./src/modules/user/user.routes.js"
import companyRouter from "./src/modules/company/company.routes.js"
import jobRouter from "./src/modules/job/job.routes.js"

const app = express()

config()

let port = process.env.PORT; 

app.use(express.json())


app.use("/user",userRouter)
app.use("/company",companyRouter )
app.use("/job",jobRouter )



app.use(globalResponse)


connection_db()

app.listen(port , console.log(`connected is done in port : ${port}`) )
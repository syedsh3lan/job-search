import { Router } from "express";
import * as jobController from './job.controller.js'

import { auth } from "../../Middlewares/auth.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { errorHandle } from "../../Middlewares/error-handle.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { jobSchema } from "./job.schema.js";
import { systemRoles , roles } from "../../utils/system-roles.utils.js";



const router = Router()



router.post('/addJob',auth(),authorization(systemRoles.COMPANY_HR),errorHandle(validationMiddleware(jobSchema.addJobSchema)), errorHandle(jobController.addJob))
router.put('/updateJob/:jobId',auth(),authorization(systemRoles.COMPANY_HR),errorHandle(validationMiddleware(jobSchema.updateJobSchema)), errorHandle(jobController.updateJob))
router.delete('/updateJob/:jobId',auth(),authorization(systemRoles.COMPANY_HR),errorHandle(validationMiddleware(jobSchema.deleteJobSchema)), errorHandle(jobController.deleteJob))
router.get('/getAllJobs',auth(),authorization(roles.USER_COMPANY_HR), errorHandle(jobController.getAllJobs))
router.get('/getJobsForSpCompany',auth(),authorization(roles.USER_COMPANY_HR),errorHandle(validationMiddleware(jobSchema.getJobWithSpCompany)) ,errorHandle(jobController.getJobsForSpCompany))





export default router
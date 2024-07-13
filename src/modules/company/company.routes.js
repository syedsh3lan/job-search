import { Router } from "express";

import * as companyController from './company.controller.js'
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { auth } from "../../Middlewares/auth.middleware.js";
import { errorHandle } from "../../Middlewares/error-handle.middleware.js";
import { companySchema } from "./company.schema.js";
import {authorization} from "../../Middlewares/authorization.middleware.js"
import {systemRoles , roles} from "../../utils/system-roles.utils.js"



const router = Router()

router.post('/addCompany',auth(),authorization(systemRoles.COMPANY_HR),errorHandle(validationMiddleware(companySchema.addCompanySchema)),errorHandle(companyController.addCompany))
router.put('/updateCompany/:companyId',auth(),authorization(systemRoles.COMPANY_HR),errorHandle(validationMiddleware(companySchema.updateCompanySchema)),errorHandle(companyController.updateCompany))
router.delete('/deleteCompany/:companyId',auth(),authorization(systemRoles.COMPANY_HR),errorHandle(validationMiddleware(companySchema.deleteCompanySchema)),errorHandle(companyController.deleteCompany))
router.get('/getCompany/:companyId',auth(),authorization(systemRoles.COMPANY_HR),errorHandle(validationMiddleware(companySchema.getCompanySchema)),errorHandle(companyController.getCompany))
router.get('/searchForCompany',auth(),authorization(roles.USER_COMPANY_HR),errorHandle(validationMiddleware(companySchema.searchCompanySchema)),errorHandle(companyController.searchForCompany))

















export default router
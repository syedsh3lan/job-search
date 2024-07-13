import {Router} from "express"

import * as userController from "./user.controller.js"
import { errorHandle } from "../../Middlewares/error-handle.middleware.js"
import { validationMiddleware } from "../../Middlewares/validation.middleware.js"
import { userSchema } from "./user.schema.js"
import { auth } from "../../Middlewares/auth.middleware.js"




const router = Router()



router.post("/signup",errorHandle(validationMiddleware(userSchema.signUpSchema)),errorHandle(userController.signup))
//router.get("/confirm-email/:token",errorHandle(userController.confirmEmail))
router.post("/login",errorHandle(validationMiddleware(userSchema.loginSchema)),errorHandle(userController.login))
router.put("/update" , auth(),errorHandle(validationMiddleware(userSchema.updateSchema)),errorHandle(userController.updateUser))
router.delete("/delete" , auth(),errorHandle(userController.deleteUser))
router.get("/getUserData" , auth(),errorHandle(userController.getUserData))
router.get("/getAnotherUserData/:id" ,errorHandle(validationMiddleware(userSchema.getAnotherUserDataSchema)),errorHandle(userController.getAnotherUserData))
router.put("/updatePass",auth(),errorHandle(validationMiddleware(userSchema.updatePass)),errorHandle(userController.updatePass))
router.get("/getALLAccountUsingRecoveryEmail/:recoveryEmail",errorHandle(validationMiddleware(userSchema.getALLAccountUsingRecoveryEmailSchema)),errorHandle(userController.getALLAccountUsingRecoveryEmail) )




export default router;
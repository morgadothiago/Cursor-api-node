import Router from "express"
import UserController from "../controller/UserController.js"
import { SignInController } from "../controller/SignInController.js"

const router = Router()

router.post("/accounts", UserController.create)

// Autenticação
router.post("/signin", SignInController.signIn)

export default router

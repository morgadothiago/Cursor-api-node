import Router from "express"
import UserController from "../controller/UserController.js"
import { SignInController } from "../controller/SignInController.js"
import auth from "../../middlewares/auth.js"

const router = Router()

// Aplica o middleware de autenticação em todas as rotas
router.use(auth)

// Rotas de gerenciamento de usuários
router.get("/accounts", UserController.getAll)
router.get("/accounts/:id", UserController.getById)
router.put("/accounts/:id", UserController.update)
router.delete("/accounts/:id", UserController.delete)

// Rota para atualizar o status online/offline
router.patch("/accounts/:id/online-status", UserController.setOnlineStatus)

// Rota para logout
router.post("/signout", SignInController.signOut)

export default router

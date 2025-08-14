import Router from "express"
import UserController from "../controller/UserController.js"

const router = Router()

router.post("/accounts", UserController.create)
router.get("/accounts", UserController.getAll)
router.get("/accounts/:id", UserController.getById)
router.put("/accounts/:id", UserController.update)
router.delete("/accounts/:id", UserController.delete)

export default router

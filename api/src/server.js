import express from "express"
import "dotenv/config"
import PublicRoutes from "./routes/PublicRoutes.js"
import PrivateRoutes from "./routes/PrivateRoutes.js"
import cors from "cors"
import auth from "../middlewares/auth.js"

const server = express()
server.use(cors())
server.use(express.json())

server.use("", PublicRoutes)
server.use("", auth, PrivateRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

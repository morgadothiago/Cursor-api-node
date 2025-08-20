import express from "express"
import "dotenv/config"
import PublicRoutes from "./routes/PublicRoutes.js"
import cors from "cors"

const server = express()
server.use(cors())
server.use(express.json())
server.use("", PublicRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

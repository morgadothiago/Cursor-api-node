import { PrismaClient } from "@prisma/client"
import { comparePassword } from "../Utils/HashPassword.js"
import jwt from "jsonwebtoken"
import { generateToken } from "../Utils/Jwt.js"

const JWT_SECRET = process.env.JWT_SECRET

const prisma = new PrismaClient()

export const SignInController = {
  async signIn(req, res) {
    try {
      const { email, password } = req.body

      // verificar se o usuario exite no banco
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        })
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      const passwordMatch = await comparePassword(password, user.password)

      // Aqui estamos verificando se as senha nao sao iguais
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid password",
        })
      }

      // Aqui vamos gerar o token jwt

      const token = generateToken({ id: user.id })

      res.status(200).json(token)
    } catch (error) {
      console.log(error)
    }
  },
}

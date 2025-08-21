import { PrismaClient } from "@prisma/client"
import { comparePassword } from "../Utils/HashPassword.js"
import { generateToken } from "../Utils/Jwt.js"
import UserController from "./UserController.js"

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

      // Gerar o token JWT
      const token = generateToken({ id: user.id })

      // Atualizar o status do usuário para online
      const updatedUser = await UserController.setUserOnline(user.id)

      res.status(200).json({
        token,
        user: updatedUser,
      })
    } catch (error) {
      console.log(error)
    }
  },

  async signOut(req, res) {
    try {
      const userId = req.userId // Obtido do middleware de autenticação
      
      // Atualizar o status do usuário para offline
      await UserController.setUserOffline(userId)
      
      // Aqui você pode adicionar lógica adicional de logout, como invalidar o token
      
      return res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso'
      })
    } catch (error) {
      console.error('Error during logout:', error)
      return res.status(500).json({
        success: false,
        message: 'Erro ao realizar logout',
        error: error.message
      })
    }
  }
}

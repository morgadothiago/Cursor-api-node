import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../Utils/HashPassword.js"

const prisma = new PrismaClient()

const UserController = {
  async create(req, res) {
    const { name, email, password, role, isOnline } = req.body

    const data = {
      name,
      email,
      password,
      role,
      isOnline,
    }
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userExist) {
      return res.status(400).json({ message: "User already exist" })
    }

    const hashedPassword = await hashPassword(password)

    data.password = hashedPassword

    const newUser = await prisma.user.create({
      data,
    })

    return res.status(201).json(newUser)
  },
  async getAll(req, res) {
    const users = await prisma.user.findMany()

    return res.status(200).json(users)
  },

  async getById(req, res) {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(user)
  },
  async update(req, res) {
    const { id } = req.params
    const { isOnline } = req.body

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      })

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          isOnline,
        },
      })

      return res.status(200).json(updatedUser)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating user", error: error.message })
    }
  },
  async delete(req, res) {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    })

    return res.status(200).json({ message: "User deleted" })
  },
}

export default UserController

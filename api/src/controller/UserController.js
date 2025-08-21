import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../Utils/HashPassword.js"

import { v4 as uuid } from "uuid"
const prisma = new PrismaClient()

const UserController = {
  async create(req, res) {
    const { name, email, password, role, isOnline } = req.body

    const data = {
      id: uuid(),
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
    const { id } = req.body

    const user = await prisma.user.findUnique({
      where: {
        id,
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
          id: String(id),
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

    const userExist = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!userExist) {
      return res.status(400).json({ message: "User not found" })
    }

    await prisma.user.delete({
      where: {
        id,
      },
    })

    return res.status(200).json({ message: "User deleted successfully" })
  },

  async setOnlineStatus(req, res) {
    const { id } = req.params
    const { isOnline } = req.body

    try {
      const user = await prisma.user.update({
        where: { id },
        data: { isOnline },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isOnline: true
        }
      })

      return res.status(200).json({
        message: `User is now ${isOnline ? 'online' : 'offline'}`,
        user
      })
    } catch (error) {
      console.error('Error updating online status:', error)
      return res.status(500).json({ 
        message: 'Error updating online status',
        error: error.message 
      })
    }
  },

  async setUserOnline(userId) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { isOnline: true },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isOnline: true
        }
      })
    } catch (error) {
      console.error('Error setting user online:', error)
      throw error
    }
  },

  async setUserOffline(userId) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { isOnline: false },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isOnline: true
        }
      })
    } catch (error) {
      console.error('Error setting user offline:', error)
      throw error
    }
  }
}

export default UserController

// src/lib/jwt.js
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "supersegredo" // em produção use variável de ambiente

// Função para gerar token
export function generateToken(payload, expiresIn = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

// Função para verificar token
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

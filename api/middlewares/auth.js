import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'supersegredo' // Em produção, sempre use variáveis de ambiente

/**
 * Middleware de autenticação que verifica o token JWT
 * Adiciona o ID do usuário autenticado ao objeto de requisição (req.userId)
 */
const auth = (req, res, next) => {
  try {
    // Verifica se o token foi enviado no cabeçalho Authorization
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Token de autenticação não fornecido ou em formato inválido',
        error: 'Token ausente ou mal formatado'
      })
    }

    // Extrai o token do cabeçalho
    const token = authHeader.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Token de autenticação não fornecido',
        error: 'Token ausente'
      })
    }

    // Verifica o token
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Adiciona o ID do usuário ao objeto de requisição
    req.userId = decoded.id
    
    // Se chegou até aqui, a autenticação foi bem-sucedida
    next()
    
  } catch (error) {
    console.error('Erro na autenticação:', error)
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Sessão expirada',
        error: 'Token expirado',
        expiredAt: error.expiredAt
      })
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido',
        error: 'Token inválido ou mal formado'
      })
    }
    
    // Outros erros
    return res.status(500).json({
      success: false,
      message: 'Erro na autenticação',
      error: error.message || 'Erro desconhecido'
    })
  }
}

export default auth

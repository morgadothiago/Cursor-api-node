import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Clock, Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = "Nome é obrigatório"
    } else if (formData.name.length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Registro realizado:", formData)
      // Aqui você faria a chamada real para a API
    } catch (error) {
      console.error("Erro no registro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col md:flex-row items-center justify-center p-4">
      {/* Left Side - Branding */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-4 md:px-12">
        <div className="inline-flex items-center gap-3 mb-6 justify-center md:justify-start">
          <div className="bg-white/20 p-3 rounded-2xl shadow-lg backdrop-blur-sm">
            <Clock size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white">Pointfy</h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Bem-vindo ao Pointfy
        </h2>
        <p className="text-blue-100 text-lg max-w-md mx-auto md:mx-0">
          Gerencie seu tempo e produtividade de forma simples e eficiente.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center pt-8 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Criar conta
            </CardTitle>
            <CardDescription className="text-gray-600">
              Preencha os dados abaixo para começar
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  icon={<User size={20} />}
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  icon={<Mail size={20} />}
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />

                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Senha"
                  icon={<Lock size={20} />}
                  rightIcon={
                    showPassword ? (
                      <EyeOff
                        size={20}
                        className="cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar senha"
                  icon={<Lock size={20} />}
                  rightIcon={
                    showConfirmPassword ? (
                      <EyeOff
                        size={20}
                        className="cursor-pointer"
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="cursor-pointer"
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )
                  }
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                />
              </div>
              <Button type="submit" className="w-full" loading={isLoading}>
                Criar conta
              </Button>
              <p className="text-center text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Faça login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Clock, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { api } from "@/services/api"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/schema/schemas"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const response = await api.post("/sessions", data)

      // Save token and user data
      localStorage.setItem("@pointfy:token", response.data.token)
      localStorage.setItem("@pointfy:user", JSON.stringify(response.data.user))

      toast.success("Login realizado com sucesso!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#fff",
          border: "none",
          fontSize: "14px",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        onAutoClose: () => {
          navigate("/dashboard")
        },
      })
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."

      toast.error(errorMessage, {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
          border: "none",
          fontSize: "14px",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      })
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
          Bem-vindo de volta!
        </h2>
        <p className="text-blue-100 text-lg max-w-md mx-auto md:mx-0">
          Acesse sua conta para gerenciar seu tempo e produtividade.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center pt-8 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Entrar na conta
            </CardTitle>
            <CardDescription className="text-gray-600">
              Digite suas credenciais para acessar
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    icon={Mail}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Senha"
                      icon={Lock}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full" loading={isLoading}>
                Entrar
              </Button>

              <p className="text-center text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

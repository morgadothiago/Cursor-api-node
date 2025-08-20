import React, { useEffect, useState } from "react"
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
import { api } from "@/services/api"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "@/schema/schemas"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    function fetchData() {
      const response = api.get("/accounts")
      response.then((response) => {
        console.log(response.data)
      })
    }
    fetchData()
  }, [])

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      await api.post("/accounts", data)
      toast.success("Conta criada com sucesso!", {
        duration: 5000,
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
      })
      reset()
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar conta. Tente novamente."
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
          <CardContent className="pb-8 px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    icon={User}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
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

                <div className="space-y-1">
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirmar senha"
                      icon={Lock}
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
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

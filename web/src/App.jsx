import React from "react"
import AppRoutes from "./routes"
import { Toaster } from "sonner"
import { AuthProvider } from "@/context/AuthContext"

export default function App() {
  return (
    <AuthProvider>
      <Toaster />
      <AppRoutes />
    </AuthProvider>
  )
}

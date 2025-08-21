import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import Loading from "../../components/Loading"
import AppStack from "../stacks/AppStack"
import AuthStack from "../stacks/AuthStack"

export default function MainStack() {
  const { userToken, loading } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Pequeno delay para evitar piscar a tela de loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading || isLoading) {
    return <Loading />
  }

  return userToken ? <AppStack /> : <AuthStack />
}

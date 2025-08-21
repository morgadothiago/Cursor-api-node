import { Text, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native"
import { useState, useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import { useForm } from "react-hook-form"
import Input from "../../components/Input"
import styles from "./styles"
import { Feather } from "@expo/vector-icons"
import { AuthContext } from "../../contexts/AuthContext"
import { signIn as apiSignIn } from "../../services/api"

export default function Signin() {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()
  const { signIn } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (data) => {
    const { email, password } = data
    
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos")
      return
    }

    setIsLoading(true)
    try {
      const response = await apiSignIn(email, password)
      if (response.token) {
        // Extrair os dados do usuário da resposta da API
        const userData = {
          email: response.user?.email || email,
          name: response.user?.name || 'Usuário',
          id: response.user?.id,
          // Adicione outros campos do usuário que você receber da API
          ...response.user
        }
        
        await signIn(response.token, userData)
        // Navegar para a tela principal após o login
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Não foi possível realizar o login"
      Alert.alert("Erro", message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Feather name="clock" size={40} color="#FACC15" />
        <Text style={styles.headerText}>Gerencie seu Tempo</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.form}>
          {/* Email */}

          <Input
            control={control}
            name="email"
            iconName="user"
            placeholder="Email"
            autoCapitalize="none"
            rules={{
              required: "Email é obrigatório",
              pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" },
            }}
          />

          {/* Senha */}
          <Input
            control={control}
            name="password"
            iconName="lock"
            placeholder="Senha"
            isPassword
            rules={{
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha deve ter ao menos 6 caracteres",
              },
            }}
          />

          {/* Botão */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            activeOpacity={0.7}
            onPress={handleSubmit(handleSignIn)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer - Cadastro */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem uma conta?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.footerLink}>Registrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

import { Text, TouchableOpacity, View, Alert } from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useForm } from "react-hook-form"
import Input from "../../components/Input"
import styles from "./styles"
import { Feather } from "@expo/vector-icons"
import { login } from "../../services/api" // sua função de login

export default function Signin() {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  const handleSignIn = async (data) => {
    const { email, password } = data

    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos")
      return
    }

    try {
      const response = await login(email, password) // chamar API
      const message = response.data?.message || "Login realizado com sucesso!"
      Alert.alert("Sucesso", message)
      // aqui você pode salvar token e navegar
      console.log("Usuário logado:", response.data)
    } catch (error) {
      const message =
        error.response?.data?.message || "Não foi possível realizar o login"
      Alert.alert("Erro", message)
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
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleSubmit(handleSignIn)}
          >
            <Text style={styles.buttonText}>Entrar</Text>
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

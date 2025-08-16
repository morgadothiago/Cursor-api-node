// screens/SignUpScreen.js
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import Input from "../../components/Input"
import theme from "../../global/theme"
import { createAccounts } from "../../services/api"
import { useForm, Controller } from "react-hook-form"

const SignUp = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm()
  const passwordValue = watch("password")

  const handleSignUp = async (data) => {
    const { name, email, password, confirmPassword } = data

    try {
      if (password !== confirmPassword) {
        Alert.alert("Erro", "As senhas não conferem")
        return
      }

      const response = await createAccounts(name, email, password)
      const message = response.data?.message || "Conta criada com sucesso!"

      Alert.alert("Sucesso", message)
      navigation.goBack()
    } catch (error) {
      const message =
        error.response?.data?.message || "Não foi possível criar a conta"

      Alert.alert("Erro", message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <Input
        control={control}
        name="name"
        iconName="user"
        placeholder="Nome"
        rules={{ required: "Nome é obrigatório" }}
      />

      <Input
        control={control}
        name="email"
        iconName="mail"
        placeholder="Email"
        rules={{
          required: "Email é obrigatório",
          pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" },
        }}
      />

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

      <Input
        control={control}
        name="confirmPassword"
        iconName="lock"
        placeholder="Confirmar Senha"
        isPassword
        rules={{
          required: "Confirmação de senha é obrigatória",
          validate: (value) =>
            value === passwordValue || "As senhas não conferem",
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleSignUp)}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já possui conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.md,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: theme.colors.primary,
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
})

export default SignUp

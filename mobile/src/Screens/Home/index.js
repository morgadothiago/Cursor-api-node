// src/Screens/Home/index.jsx
import React, { useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./styles"
import { AuthContext } from "../../contexts/AuthContext"
import AccessDenied from "../AccessDenied"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"

const Home = () => {
  const { user, signOut } = useContext(AuthContext)
  const navigation = useNavigation()

  // Se o usuário não for ADMIN → mostra componente de acesso negado
  if (user?.role !== "ADMIN") {
    return <AccessDenied onLogout={signOut} />
  }

  // Tela principal para administradores
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <TouchableOpacity>
            <Feather name="menu" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.title}>Home</Text>
        </View>
        <View style={styles.headerItem}>
          <TouchableOpacity onPress={() => signOut()}>
            <Feather name="log-out" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

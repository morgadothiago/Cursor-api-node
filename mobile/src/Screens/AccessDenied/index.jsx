import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import styles from "./styles"

const AccessDenied = ({ onLogout }) => {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    let interval
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    } else {
      onLogout()
    }
    return () => clearInterval(interval)
  }, [countdown, onLogout])

  return (
    <View style={[styles.container, styles.centeredContainer]}>
      <MaterialIcons name="block" size={80} color="#ff3b30" />
      <Text style={styles.title}>Acesso Restrito</Text>
      <Text style={styles.message}>
        Seu perfil de usuário não tem permissão para acessar o aplicativo. Entre
        em contato com o administrador para mais informações.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setCountdown(5)}
        activeOpacity={0.8}
        disabled={countdown > 0}
      >
        <Text style={styles.buttonText}>
          {countdown > 0 ? `${countdown} segundos` : "Sair"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccessDenied

// src/Screens/Home/index.jsx
import React, { useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import styles from "./styles"
import { AuthContext } from "../../contexts/AuthContext"
import AccessDenied from "../AccessDenied"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import FlatListItem from "../../components/FlatListItem"
import Button from "../../components/Button"
import api from "../../services/api"

const Home = () => {
  const { user, signOut } = useContext(AuthContext)
  const navigation = useNavigation()
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState("online")

  // Debug effect to log users and their statuses
  // Efeito para verificar e atualizar o filtro baseado nos usuários online
  useEffect(() => {
    if (users.length > 0) {
      console.log("=== DADOS ATUAIS DOS USUÁRIOS ===")

      // Log detalhado de cada usuário
      users.forEach((user, index) => {
        console.log(`Usuário ${index + 1}:`, {
          id: user.id,
          name: user.name,
          isOnline: user.isOnline,
          status: user.status || "N/A",
        })
      })

      // Conta usuários online/offline
      const onlineCount = users.filter((u) => u.isOnline === true).length
      const offlineCount = users.filter((u) => u.isOnline === false).length

      console.log(`=== RESUMO ===`)
      console.log(`Total de usuários: ${users.length}`)
      console.log(`Online: ${onlineCount}`)
      console.log(`Offline: ${offlineCount}`)
      console.log(`Filtro atual: ${filter}`)

      // Se não há usuários online e o filtro está em 'online', muda para 'offline'
      if (onlineCount === 0 && filter === "online") {
        console.log("Nenhum usuário online, mudando para aba 'offline'")
        setFilter("offline")
      }
    }
  }, [users, filter])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...")
        const token = await AsyncStorage.getItem("userToken")
        console.log(
          "Token from storage:",
          token ? "Token exists" : "No token found"
        )

        if (!token) {
          console.error("No token found in AsyncStorage")
          signOut()
          return
        }

        const users = await api.getUsers()
        console.log("=== DADOS RECEBIDOS DA API ===")
        console.log(
          "Lista completa de usuários:",
          JSON.stringify(users, null, 2)
        )

        // Verifica os status dos usuários
        console.log("=== VERIFICAÇÃO DE STATUS DOS USUÁRIOS ===")
        const usersWithStatus = users.map((user) => ({
          id: user.id,
          name: user.name,
          isOnline: user.isOnline,
          status: user.status || "N/A",
          hasIsOnline: "isOnline" in user,
          isOnlineType: typeof user.isOnline,
          isOnlineValue: user.isOnline,
        }))

        console.log("Detalhes dos usuários:", usersWithStatus)

        // Verificação de consistência
        const onlineUsers = users.filter((user) => user.isOnline === true)
        console.log(
          `Total de usuários online (isOnline === true): ${onlineUsers.length}`
        )

        // Verifica se há discrepâncias
        const inconsistentUsers = users.filter(
          (user) =>
            (user.isOnline && user.status !== "ONLINE") ||
            (!user.isOnline && user.status === "ONLINE")
        )

        if (inconsistentUsers.length > 0) {
          console.warn(
            "ATENÇÃO: Usuários com status inconsistente:",
            inconsistentUsers
          )
        }

        // Garante que todos os usuários tenham isOnline definido
        const normalizedUsers = users.map((user) => ({
          ...user,
          isOnline: user.isOnline === true,
        }))

        console.log("=== USUÁRIOS NORMALIZADOS ===")
        console.log(
          normalizedUsers.map((u) => ({
            id: u.id,
            name: u.name,
            isOnline: u.isOnline,
          }))
        )

        setUsers(normalizedUsers)
      } catch (error) {
        console.error("Erro ao buscar usuários:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
          },
        })

        if (error.response?.status === 401) {
          console.log("Token inválido ou expirado, fazendo logout...")
          signOut()
        }
      }
    }

    if (user) {
      console.log("User is authenticated, fetching users...")
      fetchUsers()
    } else {
      console.log("No user found, not fetching users")
    }
  }, [user, signOut])

  if (user?.role !== "ADMIN") {
    return <AccessDenied onLogout={signOut} />
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerItem}>
            <Button
              name="menu"
              size={24}
              color="#fff"
              onPress={() => navigation.openDrawer()}
            />
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>Home</Text>
          </View>
          <View style={styles.headerItem}>
            <Button name="log-out" size={24} color="#fff" onPress={signOut} />
          </View>
        </View>
        {/* Daqui para baixo e meu body */}
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Olá, {user.name}</Text>
            <Text style={styles.welcomeSubtitle}>
              Seja bem-vindo ao seu dashboard
            </Text>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filter === "online" && styles.activeFilter,
                ]}
                onPress={() => setFilter("online")}
              >
                <View style={[styles.statusDot, styles.onlineDot]} />
                <Text
                  style={[
                    styles.filterText,
                    filter === "online" && styles.activeFilterText,
                  ]}
                >
                  Online
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filter === "offline" && styles.activeFilter,
                ]}
                onPress={() => setFilter("offline")}
              >
                <View style={[styles.statusDot, styles.offlineDot]} />
                <Text
                  style={[
                    styles.filterText,
                    filter === "offline" && styles.activeFilterText,
                  ]}
                >
                  Offline
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>
              {filter === "online" ? "Usuários Online" : "Usuários Offline"}
            </Text>
            <FlatList
              data={(() => {
                // Primeiro, verifica se existem usuários
                if (users.length === 0) {
                  console.log("Nenhum usuário para filtrar")
                  return []
                }

                console.log("=== FILTRANDO USUÁRIOS ===")
                console.log(`Filtro atual: ${filter}`)

                const filtered = users.filter((user) => {
                  const isOnline = user.isOnline === true
                  const shouldShow = filter === "online" ? isOnline : !isOnline

                  return shouldShow
                })

                // Log detalhado
                console.log(`Total de usuários: ${users.length}`)
                console.log(
                  `Usuários online: ${users.filter((u) => u.isOnline).length}`
                )
                console.log(
                  `Usuários offline: ${users.filter((u) => !u.isOnline).length}`
                )
                console.log(
                  `Mostrando ${filtered.length} usuários no filtro "${filter}"`
                )

                return filtered
              })()}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <FlatListItem
                  item={{
                    ...item,
                    isOnline: item.isOnline === true,
                    lastSeen: item.isOnline ? "" : "há 1 hora",
                  }}
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {filter === "online"
                      ? "Nenhum usuário online no momento"
                      : users.length === 0
                      ? "Nenhum usuário cadastrado"
                      : "Nenhum usuário offline no momento"}
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

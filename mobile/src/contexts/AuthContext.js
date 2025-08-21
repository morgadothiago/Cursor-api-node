// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        setLoading(true)
        const [token, userData] = await Promise.all([
          AsyncStorage.getItem("userToken"),
          AsyncStorage.getItem("userData"),
        ])

        if (token && userData) {
          setUserToken(token)
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Failed to load user data:", error)
        // Em caso de erro, desloga o usuário para garantir um estado limpo
        await signOut()
      } finally {
        setLoading(false)
      }
    }

    loadStorageData()
  }, [])

  const signIn = async (token, userData) => {
    try {
      setUserToken(token)
      setUser(userData)
      await AsyncStorage.setItem("userToken", token)
      await AsyncStorage.setItem("userData", JSON.stringify(userData))

      console.log("User signed in:", userData)
      console.log("User token:", token)
    } catch (error) {
      console.error("Failed to save user data:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      setUserToken(null)
      setUser(null)
      await AsyncStorage.removeItem("userToken")
      await AsyncStorage.removeItem("userData")
    } catch (error) {
      console.error("Failed to remove user data:", error)
      throw error
    }
  }

  const updateUser = async (newUserData) => {
    try {
      setUser((prevUser) => ({
        ...prevUser,
        ...newUserData,
      }))
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          ...user,
          ...newUserData,
        })
      )
    } catch (error) {
      console.error("Failed to update user data:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userToken,
        user,
        loading,
        signIn,
        signOut,
        updateUser,
        isAuthenticated: !!userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStorageData = async () => {
      const token = await AsyncStorage.getItem("userToken")
      if (token) setUserToken(token)
      setLoading(false)
    }
    loadStorageData()
  }, [])

  const signIn = async (token) => {
    setUserToken(token)
    await AsyncStorage.setItem("userToken", token)
  }

  const signOut = async () => {
    setUserToken(null)
    await AsyncStorage.removeItem("userToken")
  }

  return (
    <AuthContext.Provider value={{ userToken, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

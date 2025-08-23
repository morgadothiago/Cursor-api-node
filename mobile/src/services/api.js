import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
  baseURL: "http://localhost:3333",
})

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  async (config) => {
    // Skip if we already have an Authorization header
    if (config.headers.Authorization) {
      return config
    }

    try {
      const token = await AsyncStorage.getItem("userToken")
      if (token) {
        // Remove any existing 'Bearer ' prefix
        const cleanToken = token.replace(/^Bearer\s+/, '')
        config.headers.Authorization = `Bearer ${cleanToken}`
      }
      return config
    } catch (error) {
      console.error("Error in request interceptor:", error)
      return Promise.reject(error)
    }
  },
  (error) => {
    console.error("Request interceptor error:", error)
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    })
    return response
  },
  async (error) => {
    console.error("API Error:", {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    })

    const originalRequest = error.config

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Attempting to handle 401 error...")
      originalRequest._retry = true

      try {
        // Clear the invalid token
        await AsyncStorage.removeItem("userToken")
        await AsyncStorage.removeItem("userData")

        // You might want to redirect to login here
        // navigation.navigate('Login')
        console.log("Cleared invalid token, user should be logged out")
      } catch (refreshError) {
        console.error("Error handling 401:", refreshError)
      }
    }

    return Promise.reject(error)
  }
)

async function signIn(email, password) {
  try {
    const response = await api.post("/signin", { email, password })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function createAccounts(name, email, password) {
  const response = await api.post("/accounts", {
    name,
    email,
    password,
    isOnline: false,
    role: "ADMIN",
  })
  return response.data
}

async function getUsers() {
  try {
    console.log('getUsers called')
    const response = await api.get('/accounts')
    console.log('API response received:', response.data)
    return response.data
  } catch (error) {
    console.error('Error in getUsers:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
    throw error
  }
}

const apiService = {
  signIn,
  createAccounts,
  getUsers,
  // Add other API methods here
  
  // Axios instance for direct access if needed
  client: api
}

export default apiService

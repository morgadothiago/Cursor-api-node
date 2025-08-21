import axios from "axios"

export const api = axios.create({
  baseURL: "http://192.168.100.96:3333",
  timeout: 10000,
})

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

export { signIn, createAccounts }

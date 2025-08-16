import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./mainStack"
import { AuthProvider } from "../contexts/AuthContext"

export default function Routes() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthProvider>
  )
}

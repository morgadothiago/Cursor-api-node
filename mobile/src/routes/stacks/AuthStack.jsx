import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Signin from "../../Screens/Signin"
import SignUp from "../../Screens/SignUp"

const Stack = createNativeStackNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Signin" component={Signin} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
)

export default AuthStack

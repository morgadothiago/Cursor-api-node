import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Signin from "../../Screens/Signin"
import SignUp from "../../Screens/SignUp"
import Home from "../../Screens/Home"

const Stack = createNativeStackNavigator()

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

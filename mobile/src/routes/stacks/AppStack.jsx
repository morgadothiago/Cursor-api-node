import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../../Screens/Home"
import Profile from "../../Screens/Profile"

const Stack = createNativeStackNavigator()

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
)

export default AppStack

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DrawerRoutes from "../DrawerStacks"

const Stack = createNativeStackNavigator()

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainDrawer" component={DrawerRoutes} />
  </Stack.Navigator>
)

export default AppStack

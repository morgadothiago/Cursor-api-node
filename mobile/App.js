import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

import "./global.css"

export default function App() {
  return (
    <View className="flex-1 bg-red-500 items-center justify-center">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

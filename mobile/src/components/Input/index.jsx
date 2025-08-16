// components/CustomInput.js
import React, { useState } from "react"
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { Controller } from "react-hook-form"
import theme from "../../global/theme"

const Input = ({
  control,
  name,
  rules = {},
  isPassword,
  iconName,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View style={{ marginBottom: theme.spacing.sm }}>
            <View style={[styles.input, style]}>
              <Feather name={iconName} size={22} color="#3B82F6" />
              <TextInput
                style={styles.inputText}
                placeholderTextColor="#9CA3AF"
                secureTextEntry={isPassword && !showPassword}
                value={value}
                onChangeText={onChange}
                {...props}
              />
              {isPassword && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={22}
                    color="#3B82F6"
                  />
                </TouchableOpacity>
              )}
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    )
  }

  return (
    <View style={[styles.input, style]}>
      <Feather name={iconName} size={22} color="#3B82F6" />
      <TextInput
        style={styles.inputText}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={isPassword && !showPassword}
        {...props}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="#3B82F6"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 4,
  },
  inputText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    marginLeft: theme.spacing.sm,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
    marginLeft: theme.spacing.sm,
  },
})

export default Input

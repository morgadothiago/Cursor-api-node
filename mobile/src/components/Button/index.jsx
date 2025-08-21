import { Feather } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"

const ButtonIcon = ({ name, size, color, ...rest }) => (
  <TouchableOpacity {...rest}>
    <Feather name={name} size={size} color={color} />
  </TouchableOpacity>
)

export default ButtonIcon

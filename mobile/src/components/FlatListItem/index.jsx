import { StyleSheet, Text, View } from "react-native"
import theme from "../../global/theme"
import { Ionicons } from "@expo/vector-icons"

const FlatListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statusIndicator,
          {
            backgroundColor: item.isOnline ? "#4CAF50" : "#ff0000",
          },
        ]}
      />
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          {item.isOnline && (
            <View style={styles.onlineBadge}>
              <Text style={styles.onlineText}>Online</Text>
            </View>
          )}
        </View>
        <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
          {item.email}
        </Text>
        {!item.isOnline && (
          <Text style={styles.lastSeen}>
            Última vez: {item.lastSeen || "há algum tempo"}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 4,
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.surface,
    marginRight: 8,
    flexShrink: 1,
  },
  onlineBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  onlineText: {
    color: "#2E7D32",
    fontSize: 10,
    fontWeight: "600",
  },
  email: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 12,
    color: "#9E9E9E",
    fontStyle: "italic",
  },
})

export default FlatListItem

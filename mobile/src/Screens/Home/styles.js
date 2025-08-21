import { Platform, StyleSheet } from "react-native"
import theme from "../../global/theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  header: {
    marginVertical:
      Platform.OS === "android" ? theme.spacing.md : theme.spacing.xs,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  headerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
})

export default styles

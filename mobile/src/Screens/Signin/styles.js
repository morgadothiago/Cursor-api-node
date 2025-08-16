import { StyleSheet } from "react-native"
import theme from "../../global/theme"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
  },
  headerText: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: theme.spacing.sm,
  },
  body: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
  },
  form: {
    width: "100%",
    gap: theme.spacing.md,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
    marginVertical: theme.spacing.sm,
  },
  inputText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    marginLeft: theme.spacing.sm,
  },
  button: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
    marginTop: theme.spacing.lg,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  /** Footer */
  footer: {
    position: "absolute",
    bottom: theme.spacing.lg,
    alignItems: "center",
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: theme.spacing.xs,
  },
})

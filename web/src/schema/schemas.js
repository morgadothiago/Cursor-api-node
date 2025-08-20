import * as yup from "yup"

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome não pode ter mais de 50 caracteres"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Digite um email válido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "A senha deve conter letras e números"),
  confirmPassword: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("password"), null], "As senhas não conferem"),
})

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Digite um email válido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
})

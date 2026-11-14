export const validateCredentials = (
  email: unknown,
  password: unknown
): void => {
  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    throw Object.assign(
      new Error("Email y contraseña son requeridos"),
      { statusCode: 400 }
    );
  }
};
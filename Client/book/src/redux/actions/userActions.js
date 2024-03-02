export const login = (user, userId, email, role, accessToken, refreshToken) => {
  return {
    type: "LOGIN",
    user,
    userId,
    email,
    role,
    accessToken,
    refreshToken,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

const initialState = {
  user: {},
  userId: null,
  email: null,
  role: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
        userId: action.userId,
        email: action.email,
        role: action.role,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isAuthenticated: true,
      };
    case "LOGOUT": {
      return initialState; // Trả về trạng thái khởi tạo để xóa thông tin người dùng
    }
    default:
      return state;
  }
};

export default userReducer;

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

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
      return {
        ...state,
        user: null,
        userId: null,
        email: null,
        role: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;

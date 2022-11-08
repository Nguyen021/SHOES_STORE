export const loginUser = (payload) => {
  return {
    type: "USER_LOGIN",
    payload: payload,
  };
};

export const logoutUser = (payload = null) => {
  return {
    type: "USER_LOGOUT",
    payload: payload,
  };
};

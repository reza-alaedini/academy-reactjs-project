export const addUser = (user) => {
  return async (dispatch) => {
    await dispatch({ type: "SET_USER", payload: user });
  };
};

export const deleteUser = () => {
  return async (dispatch) => {
    dispatch({ type: "CLEAR_USER", payload: {} });
  };
};

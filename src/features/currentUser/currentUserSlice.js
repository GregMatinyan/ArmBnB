export function currentUserReducer(state = {}, action) {
  if (action.type === "user-loged-in") {
    return {
      logedIn: action.payload.logedIn,
    };
  }
  return state;
}

export const initialCurrentUser = {
  logedIn: false,
};

export function getUserStatus(state) {
  return state.currentUser.logedIn;
}

export function setUserStatus(status) {
  return {
    type: "user-loged-in",
    payload: {
      logedIn: status,
    },
  };
}

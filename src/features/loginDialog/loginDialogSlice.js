export function loginDialogReducer(state = {}, action) {
  if (action.type === "login-dialog-handler") {
    return {
      open: action.payload.open,
    };
  }
  return state;
}

export const initialLoginDialog = {
  open: false,
};

export function getLoginDialogStatus(state) {
  return state.loginDialog.open;
}

export function setLoginDialogStatus(status) {
  return {
    type: "login-dialog-handler",
    payload: {
      open: status,
    },
  };
}

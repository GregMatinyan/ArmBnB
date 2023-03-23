import { createStore } from "redux";

export const store = createStore(
  function (state, action) {
    if (action.type === "user-loged-in") {
      return {
        ...state,
        currentUser: {
          logedIn: action.payload.logedIn,
        },
      };
    }
    if (action.type === "login-dialog-handler") {
      return {
        ...state,
        loginDialog: {
          open: action.payload.open,
        },
      };
    }
    return state;
  },
  {
    currentUser: {
      logedIn: false,
    },
    loginDialog: {
      open: false,
    },
  }
);

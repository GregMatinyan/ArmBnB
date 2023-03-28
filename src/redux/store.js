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
    if (action.type === "search-by-icon") {
      return {
        ...state,
        searchByIcon: {
          type: action.payload,
        },
      };
    }
    if (action.type === "search-by-input") {
      return {
        ...state,
        searchByInput: {
          inputValue: action.payload.inputValue,
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
    searchByIcon: { type: "" },
    searchByInput: { inputValue: "" },
  }
);

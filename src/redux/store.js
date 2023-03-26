import { createStore } from "redux";
import HostDescriptions from "../components/homePage/HostDescriptions";

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

    if (action.type === "filter-by-icon") {
      return {
        ...state,
        iconFilter: {
          name: action.payload,
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
    iconFilter: { name: "" },
  }
);

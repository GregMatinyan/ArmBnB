import { combineReducers, createStore } from "redux";

import {
  currentUserReducer,
  initialCurrentUser,
} from "../features/currentUser/currentUserSlice";

import {
  initialLoginDialog,
  loginDialogReducer,
} from "../features/loginDialog/loginDialogSlice";

import {
  initialSearchByFilters,
  searchByFiltersReducer,
} from "../features/searchByFilters/serchByFiltersSlice";

import {
  initialSearchByIcon,
  searchByIconReducer,
} from "../features/searchByIcon/searchByIconSlice";

import {
  initialSearchByInput,
  searchByInputReducer,
} from "../features/searchByInput/searchByInputSlice";

export const store = createStore(
  combineReducers({
    currentUser: currentUserReducer,
    loginDialog: loginDialogReducer,
    searchByIcon: searchByIconReducer,
    searchByInput: searchByInputReducer,
    searchByFilters: searchByFiltersReducer,
  }),
  {
    currentUser: initialCurrentUser,
    loginDialog: initialLoginDialog,
    searchByIcon: initialSearchByIcon,
    searchByInput: initialSearchByInput,
    searchByFilters: initialSearchByFilters,
  }
);

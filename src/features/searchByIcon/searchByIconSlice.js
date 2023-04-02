export function searchByIconReducer(state = {}, action) {
  if (action.type === "search-by-icon") {
    return {
      type: action.payload,
    };
  }
  return state;
}

export const initialSearchByIcon = { type: "" };

export function getIconName(state) {
  return state.searchByIcon.type;
}

export function setIconName(iconName) {
  return {
    type: "search-by-icon",
    payload: iconName,
  };
}

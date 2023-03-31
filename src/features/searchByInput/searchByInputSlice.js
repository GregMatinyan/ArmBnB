export function searchByInputReducer(state = {}, action) {
  if (action.type === "search-by-input") {
    return {
      inputValue: action.payload.inputValue,
    };
  }
  return state;
}

export const initialSearchByInput = { inputValue: "" };

export function getSearchValue(state) {
  return state.searchByInput.inputValue;
}

export function setInputvalue(value) {
  return {
    type: "search-by-input",
    payload: {
      inputValue: value,
    },
  };
}

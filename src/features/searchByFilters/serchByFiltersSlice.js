export function searchByFiltersReducer(state = null, action) {
  if (action.type === "search-by-filters") {
    return {
      filters: action.payload,
    };
  }
  return state;
}

export const initialSearchByFilters = {
  filters: null,
};

export function getFilters(state) {
  return state.searchByFilters.filters;
}

export function setFilters(filters) {
  return {
    type: "search-by-filters",
    payload: filters,
  };
}

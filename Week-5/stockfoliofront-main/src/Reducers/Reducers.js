export function ItReducer(state = { data: "" }, action) {
  switch (action.type) {
    case "ITBLOCK_DATA":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}

export function DividentReducer(state = { data: "" }, action) {
  switch (action.type) {
    case "DIVIDENTBLOCK_DATA":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}

export function ItList(state = { data: "" }, action) {
  switch (action.type) {
    case "ItList_DATA":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}

export function DividentList(state = { data: "" }, action) {
  switch (action.type) {
    case "DividentList_DATA":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}

export function WatchList(state = { data: "" }, action) {
  switch (action.type) {
    case "WatchList_DATA":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}

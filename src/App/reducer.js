export default (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
    case "SET_SETTING":
      return {
        ...state,
        settings: action.payload
      };
    default:
      throw new Error();
  }
};

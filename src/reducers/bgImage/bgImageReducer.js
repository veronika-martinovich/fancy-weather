import natureImage from "../../assets/nature.jpg";

const defaultData = {
  bgImageUrl: natureImage,
  isBgFetching: false,
};

export const selectorBgImage = state => state.bgImageReducer;

const bgImageReducer = (state = defaultData, action) => {
  switch (action.type) {
    case "CHANGE_BG_IMAGE":
      return {
        ...state,
        bgImageUrl: action.url,
      };
    case "CHANGE_BG_FETCHING_FLAG":
      return {
        ...state,
        isBgFetching: action.flag,
      };
    default:
      return state;
  }
};

export default bgImageReducer;

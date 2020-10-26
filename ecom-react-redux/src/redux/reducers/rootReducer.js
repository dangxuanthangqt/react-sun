import { combineReducers } from "redux";
import { globalLoadingReducer } from "./globalLoadingReducer";
import { productReducer } from "./productReducer";

const myReducer = combineReducers({
  loadingState: globalLoadingReducer,
  productState: productReducer,
});
export default myReducer;

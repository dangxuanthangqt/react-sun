import {
  FETCH_ALL_PRODUCT_SUCCESS,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_BRAND_SUCCESS,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_RATING_SUCCESS,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_TYPE_SUCCESS,
  FETCH_PRODUCT_PERPAGE_SUCCESS,
} from "../actionTypes/productActionType";

const initialValue = {
  dataAll: {},
  dataPerPage: {},
};
export const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCT_SUCCESS: {
      return {
        ...state,
        dataAll: { ...action.payload },
      };
    }
    case FETCH_PRODUCT_PERPAGE_SUCCESS: {
      return {
        ...state,
        dataPerPage: [...action.payload],
      };
    }
    case FETCH_ALL_PRODUCT_WHEN_CHANGE_TYPE_SUCCESS: {
      let dataAllNew = { ...action.payload, type: state.dataAll.type }; // ko cap nhat lai truong type

      return {
        ...state,
        dataAll: { ...dataAllNew },
      };
    }
    case FETCH_ALL_PRODUCT_WHEN_CHANGE_BRAND_SUCCESS: {
      let dataAllNew = { ...action.payload, brand: state.dataAll.brand }; //ko cap nhat lai brand
      return {
        ...state,
        dataAll: { ...dataAllNew },
      };
    }
    case FETCH_ALL_PRODUCT_WHEN_CHANGE_RATING_SUCCESS: {
      let dataAllNew = { ...action.payload, rating: state.dataAll.rating }; //ko cap nhat lai brand
      return {
        ...state,
        dataAll: { ...dataAllNew },
      };
    }

    default:
      return state;
  }
};

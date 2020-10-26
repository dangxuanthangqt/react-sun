import {
  FETCH_ALL_PRODUCT_FAILURE,
  FETCH_ALL_PRODUCT_REQUEST,
  FETCH_ALL_PRODUCT_SUCCESS,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_BRAND,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_BRAND_SUCCESS,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_RATING,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_RATING_SUCCESS,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_TYPE,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_TYPE_SUCCESS,
  FETCH_PRODUCT_PERPAGE_FAILURE,
  FETCH_PRODUCT_PERPAGE_REQUEST,
  FETCH_PRODUCT_PERPAGE_SUCCESS,
} from "../actionTypes/productActionType";

export const AC_fetch_all_product_request = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_REQUEST,
    payload: data,
  };
};
export const AC_fetch_all_product_success = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_SUCCESS,
    payload: data,
  };
};
export const AC_fetch_all_product_failure = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_FAILURE,
    payload: data,
  };
};

export const AC_fetch_product_perpage_request = (data) => {
  return {
    type: FETCH_PRODUCT_PERPAGE_REQUEST,
    payload: data,
  };
};
export const AC_fetch_product_perpage_success = (data) => {
  return {
    type: FETCH_PRODUCT_PERPAGE_SUCCESS,
    payload: data,
  };
};
export const AC_fetch_product_perpage_failure = (data) => {
  return {
    type: FETCH_PRODUCT_PERPAGE_FAILURE,
    payload: data,
  };
};
export const AC_fetch_all_product_when_change_brand = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_WHEN_CHANGE_BRAND,
    payload: data,
  };
};
export const AC_fetch_all_product_when_change_brand_success = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_WHEN_CHANGE_BRAND_SUCCESS,
    payload: data,
  };
};
export const AC_fetch_all_product_when_change_type = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_WHEN_CHANGE_TYPE,
    payload: data,
  };
};
export const AC_fetch_all_product_when_change_type_success = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_WHEN_CHANGE_TYPE_SUCCESS,
    payload: data,
  };
};
export const AC_fetch_all_product_when_change_rating = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_WHEN_CHANGE_RATING,
    payload: data,
  };
};
export const AC_fetch_all_product_when_change_rating_success = (data) => {
  return {
    type: FETCH_ALL_PRODUCT_WHEN_CHANGE_RATING_SUCCESS,
    payload: data,
  };
};

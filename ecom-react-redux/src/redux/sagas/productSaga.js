import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import axiosService from "../../services/axios/axiosService";
import {
  AC_hide_loading,
  AC_show_loading,
} from "../actionCreators/loadingActionCreator";
import {
  AC_fetch_all_product_success,
  AC_fetch_all_product_when_change_brand_success,
  AC_fetch_all_product_when_change_rating_success,
  AC_fetch_all_product_when_change_type_success,
  AC_fetch_product_perpage_success,
} from "../actionCreators/productActionCreator";
import {
  FETCH_ALL_PRODUCT_REQUEST,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_BRAND,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_RATING,
  FETCH_ALL_PRODUCT_WHEN_CHANGE_TYPE,
  FETCH_PRODUCT_PERPAGE_REQUEST,
} from "../actionTypes/productActionType";
export function* productSaga() {
  yield takeLatest(FETCH_ALL_PRODUCT_REQUEST, watchFetchAllProduct);
  yield takeLatest(FETCH_PRODUCT_PERPAGE_REQUEST, wacthFetchProductPerpage);
  yield takeLatest(
    FETCH_ALL_PRODUCT_WHEN_CHANGE_BRAND,
    watchFetchAllProductWhenChangeBrand
  );
  yield takeLatest(
    FETCH_ALL_PRODUCT_WHEN_CHANGE_TYPE,
    watchFetchAllProductWhenChangeType
  );
  yield takeLatest(
    FETCH_ALL_PRODUCT_WHEN_CHANGE_RATING,
    watchFetchAllProductWhenChangeRating
  );
}
function* watchFetchAllProduct({ payload }) {
  yield put(AC_show_loading());
  try {
    const res = yield call(axiosService.get, payload);
    yield put(AC_fetch_all_product_success(res.data));
    yield put(AC_hide_loading());
    console.log(res);
  } catch (error) {
    yield put(AC_hide_loading());
    alert(error);
  }
}
function* wacthFetchProductPerpage({ payload }) {
  yield put(AC_show_loading());
  try {
    const res = yield call(axiosService.get, payload);
    yield put(AC_fetch_product_perpage_success(res.data.body));
    yield put(AC_hide_loading());
    console.log(res);
  } catch (error) {
    yield put(AC_hide_loading());
    alert(error);
  }
}
function* watchFetchAllProductWhenChangeBrand({ payload }) {
  yield put(AC_show_loading());
  try {
    const res = yield call(axiosService.get, payload);
    yield put(AC_fetch_all_product_when_change_brand_success(res.data));
    yield put(AC_hide_loading());
    console.log(res);
  } catch (error) {
    yield put(AC_hide_loading());
    alert(error);
  }
}
function* watchFetchAllProductWhenChangeType({ payload }) {
  yield put(AC_show_loading());
  try {
    const res = yield call(axiosService.get, payload);
    yield put(AC_fetch_all_product_when_change_type_success(res.data));
    yield put(AC_hide_loading());
    console.log(res);
  } catch (error) {
    yield put(AC_hide_loading());
    alert(error);
  }
}
function* watchFetchAllProductWhenChangeRating({ payload }) {
  yield put(AC_show_loading());
  try {
    const res = yield call(axiosService.get, payload);
    yield put(AC_fetch_all_product_when_change_rating_success(res.data));
    yield put(AC_hide_loading());
    console.log(res);
  } catch (error) {
    yield put(AC_hide_loading());
    alert(error);
  }
}

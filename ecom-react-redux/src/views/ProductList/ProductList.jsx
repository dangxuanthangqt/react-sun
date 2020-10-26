import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header/Header";
import "./ProductList.scss";
import Category from "./Components/Category/Category";
import Divider from "../../components/Divider/Divider";
import Type from "./Components/Type/Type";
import Brand from "./Components/Brand/Brand";
import Ratings from "./Components/Ratings/Ratings";
import Price from "./Components/Price/Price";
import Pagination from "./Components/Panigation/Pagination";
import ProductGrid from "./Components/ProductGrid/ProductGrid";
import { useState } from "react";
import axiosService from "../../services/axios/axiosService";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import {
  AC_fetch_all_product_request,
  AC_fetch_all_product_when_change_brand,
  AC_fetch_all_product_when_change_rating,
  AC_fetch_all_product_when_change_type,
  AC_fetch_product_perpage_request,
} from "../../redux/actionCreators/productActionCreator";
ProductList.propTypes = {};

function ProductList(props) {
  // const [dataAll, setDataAll] = useState({});
  // const [dataPerPage, setDataPerPage] = useState([]);
  const [category, setCategory] = useState({}); //object.values menu item ko dc null
  const [brands, setBrands] = useState(null);
  const [types, setTypes] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [prices, setPrices] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState(null);
  const [valueSort, setValueSort] = useState(
    JSON.stringify({ _sort: "name", _order: "asc" })
  );

  const dataAll = useSelector((state) => state.productState.dataAll);
  const dataPerPage = useSelector((state) => state.productState.dataPerPage);
  const dispatch = useDispatch();
  useEffect(() => {
    let url1 = `/products`;
    dispatch(AC_fetch_all_product_request(url1));
    let url2 = `/products/?_page=1&_limit=12&${queryString.stringify(
      JSON.parse(valueSort)
    )}`;
    dispatch(AC_fetch_product_perpage_request(url2));
  }, []);
  const handleChangeSearchFilter = async (value) => {
    setPageNumber(1);
    let temp = {
      ...filter,
      _page: 1,
      _limit: 12,
      q: value,
    };
    setFilter({ ...temp });
    let url1 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}&${queryString.stringify(
      JSON.parse(valueSort)
    )}`;
    dispatch(AC_fetch_product_perpage_request(url1));
    // lấy state category cho vào.
    //  setDataPerPage(res1.data.body);
    delete temp._page;
    delete temp._limit;
    let url2 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}`;
    dispatch(AC_fetch_all_product_request(url2));

    // setDataAll(res2Temp);
  };
  const handleChangeCategoryFilter = async (value) => {
    setCategory(value);
    setPageNumber(1);
    let temp = {
      ...filter, //khong the ...value vi  key tung value khac nhau, ko ghi de dc
      _page: 1,
      _limit: 12,
    };
    setFilter({ ...temp });
    let url1 = `/products?${queryString.stringify(
      value
    )}&${queryString.stringify(temp)}&${queryString.stringify(
      JSON.parse(valueSort)
    )}`;
    dispatch(AC_fetch_product_perpage_request(url1));

    delete temp._page;
    delete temp._limit;
    let url2 = `/products?${queryString.stringify(
      value
    )}&${queryString.stringify(temp)}`;
    dispatch(AC_fetch_all_product_request(url2));
  };
  const handleChangeBrandFilter = async (value) => {
    setBrands(value);
    setPageNumber(1);
    let temp = {
      ...filter,
      brand: value,
      _page: 1,
      _limit: 12,
    };
    setFilter({ ...temp });
    let url1 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}&${queryString.stringify(
      JSON.parse(valueSort)
    )}`;
    dispatch(AC_fetch_product_perpage_request(url1));
    delete temp._page;
    delete temp._limit;
    let url2 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}`;
    dispatch(AC_fetch_all_product_when_change_brand(url2));
  };
  const handleChangeTypeFilter = async (value) => {
    setTypes(value);
    setPageNumber(1);
    let temp = {
      ...filter,
      type: value,
      _page: 1,
      _limit: 12,
    };
    setFilter({ ...temp });
    let url1 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}&${queryString.stringify(
      JSON.parse(valueSort)
    )}`;
    // lấy state category cho vào.
    dispatch(AC_fetch_product_perpage_request(url1));
    delete temp._page;
    delete temp._limit;
    let url2 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}`;
    dispatch(AC_fetch_all_product_when_change_type(url2));
  };
  const handleChangeRatingFilter = async (value) => {
    setRatings(value);
    setPageNumber(1);
    let temp = {
      ...filter,
      ...value, //{ rating :"4"}
      _page: 1,
      _limit: 12,
    };
    setFilter({ ...temp });
    let url1 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}&${queryString.stringify(
      JSON.parse(valueSort)
    )}`;
    dispatch(AC_fetch_product_perpage_request(url1));
    // lấy state category cho vào.
    //  setDataPerPage(res1.data.body);
    delete temp._page;
    delete temp._limit;
    let url2 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}`;
    dispatch(AC_fetch_all_product_when_change_rating(url2));
  };
  const handleChangePriceFilter = async (value) => {
    setPrices(value);
    if (value) {
      // tranh lan render dau tien chay

      setPageNumber(1);
      let temp = {
        ...filter,
        ...value,
        _page: value,
        _limit: 12,
      };
      setFilter({ ...temp });
      let url1 = `/products?${queryString.stringify(
        category
      )}&${queryString.stringify(temp)}&${queryString.stringify(
        JSON.parse(valueSort)
      )}`;
      dispatch(AC_fetch_product_perpage_request(url1));

      delete temp._page;
      delete temp._limit;
      let url2 = `/products?${queryString.stringify(
        category
      )}&${queryString.stringify(temp)}`;
      dispatch(AC_fetch_all_product_request(url2));

      //  setDataAll(res2.data);
    }
  };
  const handleChangePagenumberFilter = async (value) => {
    setPageNumber(value);
    let temp = {
      ...filter,
      _page: value,
      _limit: 12,
    };
    setFilter({ ...temp });
    let url1 = `/products?${queryString.stringify(
      category
    )}&${queryString.stringify(temp)}&${queryString.stringify(
      JSON.parse(valueSort)
    )}`;
    dispatch(AC_fetch_product_perpage_request(url1));
    // lấy state category cho vào.
    // console.log(res1.data);
    //  setDataPerPage(res1.data.body);
  };

  // console.log(category);
  //console.log(brands);
  // console.log(types);
  // console.log(ratings);
  // console.log(prices);
  // console.log(pageNumber);

  const handleChangeSort = async (e) => {
    let value = e.target.value;
    setValueSort(e.target.value);
    setPageNumber(1);
    let temp = {
      ...filter,
      _page: 1,
      _limit: 12,
    };
    let url1 =  `/products?${queryString.stringify(category)}&${queryString.stringify(
      temp
    )}&${queryString.stringify(JSON.parse(value))}`
    dispatch(AC_fetch_product_perpage_request(url1));
 // lấy state category cho vào.
    // console.log(res1.data);
    // setDataPerPage(res1.data.body);
  };
  const handleClear = () => {
    window.location.reload();
  };
  return (
    <>
      <Header handleChangeSearchFilter={handleChangeSearchFilter}></Header>
      <section className="product-list">
        <aside className="product-list__aside">
          {filter ? (
            <button onClick={handleClear} className="filter__clear">
              <i className="fas fa-eraser"></i>
              Clear all filters
            </button>
          ) : (
            ""
          )}
          <h3 className="text-gray">Show results for</h3>
          <Category
            handleChangeCategoryFilter={handleChangeCategoryFilter}
            category={category}
          ></Category>
          <Divider></Divider>
          <h3 className="text-gray">Refine by</h3>
          <Type
            handleChangeTypeFilter={handleChangeTypeFilter}
            typeList={dataAll.type}
          ></Type>

          <Brand
            handleChangeBrandFilter={handleChangeBrandFilter}
            brandList={dataAll.brand}
          ></Brand>
          <Ratings
            handleChangeRatingFilter={handleChangeRatingFilter}
            ratingList={dataAll.rating}
          ></Ratings>
          <Price handleChangePriceFilter={handleChangePriceFilter}></Price>
        </aside>
        <div className="product-list__content-wrapper">
          {dataPerPage.length ? (
            <Fragment>
              <div className="product-list__top">
                <p className="product-list__result-search">
                  {dataAll.length} results found in 2ms
                </p>
                <label>
                  Sort by:
                  <select onChange={handleChangeSort}>
                    <option
                      value={JSON.stringify({ _sort: "name", _order: "asc" })}
                    >
                      Featured
                    </option>
                    <option
                      value={JSON.stringify({ _sort: "price", _order: "asc" })}
                    >
                      Price asc
                    </option>
                    <option
                      value={JSON.stringify({ _sort: "price", _order: "desc" })}
                    >
                      Price desc
                    </option>
                  </select>
                </label>
              </div>
              <ProductGrid productList={dataPerPage}></ProductGrid>
              <Pagination
                handleChangePagenumberFilter={handleChangePagenumberFilter}
                productNumber={dataAll.length}
                pNumber={pageNumber}
              ></Pagination>
            </Fragment>
          ) : (
            <p style={{ textAlign: "center" }}>No results found matching.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductList;

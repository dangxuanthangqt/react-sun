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
ProductList.propTypes = {};

function ProductList(props) {
  const [dataAll, setDataAll] = useState({});
  const [dataPerPage, setDataPerPage] = useState([]);
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

  useEffect(() => {
    async function GetData() {
      try {
        var response = await axiosService.get("/products");
        setDataAll(response.data);

        const res = await axiosService.get(
          `/products/?_page=1&_limit=12&${queryString.stringify(
            JSON.parse(valueSort)
          )}`
        );
        setDataPerPage(res.data.body);
      } catch (error) {
        alert(error);
      }
    }
    GetData();
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
    const res1 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}&${queryString.stringify(JSON.parse(valueSort))}`
    ); // lấy state category cho vào.
    setDataPerPage(res1.data.body);
    delete temp._page;
    delete temp._limit;
    const res2 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}`
    );

    let res2Temp = { ...res2.data };

    setDataAll(res2Temp);
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
    const res1 = await axiosService.get(
      `/products?${queryString.stringify(value)}&${queryString.stringify(
        temp
      )}&${queryString.stringify(JSON.parse(valueSort))}`
    ); //phải tách ra category ra vì tên key khác nhau, ko thể gộp đc vào temp
    console.log(res1.data);
    setDataPerPage(res1.data.body);
    delete temp._page;
    delete temp._limit;
    const res2 = await axiosService.get(
      `/products?${queryString.stringify(value)}&${queryString.stringify(temp)}`
    );

    setDataAll(res2.data);
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
    const res1 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}&${queryString.stringify(JSON.parse(valueSort))}`
    ); // lấy state category cho vào.
    setDataPerPage(res1.data.body);
    delete temp._page;
    delete temp._limit;
    const res2 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}`
    );

    let res2Temp = { ...res2.data };
    delete res2Temp.brand;
    setDataAll({
      ...dataAll,
      ...res2Temp,
    });
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
    const res1 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}&${queryString.stringify(JSON.parse(valueSort))}`
    ); // lấy state category cho vào.
    setDataPerPage(res1.data.body);
    delete temp._page;
    delete temp._limit;
    const res2 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}`
    );
    if (value.length) {
      let res2Temp = { ...res2.data };
      delete res2Temp.type;
      setDataAll({
        ...dataAll,
        ...res2Temp,
      });
    } else {
      //neu uncheck het thi mang = 0, nen ghi de len het
      setDataAll(res2.data);
    }

    // khi thêm type filter thì ko thay đổi list type;
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

    const res1 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}&${queryString.stringify(JSON.parse(valueSort))}`
    ); // lấy state category cho vào.
    setDataPerPage(res1.data.body);
    delete temp._page;
    delete temp._limit;
    const res2 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}`
    );

    let res2Temp = { ...res2.data };
    delete res2Temp.rating;
    setDataAll({
      ...dataAll,
      ...res2Temp,
    });
  };
  const handleChangePriceFilter = async (value) => {
    setPrices(value);
    if (value) {
      // tranh lan render dau tien chay
      console.log(value);
      setPageNumber(1);
      let temp = {
        ...filter,
        ...value, // {rating_lte:"12"}
        _page: value,
        _limit: 12,
      };
      setFilter({ ...temp });

      const res1 = await axiosService.get(
        `/products?${queryString.stringify(category)}&${queryString.stringify(
          temp
        )}&${queryString.stringify(JSON.parse(valueSort))}`
      ); // lấy state category cho vào.
      setDataPerPage(res1.data.body);
      delete temp._page;
      delete temp._limit;

      const res2 = await axiosService.get(
        `/products?${queryString.stringify(category)}&${queryString.stringify(
          temp
        )}`
      );

      setDataAll(res2.data);
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
    const res1 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}&${queryString.stringify(JSON.parse(valueSort))}`
    ); // lấy state category cho vào.
    // console.log(res1.data);
    setDataPerPage(res1.data.body);
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
    const res1 = await axiosService.get(
      `/products?${queryString.stringify(category)}&${queryString.stringify(
        temp
      )}&${queryString.stringify(JSON.parse(value))}`
    ); // lấy state category cho vào.
    // console.log(res1.data);
    setDataPerPage(res1.data.body);
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

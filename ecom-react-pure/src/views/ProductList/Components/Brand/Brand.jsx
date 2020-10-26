import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "./Brand.scss";
import randomstring from "randomstring";
import { useRef } from "react";
Brand.propTypes = {
  brandList: PropTypes.array,
};

Brand.defaultProps = {
  brandList: [],
};
function Brand(props) {
  const {  handleChangeBrandFilter } = props;
  const [brandListInner, setBrandListInner] = useState([]);
  const [listConst, setListConst] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [brands, setBrands] = useState([]);
  const listForSearch = useRef([]);
  const handleValueSearch = (e) => {
    const { target } = e;
    const { value } = target;
    setValueSearch(target.value);
    
    if (value) {
      let temp1 = [...listForSearch.current];
      const temp =temp1.filter((element) => { // dinh bug tham chieu, chua tim cach hay de thay the dc,tam dung cach nay
        return Object.keys(element)[0].toLowerCase().includes(value);
      });
    
     
      setBrandListInner([...temp]);
    } else {
      setBrandListInner(listForSearch.current);
    }
    setBrands([]);
    handleChangeBrandFilter([])
  };
  const handleClear = () => {
    setValueSearch("");
    
    setBrandListInner([...listForSearch.current]);
    setBrands([]);
    handleChangeBrandFilter([])
  };
  const handleCheck = (e, element) => {
    const checked = e.target.checked;

    let brandListTemp = brandListInner.map((element1) => {
      let temp = {...element1} // nguy hiem, tranh tham chieu
      if (Object.keys(element)[0] === Object.keys(temp)[0]) {
        temp.checked = checked; // thay doi trang thai checked trong list brand
      }
     
      return temp
    });
  
  console.log(brandListTemp);
  console.log(listForSearch)
  
    let checkedBrand = brandListTemp
      .filter((element) => element.checked === true)
      .map((element) => Object.keys(element)[0]); // bo props checked
    handleChangeBrandFilter([...checkedBrand]);
    setBrands([...checkedBrand]); // set list checked
    setBrandListInner([...brandListTemp]); // set lai state cua brand sau khi check or uncheck
  };
  // useEffect(() => {
  //   handleChangeBrandFilter(brands);
  // }, [brands]);

  useEffect(() => {
    //setBrandListInner(props.brandList)
    let temp = props.brandList.map((e) => {
      if (brands.includes(Object.keys(e)[0]))
        //check item co trong list checked, neu props truyen vao co trong array checked brand
        return {
          ...e,
          checked: true, // check xem props truyen vao co element nao thuoc state hien tai dang check ko
        };
      else
        return {
          ...e,
          checked: false,
        };
    });
    let temp1 = props.brandList.map((e) => {
      return {
        ...e,
        checked: false,
      };
    }); // set gia tri cho list goc de search
    setListConst(JSON.parse(JSON.stringify(temp1)))
    listForSearch.current = [...temp1]
    setBrandListInner(temp);
  }, [props.brandList]);
  // console.log(valueSearch);
  
  const handleRenderCheckbox = () => {
    if (!brandListInner.length) return null;
    else {
      let temp = brandListInner.map((element, i) => {
        if (i < 5)
          return (
            <div key={i} className="filter__type__checkbox">
              <input
                className="brand-checkbox"
                name={Object.keys(element)[0]}
                id={Object.keys(element)[0]}
                onChange={(e) => handleCheck(e, element)}
                type="checkbox"
                checked={element.checked}
              ></input>
              <label
                htmlFor={Object.keys(element)[0]}
                className="filter__type__label"
              >{`${Object.keys(element)[0]}  (${
                Object.values(element)[0]
              })`}</label>
            </div>
          );
      });

      return [...temp];
    }
  };

  return (
    <div className="filter__brand">
      <h3 className="filter__type__title">Brand</h3>
      <form className="filter__brand__search">
        <div>
          <input
            className="filter__brand__checkbox"
            type="text"
            placeholder="Search for other"
            onChange={handleValueSearch}
            value={valueSearch}
          />
          {valueSearch ? (
            <button onClick={handleClear} className="fas fa-times"></button>
          ) : null}
        </div>
      </form>
      {handleRenderCheckbox()}
    </div>
  );
}

export default Brand;

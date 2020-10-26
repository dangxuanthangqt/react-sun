import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Price.scss";
import { useState } from "react";
import { useEffect } from "react";
Price.propTypes = {};

function Price(props) {
  const { handleChangePriceFilter } = props;
  const [valueFilter, setValueFilter] = useState(null);
  const [_gte, set_gte] = useState("");
  const [_lte, set_lte] = useState("");
  const [valueInput, setValueInput] = useState({ _gte, _lte });
  const handleClick = (value) => {
    setValueFilter(value);

    if (value._gte && value._lte) {
      set_lte(value._lte);
      set_gte(value._gte);
    } else {
      if (value._gte === undefined) {
        set_lte(value._lte);
        set_gte("");
      } else {
        if (value._lte === undefined) set_gte(value._gte);
        set_lte("");
      }
    }
  };
  const handleOnGo = () => {
    setValueInput({ _gte, _lte });
    console.log({ gte: _gte, lte: _lte });
    if (_gte === "" && _lte === "") {
      setValueFilter({});
    }
    if (_gte && _lte) {
      setValueFilter({ _gte, _lte });
    } else {
      if (_gte === "") {
        if (_lte) setValueFilter({ _lte });
      } else {
        if (_gte) {
          if (_lte === "") setValueFilter({ _gte });
        }
      }
    }
  };

  const handleReset = () => {
    setValueInput({ _gte: "", _lte: "" });
    set_lte("");
    set_gte("");
    setValueFilter({});
  };
  useEffect(() => {
    if (valueFilter) {
      let temp;

      temp = {
        price_lte: valueFilter._lte,
        price_gte: valueFilter._gte,
      };

      handleChangePriceFilter(temp);
    } else {
      handleChangePriceFilter(valueFilter);
    }
  }, [valueFilter]);
  const handleRenderPrice = () => {
    if (valueInput._gte == "" && valueInput._lte == "")
      return (
        <Fragment>
          <li onClick={() => handleClick({ _lte: 1 })}>≤ $1 </li>
          <li onClick={() => handleClick({ _lte: 80, _gte: 1 })}>$1 - 80</li>
          <li onClick={() => handleClick({ _lte: 160, _gte: 80 })}>
            $80 - 160
          </li>
          <li onClick={() => handleClick({ _lte: 240, _gte: 160 })}>
            $160 - 240{" "}
          </li>
          <li onClick={() => handleClick({ _lte: 1820, _gte: 240 })}>
            $240 - 1,820
          </li>
          <li onClick={() => handleClick({ _lte: 3400, _gte: 1820 })}>
            $1,820 - 3,400{" "}
          </li>
          <li onClick={() => handleClick({ _lte: 4980, _gte: 3400 })}>
            $3,400 - 4,980
          </li>
          <li onClick={() => handleClick({ _gte: 4980 })}>≥ $4,980 </li>
        </Fragment>
      );
    else {
      if (valueInput._gte == "")
        return <li onClick={() => handleReset()}>$ ≤ {_lte}</li>;
      if (valueInput._lte == "")
        return <li onClick={() => handleReset()}>$ ≥ {_gte}</li>;
      return (
        <li onClick={() => handleReset()}>
          ${_gte} - {_lte}
        </li>
      );
    }
  };

  return (
    <div className="filter__price">
      <h3 className="filter__type__title">Prices</h3>
      <ul className="filter__price-list">{handleRenderPrice()}</ul>
      <div className="filter__price__input">
        ${" "}
        <input
          type="number"
          value={_gte}
          onChange={(e) => set_gte(e.target.value)}
          min={0}
        />{" "}
        To
        <input
          type="number"
          value={_lte}
          onChange={(e) => set_lte(e.target.value)}
          min={_gte}
        />
        <button
          onClick={handleOnGo}
          style={{ width: "25px", height: "25px", borderRadius: "50%" }}
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default Price;

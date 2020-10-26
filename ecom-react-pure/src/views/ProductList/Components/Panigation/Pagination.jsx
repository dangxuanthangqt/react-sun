import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Pagination.scss";
Pagination.propTypes = {
  productNumber: PropTypes.number,
};
Pagination.defaultProps = {
  productNumber: 10,
};
function Pagination(props) {
  const { productNumber, handleChangePagenumberFilter } = props;
  const length = Math.ceil(productNumber / 12);
  const [pageNumber, setpageNumber] = useState(1);
  const handlePre = () => {
    if (pageNumber > 1) {
      setpageNumber(pageNumber - 1);
      handleChangePagenumberFilter(pageNumber-1);
    }
  };
  const handleNext = () => {
    if (pageNumber < length) {
      setpageNumber(pageNumber + 1);
      handleChangePagenumberFilter(pageNumber+1);
    }
  };
  const handleClick = (value) => {
  //  setpageNumber(value);
    handleChangePagenumberFilter(value);
  };
  const handleRenderPageNumber = () => {
    let arr = [];

    let start;
    let end;
    if (length > 7) {
      if (pageNumber + 3 <= 7) {
        start = 1;
        end = 7;
      }
      if (pageNumber + 3 > 7 && pageNumber + 3 <= length) {
        start = pageNumber - 3;
        end = pageNumber + 3;
      }
      if (pageNumber + 3 > length) {
        start = length - 6;
        end = length;
      }
    } else {
      start = 1;
      end = length;
    }
    for (let index = start; index <= end; index++) {
      if (pageNumber === index) {
        arr.push(
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="pagination__btn-page pagination__btn-page--active"
          >
            {index}
          </button>
        );
      } else {
        arr.push(
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="pagination__btn-page "
          >
            {index}
          </button>
        );
      }
    }

    return arr;
  };
  // useEffect(() => {
  //   handleChangePagenumberFilter(pageNumber);
  // }, [pageNumber]);
  useEffect(() => {
    setpageNumber(props.pNumber);
  }, [props.pNumber]);
  return (
    <div className="pagination">
      <button onClick={handlePre} className="pagination__btn">
        <i className="fas fa-angle-left"></i>
      </button>
      {handleRenderPageNumber()}
      <button onClick={handleNext} className="pagination__btn">
        <i className="fas fa-angle-right"></i>
      </button>
    </div>
  );
}

export default Pagination;

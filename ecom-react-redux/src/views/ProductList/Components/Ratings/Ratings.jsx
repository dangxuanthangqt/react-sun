import React from "react";
import PropTypes from "prop-types";
import "./Ratings.scss";
import { useState } from "react";
import randomstring from "randomstring";
import { useEffect } from "react";
Ratings.propTypes = {
  ratingList: PropTypes.array,
};

Ratings.defaultProps = {
  ratingList: [],
};
function Ratings(props) {
  const { ratingList, handleChangeRatingFilter } = props;
  const [valueFilter, setValueFilter] = useState(null);
  const handleClick = (element) => {
    setValueFilter(Object.keys(element)[0]);
    handleChangeRatingFilter({ rating: Object.keys(element)[0] }); // two way binding
  };
 
  const handleRenderRatings = () => {
    return (
      <div className="ratings__container">
        <ul className="ratings__list">
          {ratingList.map((e, i) => {
            if (valueFilter == Object.keys(e)[0]) {
              return (
                <li
                  key={i}
                  onClick={() => handleClick(e)}
                  className={`ratings__item ratings__item-active`}
                >
                  <ul className="ratings__list-star">
                    {handeRenderStar(parseInt(Object.keys(e)))}
                  </ul>
                  <span>& Up {Object.values(e)}</span>
                </li>
              );
            }
            return (
              <li
                key={i}
                onClick={() => handleClick(e)}
                className={`ratings__item`}
              >
                <ul className="ratings__list-star">
                  {handeRenderStar(parseInt(Object.keys(e)))}
                </ul>
                <span>& Up {Object.values(e)}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const handeRenderStar = (star) => {
    let temp = [];
    for (let index = 0; index < star; index++) {
      temp.push(<i key={randomstring.generate(5)} className="fas fa-star"></i>);
    }
    for (let index = 0; index < 5 - star; index++) {
      temp.push(<i key={randomstring.generate(5)} className="far fa-star"></i>);
    }
    return temp;
  };

  return (
    <div className="ratings">
      <h3 className="filter__type__title">Ratings</h3>
      {handleRenderRatings()}
    </div>
  );
}

export default Ratings;

import React from "react";
import PropTypes from "prop-types";
import randomstring from "randomstring";
import "./CardProduct.scss";
CardProduct.propTypes = {
  product: PropTypes.object,
};
CardProduct.defaultProps = {
  product: {},
};
function CardProduct(props) {
  const { product } = props;
  const handleRenderStart = () => {
    if (product.rating) {
      let temp = [];
      for (let index = 0; index < product.rating; index++) {
        temp.push(
          <i key={randomstring.generate(5)} className="fas fa-star"></i>
        );
      }
      for (let index = 0; index < 5 - product.rating; index++) {
        temp.push(
          <i key={randomstring.generate(5)} className="far fa-star"></i>
        );
      }
      return temp;
    } else return null;
  };
  return (
    <div className="card-product">
      <div className="card-product__img">
        <img src={product.image} alt="product" />
      </div>
      <h3 className="card-product__name line-clamp line-clamp--4">
        {product.name}
      </h3>
      <p className="card-product__type">{product.type}</p>
      <div className="card-product__infor">
        <ul className="card-product__infor__star">{handleRenderStart()}</ul>
        <h3 className="card-product__price">${product.price}</h3>
      </div>
    </div>
  );
}

export default CardProduct;

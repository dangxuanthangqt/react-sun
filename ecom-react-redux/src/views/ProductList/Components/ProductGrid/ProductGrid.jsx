import React from "react";
import PropTypes from "prop-types";
import CardProduct from "../../../../components/CardProduct/CardProduct";
import './ProductGrid.scss'
ProductGrid.propTypes = {
  productList: PropTypes.array,
};
ProductGrid.defaultProps = {
  productList: []
}

function ProductGrid(props) {
  const { productList } = props;
  //console.log(productList)
  return (
    <div className="product-grid">
      {productList.map((e, i) => {
        return <CardProduct key={i} product={e}></CardProduct>;
      })}
    </div>
  );
}

export default ProductGrid;

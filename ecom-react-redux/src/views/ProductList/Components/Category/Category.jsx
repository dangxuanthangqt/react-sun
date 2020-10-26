import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CategoryList } from "./CategoryConfig";
import { useState } from "react";
import { Collapse } from "react-collapse";
import "./Category.scss";
Category.propTypes = {
  CategoryList: PropTypes.array,
};
Category.defaultProps = {
  CategoryList: CategoryList,
};

function Category(props) {
  const [categoryFilter, setCategoryFilter] = useState({});
  const { handleChangeCategoryFilter, category } = props;
  const handleChangeCategory = (value) => {
    if (Object.keys(value).length) {
      let temp = {
        [`hierarchicalCategories.lvl${value.lvl}`]: value.valueSearch,
      };
      handleChangeCategoryFilter(temp);
    } else {
      handleChangeCategoryFilter({});
    }
  };
  // console.log("category", category);
  return (
    <div className="category">
      <MenuItemContainer
        handleChangeCategory={handleChangeCategory}
        CategoryList={props.CategoryList}
        category={category}
      ></MenuItemContainer>
    </div>
  );
}

export default Category;

MenuItemContainer.defaultProps = { CategoryList: [] };
function MenuItemContainer(props) {
  const { CategoryList, handleChangeCategory, category } = props;
  if (!CategoryList.length) return null;

  return (
    <ul className="category__list">
      {CategoryList.map((e, i) => {
        return (
          <li key={i}>
            <MenuItem
              category={category}
              handleChangeCategory={handleChangeCategory}
              {...e}
            />
          </li>
        );
      })}
    </ul>
  );
}

const MenuItem = (props) => {
  const {
    title,
    valueSearch,
    children,
    lvl,
    handleChangeCategory,
    category,
  } = props;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const handleOpen = () => {
    let temp = open ? false : true;
    setOpen(temp);

    if (!open) {
      //neu collapse false
      handleChangeCategory({ valueSearch, lvl });
    } else {
      handleChangeCategory({});
      //neu colapse dang mo, dong lai thi xoa category
    }
  };
  // const onBlur1 = (e) => {
  //   //handle onblur
  //   setActive("");
  // };

  return (
    <Fragment>
      <span
        className={`category__title ${
          Object.values(category)[0] == valueSearch //truyền category từ cha xuống, nếu bằng thì cho active
            ? "category__title--active"
            : ""
        } `}
        onClick={handleOpen}
        //onBlur={onBlur1}
        tabIndex="1"
      >
        <i className="fas fa-angle-right"></i> {title}
      </span>
      <Collapse isOpened={open}>
        <MenuItemContainer
          handleChangeCategory={handleChangeCategory}
          CategoryList={children}
          category={category}
        ></MenuItemContainer>
      </Collapse>
    </Fragment>
  );
};

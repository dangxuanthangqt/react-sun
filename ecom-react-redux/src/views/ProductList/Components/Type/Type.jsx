import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Type.scss";
import { useState } from "react";
Type.propTypes = {
  typeList: PropTypes.array,
};
Type.defaultProps = {
  typeList: [],
};

function Type(props) {
  const { handleChangeTypeFilter } = props;
  const [typeList, setTypeList] = useState([]);
  const [type, setType] = useState([]);
  // const handleCheck = (e) => {
  //   const target = e.target;
  //   let typeTemp = type ? type : [];
  //   let index = typeTemp.findIndex((element) => element == target.value);

  //   if (index == -1) {
  //     let temp = [...typeTemp];
  //     if (target.checked) {
  //       temp.push(target.value);
  //       setType(temp);
  //     } else {
  //       temp.splice(index, 1);
  //       setType(temp);
  //     }
  //   }
  // };
  const handleChange = (e, element) => {
    let checked = e.target.checked;
    let typeListTemp = typeList.map((e, index) => {
      if (Object.keys(element)[0] === Object.keys(e)[0]) {
        e.checked = checked; //thay doi trang thai checked trong list
      }
      return e;
    });
    let checkedType = typeListTemp
      .filter((e) => e.checked === true)
      .map((e) => Object.keys(e)[0]); // bo props checked
    handleChangeTypeFilter([...checkedType]);
    setType(checkedType); // list checked
    setTypeList(typeListTemp); //set lai state list type sau khi check or uncheck
  };

  useEffect(() => {
    let temp = props.typeList.map((e) => {
      if (type.includes(Object.keys(e)[0]))
        //check item co trong list checked
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
    setTypeList(temp);
  }, [props.typeList]);

  const handeData = () => {
    if (!typeList.length) return null;
    else {
      let temp = typeList.map((element, i) => {
        if (i < 5)
          return (
            <div key={i} className="filter__type__checkbox">
              <input
                name={Object.keys(element)}
                id={Object.keys(element)}
                onChange={(e) => handleChange(e, element)}
                checked={element.checked}
                type="checkbox"
              ></input>
              <label
                htmlFor={Object.keys(element)}
                className="filter__type__label"
              >{`${Object.keys(element)[0]}  (${
                Object.values(element)[0]
              })`}</label>
            </div>
          );
      });

      return temp;
    }
  };

  return (
    <div className="filter__type">
      <h3 className="filter__type__title">Type</h3>
      {handeData()}
    </div>
  );
}

export default Type;

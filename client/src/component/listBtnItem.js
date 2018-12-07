import React from 'react';
import PropTypes from 'prop-types';

const ListBtnItem = (props) => {
  let renderClass;
  let renderComp;
  if (props.btn === ". . .") {
    renderComp = <p>{props.btn}</p>;
    renderClass = "col-1 col-sm-2 text-dark font-weight-bold size-large text-center text-nowrap ml-1 ml-lg-0";
  } else {
    renderComp = <button className="btn btn-primary" value={props.btn} onClick={props.paging.bind(this)}>{props.btn}</button>;
    renderClass = "col-1 mx-1 mx-sm-0";
  }


  return (
    <div className={renderClass}>
      {renderComp}
    </div>
  );
}

ListBtnItem.propTypes = {
  btn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  paging: PropTypes.func
}

export default ListBtnItem;

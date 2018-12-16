import React from 'react';
import PropTypes from 'prop-types';

// The ListBtnItem Component is a component that gets reused to create the page buttons
// for the search history pagination.
const ListBtnItem = (props) => {

  let renderClass;
  let renderComp;
  if (props.btn === ". . .") {
    // If the BtnList array item in App.js state contains an ellipsis, the ellipsis and special classes get returned.
    renderComp = <p>{props.btn}</p>;
    renderClass = "col-1 col-sm-2 text-dark font-weight-bold size-large text-center text-nowrap ml-1 ml-lg-0";
  } else {
    // If the BtnList array item in App.js state contains a page number, the following classes get returned.
    renderClass = "col-1 mx-1 mx-sm-0";
    if (props.btn === props.pageNum) {
      // If the button number returned is the current page number listed, it is rendered unclickable and with a different color.
      renderComp = <button className="btn btn-secondary" value={props.btn} >{props.btn}</button>;
    } else {
      // For any other buttons, they get returned with an onClick handler that will call a function to redisplay the search history
      // with the corresponding page's items.
      renderComp = <button className="btn btn-primary" value={props.btn} onClick={props.paging.bind(this)}>{props.btn}</button>;
    }
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
  paging: PropTypes.func,
  pageNum: PropTypes.number
}

export default ListBtnItem;

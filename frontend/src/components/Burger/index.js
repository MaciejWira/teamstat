import React from 'react';

const Burger = ({ isActive, clickHandler, text }) => {

  const textMarkup = !text ? null : (
    <span className="c-burger-text">{text}</span>
  );

  return(
    <button
      className={"c-burger-wrapper" + (text ? " c-burger-wrapper--texted" : "") }
      onClick={clickHandler}>
      <span
        className={"c-burger" + (isActive ? " c-burger--active" : "")}>
        <span className="c-burger__line"></span>
        <span className="c-burger__line"></span>
        <span className="c-burger__line"></span>
      </span>
      {textMarkup}
    </button>
  )

};

export default Burger;

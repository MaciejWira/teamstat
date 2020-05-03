import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const List = ({
  elementsArray, path, listedProp, listedPropModifier,
  buttonHandler, buttonText
}) => {

  const buttonMarkup = id => {
    if (buttonText){
      return(
        <button
          onClick={e => buttonHandler(e, id)}
          className='a-button a-button--grey o-list__tab-button'>{buttonText}</button>
      )
    } else return null;
  }

  const elementsTabs = elementsArray.map(element => (
    <div className="b-col-1" key={element._id}>
      <Link
        className='o-list__tab'
        to={`/${path}/${element._id}`}>
        <span className="o-list__tab-content">
          {listedPropModifier ? listedPropModifier(element[listedProp]) : element[listedProp]}
          <span className="a-caret"></span>
        </span>
        {buttonMarkup(element._id)}
      </Link>
    </div>
  ));

  return(
    <div className='o-list'>
      <div className='o-list__tabs b-row'>
        {elementsTabs}
      </div>
    </div>
  )
};

export default List;

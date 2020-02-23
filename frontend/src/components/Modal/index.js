import React, { useState, useEffect } from 'react';

const Modal = ({ children, isOpened, handler }) => {

  return(
    <div className={`c-modal${ isOpened ? " c-modal--opened" : "" }`}>
      <div className='c-modal__content'>
        <button onClick={() => handler(false)}>Zamknij</button>
        {children}
      </div>
    </div>
  )
};

export default Modal;

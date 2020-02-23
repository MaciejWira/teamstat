import React from 'react';
import { Link } from 'react-router-dom';

import { viewsArr } from '../../views/helpers';

const Header = () => {

  const links = viewsArr.map((link, index) => (
    <Link key={index} className="c-header__link" to={link.path}>{link.name}</Link>
  ))

  return(
    <header className="c-header">
      <div className="c-header__container b-container">
        <div className="c-header__wrapper">
          <h1 className="c-header__heading">teamstat</h1>
          <div className="c-header__nav">
            <ul className="c-header__menu">
              {links}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;

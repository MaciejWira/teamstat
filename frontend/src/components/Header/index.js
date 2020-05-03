import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import { viewsArr } from '../../views/helpers';
import Burger from '../Burger';
import Menu from '../Menu';

const Header = () => {

  const [ openedMenu, setOpenedMenu ] = useState(false);

  return(
    <header className="c-header">
      <div className="c-header__container b-container">
        <div className="c-header__wrapper">

          <h1 className="c-header__heading">
            <Link to="/">
              teamstat<sub>Demo</sub>
            </Link>
          </h1>

          <div className="c-header__nav">

            <Burger
              isActive={openedMenu}
              clickHandler={() => setOpenedMenu(prev => !prev)}/>

            <Menu
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}/>

          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;
